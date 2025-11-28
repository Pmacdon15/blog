import type { BlogData } from '@/types/types'
import { BlogCard } from '../blog-card/blog-card'
import { NoticeDisplay } from '../text-display/notice'

export async function Blogs({
	blogsPromise,
}: {
	blogsPromise: Promise<BlogData[] | { error: string }>
}) {
	const blogs = await blogsPromise

	if ('error' in blogs)
		return <NoticeDisplay>Error: {blogs.error}</NoticeDisplay>

	if (!blogs || blogs.length === 0)
		return <NoticeDisplay>No blogs found</NoticeDisplay>

	return (
		<div className="flex w-full flex-wrap justify-center gap-4">
			{blogs.map((blog: BlogData) => (
				<BlogCard blog={blog} key={blog.id} />
			))}
		</div>
	)
}
