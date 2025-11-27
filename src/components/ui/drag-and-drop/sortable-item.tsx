'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, X } from 'lucide-react'
import type React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useUpdateSection } from '@/lib/mutations/mutations'
import type { Section } from '@/types/types'
import { Button } from '../button'

type SectionWithFile = Section & { new_file_object?: File }

interface SortableItemProps {
	id: number
	children: React.ReactNode
	handleDelete: (id: number) => void
	currentSection: SectionWithFile
	originalSection: SectionWithFile
	setParentSections: React.Dispatch<React.SetStateAction<SectionWithFile[]>>
	setParentOriginalSections: React.Dispatch<
		React.SetStateAction<SectionWithFile[]>
	>
}

const SortableItem = ({
	id,
	children,
	handleDelete,
	currentSection,
	originalSection,
	setParentSections,
	setParentOriginalSections,
}: SortableItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	const [isDirty, setIsDirty] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const { mutateAsync: updateSection } = useUpdateSection(
		currentSection.blog_id,
	)

	useEffect(() => {
		// Exclude new_file_object from comparison as it's not stringifiable and not part of original section initially
		const currentForComparison = {
			...currentSection,
			new_file_object: undefined,
		}
		const originalForComparison = {
			...originalSection,
			new_file_object: undefined,
		}

		const hasChanged =
			JSON.stringify(currentForComparison) !==
			JSON.stringify(originalForComparison)
		setIsDirty(hasChanged)
		setError(null) // Clear errors when section content changes
	}, [currentSection, originalSection])

	const handleSave = useCallback(async () => {
		setIsSaving(true)
		setError(null)
		try {
			const formData = new FormData()

			if (
				currentSection.section_type_id === 2 &&
				currentSection.new_file_object
			) {
				formData.append('new-file', currentSection.new_file_object)
			}

			Object.entries(currentSection).forEach(([key, value]) => {
				if (key === 'new_file_object') return

				if (value instanceof File) {
					formData.append(key, value)
				} else if (value !== null && value !== undefined) {
					formData.append(key, String(value))
				}
			})

			formData.append('blog_id', String(currentSection.blog_id))
			formData.append('sectionId', String(currentSection.id))
			formData.append(
				'sectionTypeId',
				String(currentSection.section_type_id),
			)

			await updateSection({
				blogId: currentSection.blog_id,
				sectionId: currentSection.id,
				sectionTypeId: currentSection.section_type_id,
				formData,
			})

			// Update the original section in the parent component
			setParentSections((prevSections) =>
				prevSections.map((s) =>
					s.id === currentSection.id ? currentSection : s,
				),
			)
			setParentOriginalSections((prevOriginalSections) =>
				prevOriginalSections.map((s) =>
					s.id === currentSection.id ? currentSection : s,
				),
			)
		} catch (e) {
			setError('Failed to save section.')
			console.error('Save error:', e)
		} finally {
			setIsSaving(false)
		}
	}, [
		currentSection,
		updateSection,
		setParentSections,
		setParentOriginalSections,
	])

	const handleUndo = useCallback(() => {
		setParentSections((prevSections) =>
			prevSections.map((s) =>
				s.id === originalSection.id ? originalSection : s,
			),
		)
		setError(null)
	}, [originalSection, setParentSections])

	return (
		<div
			className="relative mb-4 flex w-full flex-col rounded-lg border border-white/10 bg-white/30 backdrop-blur-md"
			ref={setNodeRef}
			style={style}
		>
			<div className="absolute top-1 right-1 flex gap-2">
				{isDirty && (
					<>
						<Button
							disabled={isSaving}
							onClick={handleSave}
							size="sm"
							variant="outline"
						>
							{isSaving ? 'Saving...' : 'Save'}
						</Button>
						<Button
							disabled={isSaving}
							onClick={handleUndo}
							size="sm"
							variant="destructive"
						>
							Undo
						</Button>
					</>
				)}
				<button
					className="cursor-pointer text-red-600"
					onClick={() => handleDelete(id)}
					type="button"
				>
					<X />
				</button>
			</div>
			<div
				{...attributes}
				{...listeners}
				className="cursor-grab self-start p-2"
				style={{ touchAction: 'none' }}
			>
				<Grip />
			</div>
			<div className="w-full">{children}</div>
			{error && <p className="text-red-500 text-center">{error}</p>}
		</div>
	)
}

export default SortableItem
