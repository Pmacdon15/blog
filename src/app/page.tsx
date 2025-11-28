import AboutComponent from '@/components/ui/about/about-component'
import { BlogsCarousel } from '@/components/ui/blogs-carousel/blogs-carousel' // Updated import
import { getBlogs } from '@/lib/DAL/blogs-dal'

export default function Home() {
	const blogsPromise = getBlogs(true)
	return (
		<div className="flex w-full flex-col items-center gap-8">
			<AboutComponent />
			<BlogsCarousel blogsPromise={blogsPromise} />{' '}
			{/* Updated component usage */}
		</div>
	)
}
