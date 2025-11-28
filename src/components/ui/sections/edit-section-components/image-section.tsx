'use client'
import { CornerDownRight } from 'lucide-react'
import Image from 'next/image'
import { type ChangeEvent, useState } from 'react'
import type { Section } from '@/types/types'

export function ImageSection({
	section,
	onChange,
}: {
	section: Section
	onChange: (sectionId: number, newContent: Partial<Section>) => void
}) {
	const [preview, setPreview] = useState<string | null>(null)
	const [width, setWidth] = useState(section.width || 800)

	const imageSrc = preview || section.src || '/placeholder.jpg'

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const result = reader.result as string
				setPreview(result)
				onChange(section.id, {
					src: result,
					new_file_object: file,
				})
			}
			reader.readAsDataURL(file)
		} else {
			setPreview(null)
			onChange(section.id, { src: null })
		}
	}

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		const startX = event.clientX
		const startWidth = width

		const handleMouseMove = (event: MouseEvent) => {
			const newWidth = startWidth + (event.clientX - startX)
			setWidth(newWidth)
			onChange(section.id, { width: newWidth })
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 p-4">
			<div
				className="relative h-auto max-h-[810px] max-w-[810px] overflow-hidden rounded-sm border border-muted-foreground p-2"
				style={{
					width: `${width}px`,
					aspectRatio: '1 / 1',
				}}
			>
				<Image
					alt={section.alt || ''}
					className="h-full w-full object-contain"
					height={800}
					src={imageSrc || ''}
					width={width}
				/>
				<div
					className="absolute right-0 bottom-0 cursor-se-resize p-2"
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault()
							// Add your keyboard-specific logic here
						}
					}}
					onMouseDown={handleMouseDown}
					role="button"
					tabIndex={0}
				>
					<CornerDownRight className="h-4 w-4" />
				</div>
			</div>
			<input
				className="w-5/6 rounded-sm border border-white p-2 md:w-4/6"
				name="new-file"
				onChange={handleImageChange}
				placeholder="Select new image"
				type="file"
			/>
			<input
				className="rounded-sm border border-white p-2"
				name="alt"
				onChange={(e) => onChange(section.id, { alt: e.target.value })}
				placeholder="Description"
				required
				type="text"
				value={section.alt || ''}
			/>
		</div>
	)
}
