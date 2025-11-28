import type { Section } from '@/types/types'

export function Code({
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
				name="language"
				onChange={(e) =>
					onChange(section.id, { language: e.target.value })
				}
				placeholder="Language"
				required
				type="text"
				value={section.language || ''}
			/>
			<textarea
				className="min-h-36 rounded-sm p-4 focus:border-2 focus:border-blue-500 focus:outline-none"
				name="code"
				onChange={(e) => onChange(section.id, { code: e.target.value })}
				required
				value={section.code || ''}
			/>
		</div>
	)
}
