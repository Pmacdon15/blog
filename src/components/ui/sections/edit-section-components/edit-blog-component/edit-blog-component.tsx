'use client'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import type React from 'react'
import { use, useEffect, useMemo, useOptimistic, useRef, useState } from 'react'
import DeleteBlog from '@/components/ui/buttons/delete-blog-button'
import TogglePublished from '@/components/ui/buttons/toggle-published-button'
import SortableItem from '@/components/ui/drag-and-drop/sortable-item'
import { useSyncedSections } from '@/lib/hooks/hooks'
import { useDeleteSection, useUpdateSection } from '@/lib/mutations/mutations'
import { useBlogOrderMutation, useDragSensors } from '@/lib/utils/drag-and-drop'
import type { Section } from '@/types/types'
import { AddSectionForm } from '../../add-section-components/add-section-form/add-section-form'
import { Code } from '../code-section'
import { ImageSection } from '../image-section'
import { Paragraph } from '../paragraph-section'
import { TitleSection } from '../title-section'

export default function EditBlogComponent({
	dataPromise,
}: {
	dataPromise: Promise<Section[]>
}) {
	const initialData = use(dataPromise)
	const [originalSections, setOriginalSections] = useState(initialData)
	const [sections, setSections] = useSyncedSections(initialData)
	const [isDirty, setIsDirty] = useState(false)

	const { mutate: deleteSection } = useDeleteSection(initialData[0].blog_id)
	const { mutate: updateSection } = useUpdateSection(initialData[0].blog_id)

	useEffect(() => {
		const hasChanged =
			JSON.stringify(originalSections) !== JSON.stringify(sections)
		setIsDirty(hasChanged)
	}, [sections, originalSections])

	const [optimisticSections, addOptimisticSection] = useOptimistic(
		sections,
		(state: Section[], newSection: Section) => [...state, newSection],
	)

	const debouncedSaveRef = useRef<NodeJS.Timeout | null>(null)
	const { saveOrder } = useBlogOrderMutation(initialData[0].blog_id)
	const sensors = useDragSensors()

	useEffect(() => {
		return () => {
			if (debouncedSaveRef.current) {
				clearTimeout(debouncedSaveRef.current)
			}
		}
	}, [])

	const handleSectionContentChange = (
		sectionId: number,
		newContent: Partial<Section>,
	) => {
		setSections(
			sections.map((section) =>
				section.id === sectionId
					? { ...section, ...newContent }
					: section,
			),
		)
	}

	const handleSave = () => {
		const changedSections = sections.filter(
			(section, index) =>
				JSON.stringify(section) !==
				JSON.stringify(originalSections[index]),
		)

		changedSections.forEach((section) => {
			const formData = new FormData()
			Object.entries(section).forEach(([key, value]) => {
				if (value !== null && value !== undefined) {
					formData.append(key, value.toString())
				}
			})
			updateSection({
				blogId: section.blog_id,
				sectionId: section.id,
				sectionTypeId: section.section_type_id,
				formData,
			})
		})
		setOriginalSections(sections)
	}

	const handleUndo = () => {
		setSections(originalSections)
	}

	const handleDeleteSection = (sectionId: number) => {
		const sectionToDelete = sections.find(
			(section) => section.id === sectionId,
		)
		if (sectionToDelete) {
			deleteSection({
				blogId: initialData[0].blog_id,
				sectionId,
				sectionTypeId: sectionToDelete.section_type_id,
			})
			setSections(sections.filter((section) => section.id !== sectionId))
		}
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (over && active.id !== over.id) {
			setSections((items) => {
				const oldIndex = items.findIndex(
					(item) => item.id === active.id,
				)
				const newIndex = items.findIndex((item) => item.id === over.id)
				const newSections = arrayMove(items, oldIndex, newIndex)

				if (debouncedSaveRef.current) {
					clearTimeout(debouncedSaveRef.current)
				}
				debouncedSaveRef.current = setTimeout(() => {
					saveOrder(newSections)
				}, 500) // Debounce for 500ms

				return newSections
			})
		}
	}

	const sectionIds = useMemo(
		() => optimisticSections.map((section) => section.id),
		[optimisticSections],
	)

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-start gap-8 pb-4 font-[family-name:var(--font-geist-sans)] sm:w-5/6 lg:w-4/6 ">
			{initialData && (
				<div className="mt-4 flex gap-4">
					<TogglePublished
						blogId={initialData[0].blog_id}
						published={initialData[0].published || false}
					/>
					<DeleteBlog blogId={initialData[0].blog_id} />
				</div>
			)}
			{isDirty && (
				<div className="flex gap-4">
					<button
						className="rounded-sm bg-green-500 px-4 py-2 text-white"
						onClick={handleSave}
						type="button"
					>
						Save
					</button>
					<button
						className="rounded-sm bg-red-500 px-4 py-2 text-white"
						onClick={handleUndo}
						type="button"
					>
						Undo
					</button>
				</div>
			)}
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext items={sectionIds}>
					{optimisticSections.map((section: Section) => {
						let sectionComponent: React.ReactNode | null = null
						switch (section.section_type_id) {
							case 1:
								sectionComponent = (
									<TitleSection
										onChange={handleSectionContentChange}
										section={section}
									/>
								)
								break
							case 2:
								sectionComponent = (
									<ImageSection
										onChange={handleSectionContentChange}
										section={section}
									/>
								)
								break
							case 3:
								sectionComponent = (
									<Paragraph
										onChange={handleSectionContentChange}
										section={section}
									/>
								)
								break
							case 4:
								sectionComponent = (
									<Code
										onChange={handleSectionContentChange}
										section={section}
									/>
								)
								break
							default:
								sectionComponent = (
									<div>Unsupported section type</div>
								)
						}
						return (
							<SortableItem
								handleDelete={handleDeleteSection}
								id={section.id}
								key={section.id}
							>
								{sectionComponent}
							</SortableItem>
						)
					})}
				</SortableContext>
			</DndContext>

			<AddSectionForm
				addOptimisticSection={addOptimisticSection}
				blogId={initialData[0].blog_id}
			/>
		</div>
	)
}
