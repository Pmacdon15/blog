'use client'
import { Activity, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAddSection } from '@/lib/mutations/mutations'
import type { Section } from '@/types/types'
import CodeSection from '../code-section'
import { ImageSection } from '../image-section'
import ParagraphSection from '../paragraph-section'
import { TitleSection } from '../title-section'

type SectionWithFile = Section & { new_file_object?: File }

export function AddSectionForm({
	blogId,
	addSection,
	hasTitleSection = true,
}: {
	blogId: number
	addSection: (newSection: SectionWithFile) => void
	hasTitleSection?: boolean
}) {
	const { mutate, isPending, isError } = useAddSection(blogId)

	const sections = ['Title', 'Image', 'Paragraph', 'Code']
	const [currentSection, setCurrentSection] = useState('')

	const handleSectionChange = (value: string) => {
		setCurrentSection(value)
	}

	const formAction = async (formData: FormData) => {
		const sectionType = formData.get('section-type') as string
		const newSection: Partial<SectionWithFile> = {
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
			newSection.paragraph_title = formData.get('paragraph_title') as string
			newSection.text = formData.get('text') as string
		} else if (sectionType === 'Code') {
			newSection.section_type_id = 4
			newSection.code = formData.get('code') as string
			newSection.language = formData.get('language') as string
		}

		addSection(newSection as SectionWithFile)
		mutate({ formData, blogId })
	}

	return (
		<form
			action={formAction}
			className="glass-card flex w-full flex-col gap-4 p-4"
		>
			<h1>Add Section</h1>
			<Select
				name="section-type"
				onValueChange={handleSectionChange}
				value={currentSection}
			>
				<SelectTrigger>
					<SelectValue placeholder="Select an option" />
				</SelectTrigger>
				<SelectContent>
					{sections.map((section, index) => (
						<SelectItem
							disabled={section === 'Title' && hasTitleSection}
							key={index}
							value={section}
						>
							{section}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Activity mode={currentSection === 'Title' ? 'visible' : 'hidden'}>
				<TitleSection isError={isError} isPending={isPending} />
			</Activity>
			<Activity mode={currentSection === 'Image' ? 'visible' : 'hidden'}>
				<ImageSection isError={isError} isPending={isPending} />
			</Activity>
			<Activity
				mode={currentSection === 'Paragraph' ? 'visible' : 'hidden'}
			>
				<ParagraphSection isError={isError} isPending={isPending} />
			</Activity>
			<Activity mode={currentSection === 'Code' ? 'visible' : 'hidden'}>
				<CodeSection isError={isError} isPending={isPending} />
			</Activity>
			<Button disabled={isPending} type={'submit'}>
				Submit
			</Button>
		</form>
	)
}
