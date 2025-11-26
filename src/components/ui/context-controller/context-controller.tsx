'use client'
import { Activity, useState } from 'react'
import { useIsAdmin } from '@/lib/hooks/hooks'
import { Button } from '../button'
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
				<Button onClick={() => setEditBlog(!editBlog)}>
					{editBlog ? 'Show Blog' : 'Edit Blog'}
				</Button>
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
				<Button onClick={() => setEditBlog(!editBlog)}>
					{editBlog ? 'Show Blog' : 'Edit Blog'}
				</Button>
			)}
			<BackHomeLink />
		</>
	)
}
