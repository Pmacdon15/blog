'use client'
import { Button } from '@/components/ui/button'
import { useIsAdmin } from '@/lib/hooks/hooks'
import { useAddBlog } from '@/lib/mutations/mutations'

export default function AddBlogForm() {
	const { data } = useIsAdmin()
	const { mutate, isPending, isError } = useAddBlog()

	return (
		<>
			{data?.isAdmin && (
				<form
					action={mutate}
					className="glass-card flex w-full md:w-4/6 flex-col gap-4 p-4 "
				>
					<h1>Add Blog</h1>
					<input
						className="w-full rounded-sm border border-muted-foreground bg-white/30 p-2 text-center text-xl md:w-5/6 mx-auto"
						name="title"
						placeholder="Title"
						required
						type="text"
					/>
					<Button disabled={isPending} type="submit">
						Add Blog
					</Button>
					{isError && (
						<h1 className="bold text-red-600">
							{' '}
							There was an error creating a blog
						</h1>
					)}
				</form>
			)}
		</>
	)
}
