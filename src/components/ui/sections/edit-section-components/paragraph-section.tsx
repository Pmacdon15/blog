import type { Section } from '@/types/types'

export function Paragraph({
	section,
	onChange,
}: {
	section: Section
	onChange: (sectionId: number, newContent: Partial<Section>) => void
}) {
	return (
		<div className="flex w-full flex-col gap-4 p-4 text-center md:text-left">
			<input
				className="rounded-sm p-2 text-4xl focus:border-2 focus:border-blue-500 focus:outline-none"
				name="title"
				onChange={(e) =>
					onChange(section.id, { paragraph_title: e.target.value })
				}
				placeholder="Title"
				type="text"
				value={section.paragraph_title || ''}
			/>
			<textarea
				className="min-h-36 rounded-sm p-4 indent-8 focus:border-2 focus:border-blue-500 focus:outline-none"
				name="text"
				onChange={(e) => onChange(section.id, { text: e.target.value })}
				value={section.text || ''}
			/>
		</div>
	)
}
