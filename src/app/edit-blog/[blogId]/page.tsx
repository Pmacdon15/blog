import BlogComponent from '@/components/ui/blog-component/blog-component'
import ContextController from '@/components/ui/context-controller/context-controller'
import EditBlogComponent from '@/components/ui/sections/edit-section-components/edit-blog-component/edit-blog-component'
import { getUnpublishedOrPublishedSections } from '@/lib/DAL/blogs-dal'

export default function BlogPage(props: PageProps<'/blog/[blogId]'>) {
	const sectionsPromise = props.params.then((params) =>
		getUnpublishedOrPublishedSections(params.blogId),
	)

	return (
		<ContextController
			child1={<EditBlogComponent dataPromise={sectionsPromise} />}
			child2={<BlogComponent dataPromise={sectionsPromise} />}
			defaultState
		/>
	)
}
