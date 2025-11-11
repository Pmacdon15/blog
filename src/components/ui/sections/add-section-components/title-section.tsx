import { UpdateButton } from '../../buttons/update-button'

export function TitleSection({
	blogId,
	isPending,
	isError,
}: {
	blogId: number
	isPending: boolean
	isError: boolean
}) {
	return (
		<div className="flex w-full flex-col gap-4 rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-4">
			<input
				className="rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] text-center text-5xl"
				name="title"
				placeholder="Title"
				type="text"
			/>
			<UpdateButton blogId={blogId} sectionId={0} sectionTypeId={1}  />
			{isPending && <p>Loading...</p>}
			{isError && <p className="text-red-600">Error adding section </p>}
		</div>
	)
}
