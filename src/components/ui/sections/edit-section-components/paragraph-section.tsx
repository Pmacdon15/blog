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
				value={section.paragraph_title || ''}
				onChange={(e) =>
					onChange(section.id, { paragraph_title: e.target.value })
				}
				name="title"
				placeholder="Title"
				type="text"
			/>
			<textarea
				className="min-h-36 rounded-sm p-4 indent-8 focus:border-2 focus:border-blue-500 focus:outline-none"
				value={section.text || ''}
				onChange={(e) => onChange(section.id, { text: e.target.value })}
				name="text"
			/>
		</div>
	)
}
