'use client'
import { Activity, useState } from 'react'
import { useIsAdmin } from '@/lib/hooks/hooks'
import { Button } from '../buttons/button'
import BackHomeLink from '../links/back-home-link'

export default function ContextController({
	// sectionsPromise,
	defaultState = false,
	child1,
	child2,
}: {
	// sectionsPromise: Promise<Section[] | { error: string }>
	child1: React.ReactNode
	child2: React.ReactNode
	defaultState?: boolean
}) {
	const [editBlog, setEditBlog] = useState(defaultState)
	const { data: isAdmin } = useIsAdmin()

	return (
		<>
			<BackHomeLink />
			{isAdmin && (
				<Button
					onClick={() => setEditBlog(!editBlog)}
					text={`${editBlog ? 'Show Blog' : 'Edit Blog'}`}
				/>
			)}
			{isAdmin && (
				<>
					<Activity mode={editBlog ? 'visible' : 'hidden'}>
						{child1}
					</Activity>
					<Activity mode={!editBlog ? 'visible' : 'hidden'}>
						{child2}
					</Activity>
				</>
			)}
			{!isAdmin && child2}
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
