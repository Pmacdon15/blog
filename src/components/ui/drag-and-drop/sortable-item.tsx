'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip } from 'lucide-react'
import type React from 'react'

interface SortableItemProps {
	id: number
	children: React.ReactNode
}

const SortableItem = ({ id, children }: SortableItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div className="flex w-full flex-col" ref={setNodeRef} style={style}>
			<div
				{...attributes}
				{...listeners}
				className="cursor-grab self-start p-2"
				style={{ touchAction: 'none' }}
			>
				<Grip />
			</div>
			<div className="w-full">{children}</div>
		</div>
	)
}

export default SortableItem
