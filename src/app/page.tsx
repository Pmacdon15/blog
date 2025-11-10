import { Suspense } from 'react'
import AddBlogForm from '@/components/ui/add-blog-form/add-blog-form'
import { LogoutButton } from '@/components/ui/buttons/logout-button'
import { DisplayBlogs } from '@/components/ui/display-blogs/display-blogs'
import { getBlogs } from '@/lib/DAL/blogs-dal'

export default async function Home(props: PageProps<'/'>) {
	const page = Number((await props.searchParams).page) || 1
	const blogsPromise = getBlogs({ page })

	return (
		<>
			<Suspense
				fallback={<div className="text-2xl">Loading blogs...</div>}
			>
				<DisplayBlogs blogsPromise={blogsPromise} />
			</Suspense>
			<AddBlogForm />
			<LogoutButton />
		</>
	)
}
