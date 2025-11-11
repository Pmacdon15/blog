import { useDeleteSection } from '@/lib/mutations/mutations'

export function Title({
	blogId,
	sectionId,
	sectionTypeId,
}: {
	blogId: number
	sectionId: number
	sectionTypeId: number
}) {
	const { mutate, isPending } = useDeleteSection(blogId)

	return (
		<div className="flex w-full justify-end">
			<button
				className="ml-auto w-8 rounded-lg bg-red-400 shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-red-600"
				disabled={isPending}
				onClick={() =>
					mutate({
						sectionId: sectionId,
						sectionTypeId: sectionTypeId,
						blogId,
					})
				}
				type="button"
			>
				X
			</button>
		</div>
	)
}
