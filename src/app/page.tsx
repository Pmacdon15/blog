import AboutComponent from '@/components/ui/about/about-component'
import AddBlogForm from '@/components/ui/add-blog-form/add-blog-form'
import { LogoutButton } from '@/components/ui/buttons/logout-button'
import { DisplayBlogs } from '@/components/ui/display-blogs/display-blogs'
import { getBlogs } from '@/lib/DAL/blogs-dal'

export default function Home() {
	const blogsPromise = getBlogs()
	return (
		<>
			<AboutComponent />

			<DisplayBlogs blogsPromise={blogsPromise} />

			
			<LogoutButton />
		</>
	)
}
