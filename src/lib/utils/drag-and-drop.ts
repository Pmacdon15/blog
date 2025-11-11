import {
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useCallback } from 'react'
import { useUpdateBlogOrder } from '@/lib/mutations/mutations'
import type { Section } from '@/types/types'

export const useDragSensors = () => {
	return useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor, {
			activationConstraint: {
				distance: 100,
				handler: true,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	)
}

export const useBlogOrderMutation = (blogId: number) => {
	const { mutate: mutateUpdateBlogOrder } = useUpdateBlogOrder(blogId)

	const saveOrder = useCallback(
		(currentSections: Section[]) => {
			const newOrder = currentSections.map((section, index) => ({
				id: section.id,
				order_index: index,
			}))
			mutateUpdateBlogOrder({
				blogId,
				newOrder: newOrder,
			})
		},
		[mutateUpdateBlogOrder, blogId],
	)

	return { saveOrder }
}
