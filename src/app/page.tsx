import { Suspense } from 'react'
import AddBlogForm from '@/components/ui/add-blog-form/add-blog-form'
import { LogoutButton } from '@/components/ui/buttons/logout-button'
import { DisplayBlogs } from '@/components/ui/display-blogs/display-blogs'

export default async function Home(props: PageProps<'/'>) {
	return (
		<>
			<Suspense
				fallback={<div className="text-2xl">Loading blogs...</div>}
			>
				<DisplayBlogs props={props} />
			</Suspense>
			<AddBlogForm />
			<LogoutButton />
		</>
	)
}
