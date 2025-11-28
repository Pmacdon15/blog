import { Suspense } from 'react'
import { Blogs } from '@/components/ui/blogs/blogs'
import { getBlogs } from '@/lib/DAL/blogs-dal'

export default function Page() {
	const blogsPromise = getBlogs(false)
	return (
		<div className="flex w-full flex-col items-center gap-8">
			<Suspense fallback={<p>Loading blogs...</p>}>
				<Blogs blogsPromise={blogsPromise} />
			</Suspense>
		</div>
	)
}
