'use client'
import type { Section } from '@/types/types'

export function TitleSection({
	section,
	onChange,
}: {
	section: Section
	onChange: (sectionId: number, newContent: Partial<Section>) => void
}) {
	return (
		<div className="flex w-full flex-col gap-4 p-4">
			<input
				className="rounded-sm text-center text-5xl focus:border-2 focus:border-blue-500 focus:outline-none"
				value={section.title_section_title || ''}
				onChange={(e) =>
					onChange(section.id, { title_section_title: e.target.value })
				}
				name="title"
				placeholder="Title"
				type="text"
			/>

			<input
				className="md-start w-full rounded-sm p-2 text-center focus:border-2 focus:border-blue-500 focus:outline-none md:w-2/6"
				value={
					section.publish_date
						? new Date(section.publish_date).toISOString().slice(0, 10)
						: new Date().toISOString().slice(0, 10)
				}
				onChange={(e) =>
					onChange(section.id, { publish_date: e.target.value })
				}
				name="publish_date"
				type="date"
			/>
		</div>
	)
}
