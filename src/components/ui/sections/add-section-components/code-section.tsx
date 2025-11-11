import { UpdateButton } from '../../buttons/update-button'

export default function CodeSection({
	blogId,
	isPending,
	isError,
}: {
	blogId: number
	isPending: boolean
	isError: boolean
}) {
	return (
		<div className="flex w-full flex-col gap-4 rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-4 text-center md:text-left">
			<input
				className="rounded-sm border p-2 text-4xl"
				name="language"
				placeholder="Language"
				required
				type="text"
			/>
			<textarea
				className="min-h-36 rounded-sm border p-4"
				name="code"
				required
			/>
			<UpdateButton blogId={blogId} sectionId={0} sectionTypeId={4} />
			{isPending && <p>Loading...</p>}
			{isError && <p className="text-red-600">Error adding section </p>}
		</div>
	)
}
