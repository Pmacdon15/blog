import Image from 'next/image'
import Link from 'next/link'
import { PaginationButtons } from '@/components/ui/pagination-buttons/pagination-buttons'
import { getBlogs } from '@/lib/DAL/blogs-dal'
import type { BlogData } from '@/types/types'
import { NoticeDisplay } from '../text-display/notice'

export async function DisplayBlogs({ props }: { props: PageProps<'/'> }) {
	const searchParams = await props.searchParams
	const page = Number(searchParams.page || 1)

	const result = await getBlogs({ page })

	if ('error' in result)
		return <NoticeDisplay>Error: {result.error}</NoticeDisplay>

	const { blogs, hasMore } = result

	if (!blogs || blogs.length === 0)
		return <NoticeDisplay>No blogs found</NoticeDisplay>

	const publishedBlogs = blogs.filter((b) => b.published)
	const unpublishedBlogs = blogs.filter((b) => !b.published)

	return (
		<div className="flex w-full flex-col items-center justify-center">
			{publishedBlogs.length > 0 && (
				<div className="flex w-full flex-col items-center gap-4">
					<h2 className="text-2xl">Published Blogs</h2>
					<div
						className={`flex w-full flex-wrap justify-center gap-4`}
					>
						{publishedBlogs.map((blog: BlogData) => (
							<BlogCard blog={blog} key={blog.id} />
						))}
					</div>
				</div>
			)}
			{unpublishedBlogs.length > 0 && (
				<div className="flex w-full flex-col items-center gap-4">
					<h2 className="text-2xl">Unpublished Drafts</h2>
					<div
						className={`flex w-full flex-wrap justify-center gap-4`}
					>
						{unpublishedBlogs.map((blog: BlogData) => (
							<BlogCard blog={blog} key={blog.id} />
						))}
					</div>
				</div>
			)}
			<PaginationButtons hasMoreBlogs={hasMore} page={1} path={'/'} />
		</div>
	)
}

function BlogCard({ blog }: { blog: BlogData }) {
	return (
		<div className="flex max-w-sm flex-shrink-0 flex-grow basis-80 flex-col items-center justify-center gap-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] shadow-xl">
			<h1 className="p-2 text-center text-2xl">{blog.title}</h1>
			{blog.image_src && (
				<Image
					alt={'Blog Image'}
					className="h-auto w-36 object-contain"
					height={800}
					src={blog.image_src || ''}
					width={800}
				/>
			)}
			<Link
				className="p-2"
				href={`/${blog.published ? 'blog' : 'edit-blog'}/${blog.id}`}
			>
				{blog.published ? 'View Blog' : 'Edit Draft'}
			</Link>
		</div>
	)
}
