import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import type { BlogData } from '@/types/types'
import { BlogCard } from '../blog-card/blog-card'
import { NoticeDisplay } from '../text-display/notice'

export async function BlogsCarousel({
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
		<>
			{blogs.length > 0 && (
				<div className={`flex w-full justify-center gap-4`}>
					<CarouselWrapper blogCount={blogs?.length}>
						{blogs.map((blog: BlogData) => (
							<CarouselItem
								className="basis-[88%] sm:basis-[62%] md:basis-[51%] lg:basis-[31%]"
								key={blog.id}
							>
								<BlogCard blog={blog} linkToEdit={false} />
							</CarouselItem>
						))}
					</CarouselWrapper>
				</div>
			)}
		</>
	)
}

export function CarouselWrapper({
	children,
	blogCount,
}: {
	children: React.ReactNode
	blogCount?: number
}) {
	return (
		<Carousel className="mx-auto w-full max-w-full md:w-5/6 md:max-w-5/6 lg:max-w-4/6">
			<CarouselContent className="justify-center">
				{children}
			</CarouselContent>
			{blogCount && blogCount > 1 && <CarouselPrevious />}
			{blogCount && blogCount > 1 && <CarouselNext />}
		</Carousel>
	)
}
