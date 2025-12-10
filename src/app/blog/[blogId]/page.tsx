import { Suspense } from 'react'
import BlogComponent from '@/components/ui/blog-component/blog-component'
import ContextController from '@/components/ui/context-controller/context-controller'
import BlogSectionsFallback from '@/components/ui/fallbacks/blog-sections-fallback'
import EditBlogComponent from '@/components/ui/sections/edit-section-components/edit-blog-component/edit-blog-component'
import { getSections } from '@/lib/DAL/blogs-dal'

export default function BlogPage(props: PageProps<'/blog/[blogId]'>) {
	const sectionsPromise = props.params.then((params) =>
		getSections(params.blogId),
	)

	return (
		<ContextController
			child1={
				<Suspense fallback={<BlogSectionsFallback />}>
					<EditBlogComponent dataPromise={sectionsPromise} />
				</Suspense>
			}
			child2={
				<Suspense fallback={<BlogSectionsFallback />}>
					<BlogComponent dataPromise={sectionsPromise} />
				</Suspense>
			}
		/>
	)
}
