import { Activity, useState } from 'react'
import { useAddSection } from '@/lib/mutations/mutations'
import type { Section } from '@/types/types'
import CodeSection from '../code-section'
import { ImageSection } from '../image-section'
import ParagraphSection from '../paragraph-section'
import { TitleSection } from '../title-section'

export function AddSectionForm({
	blogId,
	addOptimisticSection,
	hasTitleSection = true,
}: {
	blogId: number
	addOptimisticSection: (action: Section) => void
	hasTitleSection?: boolean
}) {
	const { mutate, isPending, isError } = useAddSection(blogId)

	const sections = ['Title', 'Image', 'Paragraph', 'Code']
	const [currentSection, setCurrentSection] = useState('')

	const handleSectionChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setCurrentSection(event.target.value)
	}

	const formAction = async (formData: FormData) => {
		const sectionType = formData.get('section-type') as string
		const newSection: Partial<Section> = {
			id: Date.now(), // Temporary ID
			blog_id: blogId,
			order_index: 0, // This will be updated on the server
			section_type: sectionType.toLowerCase() as
				| 'title'
				| 'image'
				| 'paragraph'
				| 'code',
			publish_date: null,
			published: false,
		}

		if (sectionType === 'Title') {
			newSection.section_type_id = 1
			newSection.title_section_title = formData.get('title') as string
		} else if (sectionType === 'Image') {
			newSection.section_type_id = 2
			newSection.src = formData.get('src') as string // Get actual src from form
			newSection.alt = formData.get('alt') as string
			newSection.width = parseInt(formData.get('width') as string, 10) // Get actual width from form
		} else if (sectionType === 'Paragraph') {
			newSection.section_type_id = 3
			newSection.text = formData.get('paragraph') as string
		} else if (sectionType === 'Code') {
			newSection.section_type_id = 4
			newSection.code = formData.get('code') as string
			newSection.language = formData.get('language') as string
		}

		addOptimisticSection(newSection as Section)
		mutate({ formData, blogId })
	}

	return (
		<form
			action={formAction}
			className="flex w-full flex-col gap-4 rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-4"
		>
			<h1>Add Section</h1>
			<select
				className="rounded-sm border bg-[var(--secondary)] p-2 text-center text-white"
				name="section-type"
				onChange={handleSectionChange}
				value={currentSection}
			>
				<option value="">Select an option</option>
				{sections.map((section, index) => (
					<option
						disabled={section === 'Title' && hasTitleSection}
						key={index}
						value={section}
					>
						{section}
					</option>
				))}
			</select>
			<Activity mode={currentSection === 'Title' ? 'visible' : 'hidden'}>
				<TitleSection blogId={blogId}isError={isError} isPending={isPending} />
			</Activity>
			<Activity mode={currentSection === 'Image' ? 'visible' : 'hidden'}>
				<ImageSection blogId={blogId} isError={isError} isPending={isPending} />
			</Activity>
			<Activity mode={currentSection === 'Paragraph' ? 'visible' : 'hidden'}>
				<ParagraphSection  blogId={blogId} isError={isError} isPending={isPending} />
			</Activity>
			<Activity mode={currentSection === 'Code' ? 'visible' : 'hidden'}>
				<CodeSection blogId={blogId} isError={isError} isPending={isPending} />
			</Activity>		
		</form>
	)
}
