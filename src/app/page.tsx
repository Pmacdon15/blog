import AboutComponent from '@/components/ui/about/about-component'
import { DisplayBlogs } from '@/components/ui/display-blogs/display-blogs'
import { getBlogs } from '@/lib/DAL/blogs-dal'

export default function Home() {
	const blogsPromise = getBlogs()
	return (
		<div className="flex w-full flex-col items-center gap-8">
			<AboutComponent />
			<DisplayBlogs blogsPromise={blogsPromise} />
		</div>
	)
}
