import BlogComponent from '@/components/ui/blog-component/blog-component'
import ContextController from '@/components/ui/context-controller/context-controller'
import EditBlogComponent from '@/components/ui/sections/edit-section-components/edit-blog-component/edit-blog-component'
import { getAllBlogIds, getSections } from '@/lib/DAL/blogs-dal'
export async function generateStaticParams() {
	const result = await getAllBlogIds()

	if ('error' in result) {
		console.error(
			'GS failed to fetch IDs, falling back to dynamic rendering:',
			result.error,
		)
		return []
	}

	return result
}

export default function BlogPage(props: PageProps<'/blog/[blogId]'>) {
	const sectionsPromise = props.params.then((params) =>
		getSections(params.blogId),
	)

	return (
		<ContextController
			child1={<EditBlogComponent dataPromise={sectionsPromise} />}
			child2={<BlogComponent dataPromise={sectionsPromise} />}
		/>
	)
}
