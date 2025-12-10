import { Suspense } from 'react'
import BlogComponent from '@/components/ui/blog-component/blog-component'
import ContextController from '@/components/ui/context-controller/context-controller'
import EditBlogComponent from '@/components/ui/sections/edit-section-components/edit-blog-component/edit-blog-component'
import { getSections } from '@/lib/DAL/blogs-dal'

export default function BlogPage(props: PageProps<'/blog/[blogId]'>) {
	const sectionsPromise = props.params.then((params) =>
		getSections(params.blogId),
	)

	return (
		<ContextController
			child1={
				<Suspense
					fallback={
						<div className="mb-4 w-full rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md sm:w-5/6 lg:w-4/6">
							<h1 className="break-words text-center text-5xl">
								Loading...
							</h1>
						</div>
					}
				>
					<EditBlogComponent dataPromise={sectionsPromise} />
				</Suspense>
			}
			child2={
				<Suspense
					fallback={
						<div className="mb-4 w-full rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md sm:w-5/6 lg:w-4/6">
							<h1 className="break-words text-center text-5xl">
								Loading...
							</h1>
						</div>
					}
				>
					<BlogComponent dataPromise={sectionsPromise} />
				</Suspense>
			}
		/>
	)
}
