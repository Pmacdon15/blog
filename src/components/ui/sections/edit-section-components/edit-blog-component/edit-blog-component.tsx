'use client'
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip } from 'lucide-react'
import type React from 'react'
import {
	type ChangeEvent,
	use,
	useCallback,
	useEffect,
	useMemo,
	useOptimistic,
	useRef,
	useState,
} from 'react'
import DeleteBlog from '@/components/ui/buttons/delete-blog-button'
import TogglePublished from '@/components/ui/buttons/toggle-published-button'
import { useSyncedSections } from '@/lib/hooks/hooks'
import {
	useDeleteSection,
	useUpdateBlogOrder,
	useUpdateSection,
} from '@/lib/mutations/mutations'
import type { Section } from '@/types/types'
import { AddSectionForm } from '../../add-section-components/add-section-form/add-section-form'
import { Code } from '../code-section'
import { ImageSection } from '../image-section'
import { Paragraph } from '../paragraph-section'
import { TitleSection } from '../title-section'

type SectionState = {
	[key: number]: string | null | undefined
}

function SortableItem({
	id,
	children,
}: {
	id: number
	children: React.ReactNode
}) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div className="flex w-full flex-col" ref={setNodeRef} style={style}>
			<div
				{...attributes}
				{...listeners}
				className="cursor-grab self-start p-2"
				style={{ touchAction: 'none' }}
			>
				<Grip />
			</div>
			<div className="w-full">{children}</div>
		</div>
	)
}

export default function EditBlogComponent({
	dataPromise,
}: {
	dataPromise: Promise<Section[]>
}) {
	const data = use(dataPromise)
	const [sections, setSections] = useSyncedSections(data)
	const [sectionState, setSectionState] = useState<SectionState>({})

	const [optimisticSections, addOptimisticSection] = useOptimistic(
		sections,
		(state: Section[], newSection: Section) => [...state, newSection],
	)

	const {
		mutate: mutateUpdate,
		isPending: isPendingUpdate,
		isError,
		error,
	} = useUpdateSection(data[0].blog_id)
	const { mutate: mutateDelete, isPending: isPendingDelete } =
		useDeleteSection(data[0].blog_id)
	const { mutate: mutateUpdateBlogOrder } = useUpdateBlogOrder(
		data[0].blog_id,
	)
	

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 100,
				handler: true,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)

	const debouncedSaveRef = useRef<NodeJS.Timeout | null>(null)

	const saveOrder = useCallback(
		(currentSections: Section[]) => {
			const newOrder = currentSections.map((section, index) => ({
				id: section.id,
				order_index: index,
			}))
			mutateUpdateBlogOrder({
				blogId: data[0].blog_id,
				newOrder: newOrder,
			})
		},
		[mutateUpdateBlogOrder, data],
	)

	useEffect(() => {
		return () => {
			if (debouncedSaveRef.current) {
				clearTimeout(debouncedSaveRef.current)
			}
		}
	}, [])

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

	const handleImageChange = (
		event: ChangeEvent<HTMLInputElement>,
		sectionId: number,
	) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setSectionState((prevState) => ({
					...prevState,
					[sectionId]: reader.result as string,
				}))
			}
			reader.readAsDataURL(file)
		} else {
			setSectionState((prevState) => ({
				...prevState,
				[sectionId]: null,
			}))
		}
	}

	const sectionIds = useMemo(
		() => optimisticSections.map((section) => section.id),
		[optimisticSections],
	)

	if (isError) console.log('Error: ', error?.message)

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-start gap-4 pb-4 font-[family-name:var(--font-geist-sans)] sm:w-5/6 lg:w-4/6">
			{data && (
				<div className="flex gap-4">
					<TogglePublished
						blogId={data[0].blog_id}
						published={data[0].published || false}
					/>
					<DeleteBlog blogId={data[0].blog_id} />
				</div>
			)}
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext items={sectionIds}>
					{optimisticSections.map((section: Section) => {
						const formActionDelete = () =>
							mutateDelete({
								sectionId: section.id,
								sectionTypeId: section.section_type_id,
								blogId: data[0].blog_id,
							})
						let sectionComponent: React.ReactNode | null = null
						switch (section.section_type_id) {
							case 1:
								sectionComponent = (
									<TitleSection
										formAction={(formData: FormData) =>
											mutateUpdate({
												formData,
												sectionId: section.id,
												sectionTypeId:
													section.section_type_id,
												blogId: data[0].blog_id,
											})
										}
										formActionDelete={formActionDelete}
										isPending={
											isPendingUpdate || isPendingDelete
										}
										section={section}
									/>
								)
								break
							case 2:
								sectionComponent = (
									<ImageSection
										formAction={(formData: FormData) =>
											mutateUpdate({
												formData,
												sectionId: section.id,
												sectionTypeId:
													section.section_type_id,
												blogId: data[0].blog_id,
											})
										}
										formActionDelete={formActionDelete}
										handleImageChange={handleImageChange}
										isPending={
											isPendingUpdate || isPendingDelete
										}
										section={section}
										sectionState={sectionState}
									/>
								)
								break
							case 3:
								sectionComponent = (
									<Paragraph
										formAction={(formData: FormData) =>
											mutateUpdate({
												formData,
												sectionId: section.id,
												sectionTypeId:
													section.section_type_id,
												blogId: data[0].blog_id,
											})
										}
										formActionDelete={formActionDelete}
										isPending={
											isPendingUpdate || isPendingDelete
										}
										section={section}
									/>
								)
								break
							case 4:
								sectionComponent = (
									<Code
										formAction={(formData: FormData) =>
											mutateUpdate({
												formData,
												sectionId: section.id,
												sectionTypeId:
													section.section_type_id,
												blogId: data[0].blog_id,
											})
										}
										formActionDelete={formActionDelete}
										isPending={
											isPendingUpdate || isPendingDelete
										}
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
							<SortableItem id={section.id} key={section.id}>
								{sectionComponent}
							</SortableItem>
						)
					})}
				</SortableContext>
			</DndContext>
			{isError && <p className="text-red-600">Error:{error.message}</p>}
			<AddSectionForm
				addOptimisticSection={addOptimisticSection}
				blogId={data[0].blog_id}
			/>
		</div>
	)
}
