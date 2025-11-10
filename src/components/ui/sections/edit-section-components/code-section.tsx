import type { Section } from '@/types/types'
import { UpdateButton } from '../../buttons/update-button'
import { Title } from './title'

export function Code({
	section,
	formAction,
	formActionDelete,
	isPending,
}: {
	section: Section
	formAction: (formData: FormData) => void
	formActionDelete: () => void
	isPending: boolean
}) {
	return (
		<div className="p-4">
			<Title formActionDelete={formActionDelete} />
			<form className="flex w-full flex-col gap-4 text-center md:text-left">
				<input
					className="rounded-sm p-2 text-4xl focus:border-2 focus:border-blue-500 focus:outline-none"
					defaultValue={section.language || ''}
					name="language"
					placeholder="Language"
					required
					type="text"
				/>
				<textarea
					className="min-h-36 rounded-sm p-4 focus:border-2 focus:border-blue-500 focus:outline-none"
					defaultValue={section.code || ''}
					name="code"
					required
				/>
				<UpdateButton
					actionString="Update Section"
					disabled={isPending}
					formAction={formAction}
				/>
			</form>
		</div>
	)
}
