import { Suspense } from 'react'
import ContextController from '@/components/ui/context-controller/context-controller'
import { getAllBlogIds, getSections } from '@/lib/DAL/blogs-dal'

export async function generateStaticParams() {
	const blogIds = await getAllBlogIds()
	if ('error' in blogIds) {
		console.error('Error generating static params:', blogIds.error)
		return []
	}
	return blogIds
}

export default async function BlogPage(
	props: PageProps<'/edit-blog/[blogId]'>,
) {
	const { blogId } = await props.params
	const sectionsPromise = getSections(blogId)

	return (
		<Suspense fallback={<div>Loading sections...</div>}>
			<ContextController defaultState sectionsPromise={sectionsPromise} />
		</Suspense>
	)
}
