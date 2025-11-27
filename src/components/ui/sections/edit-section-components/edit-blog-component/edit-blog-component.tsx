'use client'
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import type React from 'react'
import { use, useEffect, useMemo, useOptimistic, useRef, useState } from 'react'
import DeleteBlog from '@/components/ui/buttons/delete-blog-button'
import TogglePublished from '@/components/ui/buttons/toggle-published-button'
import SortableItem from '@/components/ui/drag-and-drop/sortable-item'
import { useSyncedSections } from '@/lib/hooks/hooks'
import { useDeleteSection } from '@/lib/mutations/mutations'
import { useBlogOrderMutation, useDragSensors } from '@/lib/utils/drag-and-drop'
import type { Section } from '@/types/types'
import { AddSectionForm } from '../../add-section-components/add-section-form/add-section-form'
import { Code } from '../code-section'
import { ImageSection } from '../image-section'
import { Paragraph } from '../paragraph-section'
import { TitleSection } from '../title-section'

type SectionWithFile = Section & { new_file_object?: File }

export default function EditBlogComponent({
	dataPromise,
}: {
	dataPromise: Promise<Section[]>
}) {
	const initialData = use(dataPromise)
	const [originalSections, setOriginalSections] =
		useState<SectionWithFile[]>(initialData)
	const [sections, setSections] =
		useSyncedSections<SectionWithFile>(initialData)

	const { mutate: deleteSection } = useDeleteSection(initialData[0].blog_id)

	const [optimisticSections, addOptimisticSection] = useOptimistic(
		sections,
		(state: SectionWithFile[], newSection: SectionWithFile) => [
			...state,
			newSection,
		],
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
		newContent: Partial<SectionWithFile>,
	) => {
		setSections(
			sections.map((section) =>
				section.id === sectionId
					? { ...section, ...newContent }
					: section,
			),
		)
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
		<div className="flex min-h-screen w-full flex-col items-center justify-start gap-8 pb-4 font-[family-name:var(--font-geist-sans)] sm:w-5/6 lg:w-4/6">
			{initialData && (
				<div className="mt-4 flex gap-4">
					<TogglePublished
						blogId={initialData[0].blog_id}
						published={initialData[0].published || false}
					/>
					<DeleteBlog blogId={initialData[0].blog_id} />
				</div>
			)}
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext items={sectionIds}>
					{optimisticSections.map((section: SectionWithFile) => {
						const foundOriginalSection = originalSections.find(
							(orig) => orig.id === section.id,
						) || section // Fallback to current if original not found

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
								currentSection={section}
								handleDelete={handleDeleteSection}
								id={section.id}
								key={section.id}
								originalSection={foundOriginalSection}
								setParentOriginalSections={setOriginalSections}
								setParentSections={setSections}
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