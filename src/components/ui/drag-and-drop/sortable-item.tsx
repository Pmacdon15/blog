'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, X } from 'lucide-react'
import type React from 'react'

interface SortableItemProps {
	id: number
	children: React.ReactNode
	handleDelete: (id: number) => void
}

const SortableItem = ({ id, children, handleDelete }: SortableItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			className="relative flex w-full flex-col bg-white/30 backdrop-blur-md rounded-lg border border-white/10 mb-4"
			ref={setNodeRef}
			style={style}
		>
			<div className="absolute right-1 top-1">
				<button
					type="button"
					onClick={() => handleDelete(id)}
					className="cursor-pointer text-red-600"
				>
					<X />
				</button>
			</div>
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
