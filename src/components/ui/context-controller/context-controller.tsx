'use client'
import { Activity, Suspense, useEffect, useState } from 'react'
import { useIsAdmin } from '@/lib/hooks/hooks'
import { Button } from '../button'
import BackHomeLink from '../links/back-home-link'

export default function ContextController({
	defaultState = false,
	child1,
	child2,
}: {
	child1: React.ReactNode
	child2: React.ReactNode
	defaultState?: boolean
}) {
	const [editBlog, setEditBlog] = useState(defaultState)
	const [hasMounted, setHasMounted] = useState(false)
	const { data } = useIsAdmin()

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null // Or a loading spinner
	}

	return (
		<>
			{/* <BackHomeLink /> */}
			{data?.isAdmin && (
				<Button onClick={() => setEditBlog(!editBlog)}>
					{editBlog ? 'Show Blog' : 'Edit Blog'}
				</Button>
			)}
			{data?.isAdmin ? (
				<>
					<Suspense>{editBlog && child1}</Suspense>
					<Activity mode={!editBlog ? 'visible' : 'hidden'}>
						<Suspense>{child2}</Suspense>
					</Activity>
				</>
			) : (
				child2
			)}			
			<BackHomeLink />
		</>
	)
}
