import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import type { BlogData } from '@/types/types'
import { NoticeDisplay } from '../text-display/notice'

export async function DisplayBlogs({
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
		// <Container>
		<>
			{blogs.length > 0 && (
				<div className={`flex w-full justify-center gap-4`}>
					<BlogCarousel blogCount={blogs?.length}>
						{blogs.map((blog: BlogData) => (
							<CarouselItem
								className="basis-[88%] sm:basis-[62%] md:basis-[51%] lg:basis-[31%]"
								key={blog.id}
							>
								<BlogCard blog={blog} />
							</CarouselItem>
						))}
					</BlogCarousel>
				</div>
			)}
		</>
		// </Container>
	)
}

function BlogCard({ blog }: { blog: BlogData }) {
	return (
		<Card className="relative w-full max-w-sm">
			<CardHeader>
				<CardTitle className="mx-auto">{blog.title}</CardTitle>
				<CardDescription></CardDescription>
				{/* <CardAction>
					<Button variant="link">Sign Up</Button>
				</CardAction> */}
			</CardHeader>
			<CardContent>
				{blog.image_src && (
					<div className="flex justify-center">
						<Image
							alt={'Blog Image'}
							className="mr-2 h-24 w-24 rounded-full object-cover object-center"
							height={200}
							src={blog.image_src}
							width={200}
						/>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Link href={`/blog/${blog.id}`}>
					<Button className="w-full" type="submit">
						View
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}

export function BlogCarousel({
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
