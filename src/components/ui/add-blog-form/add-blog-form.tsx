'use client'
import { useIsAdmin } from '@/lib/hooks/hooks'
import { useAddBlog } from '@/lib/mutations/mutations'

export default function AddBlogForm() {
	const { data } = useIsAdmin()
	const { mutate, isPending, isError } = useAddBlog()

	return (
		<>
			{data && (
				<form
					action={mutate}
					className="w-full rounded-sm border bg-white/60 p-1 shadow-xl sm:w-5/6 lg:w-4/6"
				>
					<div className="flex flex-col items-center gap-4 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-2 shadow-lg">
						<input
							className="w-full rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] text-center text-5xl md:w-5/6"
							name="title"
							placeholder="Title"
							required
							type="text"
						/>
						<button
							className="rounded-sm border p-2 hover:cursor-pointer"
							disabled={isPending}
							type="button"
						>
							Add Blog
						</button>
						{isError && (
							<h1 className="bold text-red-600">
								{' '}
								There was an error creating a blog
							</h1>
						)}
					</div>
				</form>
			)}
		</>
	)
}
