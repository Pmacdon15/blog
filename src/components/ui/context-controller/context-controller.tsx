'use client'
import { use, useState } from 'react'
import { useIsAdmin } from '@/lib/hooks/hooks'
import type { Section } from '@/types/types'
import BlogComponent from '../blog-component/blog-component'
import { Button } from '../buttons/button'
import BackHomeLink from '../links/back-home-link'
import EditBlogComponent from '../sections/edit-section-components/edit-blog-component/edit-blog-component'
import { NoticeDisplay } from '../text-display/notice'

export default function ContextController({
	sectionsPromise,
	defaultState = false,
}: {
	sectionsPromise: Promise<Section[] | { error: string }>
	defaultState?: boolean
}) {
	const [editBlog, setEditBlog] = useState(defaultState)
	const { data: isAdmin } = useIsAdmin()
	const data = use(sectionsPromise)
	if ('error' in data)
		return <NoticeDisplay>Error: {data.error}</NoticeDisplay>

	if (!data) return <NoticeDisplay>Loading...</NoticeDisplay>

	return (
		<>
			<BackHomeLink />
			{isAdmin && (
				<Button
					onClick={() => setEditBlog(!editBlog)}
					text={`${editBlog ? 'Show Blog' : 'Edit Blog'}`}
				/>
			)}
			{editBlog && isAdmin ? (
				<EditBlogComponent data={data} />
			) : (
				<BlogComponent data={data} />
			)}
			{isAdmin && (
				<button
					className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
					onClick={() => {
						setEditBlog(!editBlog)
					}}
					type="button"
				>{`${editBlog ? 'Show Blog' : 'Edit Blog'} `}</button>
			)}
			<BackHomeLink />
		</>
	)
}
