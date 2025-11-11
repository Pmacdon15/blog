import type { Section } from '@/types/types'
import { UpdateButton } from '../../buttons/update-button'
import { Title } from './title'

export function Paragraph({ section }: { section: Section }) {
	return (
		<div className="p-4">
			<Title
				blogId={section.blog_id}
				sectionId={section.id}
				sectionTypeId={section.section_type_id}
			/>
			<form className="flex w-full flex-col gap-4 text-center md:text-left">
				<input
					className="rounded-sm p-2 text-4xl focus:border-2 focus:border-blue-500 focus:outline-none"
					defaultValue={section.paragraph_title || ''}
					name="title"
					placeholder="Title"
					type="text"
				/>
				<textarea
					className="min-h-36 rounded-sm p-4 indent-8 focus:border-2 focus:border-blue-500 focus:outline-none"
					defaultValue={section.text || ''}
					name="text"
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
