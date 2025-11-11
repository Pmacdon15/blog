'use client'
import { useTogglePublishBlog } from '@/lib/mutations/mutations'
import { Button } from './button'

export default function TogglePublished({
	blogId,
	published,
}: {
	blogId: number
	published: boolean
}) {
	const { mutate: mutateTogglePublished } = useTogglePublishBlog(blogId)
	return (
		<Button
			onClick={() => mutateTogglePublished({ blogId })}
			text={published ? 'Unpublish this Blog' : 'Publish This Blog'}
		/>
	)
}
