'use client'
import type { Section } from '@/types/types'
import { UpdateButton } from '../../buttons/update-button'
import { Title } from './title'

export function TitleSection({ section }: { section: Section }) {
	return (
		<div className="p-4">
			<Title blogId={section.blog_id} sectionId={section.id} sectionTypeId={section.section_type_id} />
			<form className="flex w-full flex-col gap-4">
				<input
					className="rounded-sm text-center text-5xl focus:border-2 focus:border-blue-500 focus:outline-none"
					defaultValue={section.title_section_title || ''}
					name="title"
					placeholder="Title"
					type="text"
				/>

				<input
					className="md-start w-full rounded-sm p-2 text-center focus:border-2 focus:border-blue-500 focus:outline-none md:w-2/6"
					defaultValue={
						section.publish_date
							? new Date(section.publish_date)
									.toISOString()
									.slice(0, 10)
							: new Date().toISOString().slice(0, 10)
					}
					name="publish_date"
					type="date"
				/>
				<UpdateButton
					blogId={section.blog_id}
					sectionId={section.id}
					sectionTypeId={section.section_type_id}
				/>
			</form>
		</div>
	)
}
