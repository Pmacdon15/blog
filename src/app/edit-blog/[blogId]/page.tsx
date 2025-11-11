import { Suspense } from 'react'
import ContextController from '@/components/ui/context-controller/context-controller'
import EditBlogComponent from '@/components/ui/sections/edit-section-components/edit-blog-component/edit-blog-component'
import { getAllBlogIds, getSections } from '@/lib/DAL/blogs-dal'
import BlogComponent from '@/components/ui/blog-component/blog-component'

export async function generateStaticParams() {
	const blogIds = await getAllBlogIds()
	if ('error' in blogIds) {
		console.error('Error generating static params:', blogIds.error)
		return []
	}
	return blogIds
}

export default function BlogPage(
	props: PageProps<'/edit-blog/[blogId]'>,
) {
	const sectionsPromise = props.params.then((params) =>
		getSections(params.blogId),
	)

	return (
		<Suspense fallback={<div>Loading sections...</div>}>
			<ContextController
				child1={<EditBlogComponent dataPromise={sectionsPromise} />}
				child2={<BlogComponent dataPromise={sectionsPromise} />}
				defaultState
			/>
		</Suspense>
	)
}
