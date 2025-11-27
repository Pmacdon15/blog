'use client'
import { useDeleteBlog } from '@/lib/mutations/mutations'
import { Button } from '../button'

export default function DeleteBlog({ blogId }: { blogId: number }) {
	const { mutate: mutateDeleteBlog, isPending: isPendingDeleteBlog } =
		useDeleteBlog()

	const handleDeleteBlog = () => {
		if (
			window.confirm(
				'Are you sure you want to delete this entire blog? This action cannot be undone.',
			)
		) {
			mutateDeleteBlog(blogId)
		}
	}
	return (
		<Button
			// className="mx-auto rounded-sm border bg-red-600 p-2 text-white transition-transform duration-300 hover:scale-110 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
			disabled={isPendingDeleteBlog}
			onClick={handleDeleteBlog}
			// type="button"
			variant={'destructive'}
		>
			{isPendingDeleteBlog ? 'Deleting...' : 'Delete Blog'}
		</Button>
	)
}
