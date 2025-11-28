import { Suspense } from 'react'
import AddBlogForm from '@/components/ui/add-blog-form/add-blog-form'
import { Blogs } from '@/components/ui/blogs/blogs'
import BackHomeLink from '@/components/ui/links/back-home-link'
import { getUnpublishedBlogs } from '@/lib/DAL/blogs-dal'

export default function Page() {
	const blogsPromise = getUnpublishedBlogs()
	return (
		<div className="flex w-full flex-col items-center gap-8">
			<Suspense>
				<Blogs blogsPromise={blogsPromise} linkToEdit />
			</Suspense>
			<AddBlogForm />
			<BackHomeLink />
		</div>
	)
}
