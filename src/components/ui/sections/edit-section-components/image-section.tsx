'use client'
import Image from 'next/image'
import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { throttle } from '@/lib/utils'
import type { Section } from '@/types/types'

export function ImageSection({
	section,
	onChange,
}: {
	section: Section
	onChange: (sectionId: number, newContent: Partial<Section>) => void
}) {
	const containerRef = useRef<HTMLDivElement>(null)
	const { width } = useThrottledWidth(
		containerRef,
		section.width || 150,
		(newWidth) => {
			onChange(section.id, { width: newWidth })
		},
	)
	const [preview, setPreview] = useState<string | null>(null)

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

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 p-4">
			<div
				className="h-auto max-h-[810px] max-w-[810px] overflow-hidden rounded-sm border p-2"
				ref={containerRef}
				style={{
					width: `${width}px`,
					aspectRatio: '1 / 1',
					resize: 'horizontal',
				}}
			>
				<Image
					alt={section.alt || ''}
					className="h-full w-full object-contain"
					height={800}
					src={imageSrc || ''}
					width={800}
				/>
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

function useThrottledWidth(
	containerRef: React.RefObject<HTMLDivElement | null>,
	initialWidth: number,
	onChange: (newWidth: number) => void,
) {
	const [width, setWidth] = useState(initialWidth)
	const isInitialRender = useRef(true)
	const throttledOnChange = useCallback(
		throttle((newWidth: number) => {
			onChange(newWidth)
		}, 100),
		[],
	)

	useEffect(() => {
		if (!containerRef.current) return

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newWidth = Math.round(entry.contentRect.width)
				if (isInitialRender.current) {
					isInitialRender.current = false
					return
				}
				setWidth(newWidth)
				throttledOnChange(newWidth)
			}
		})

		observer.observe(containerRef.current)

		return () => {
			observer.disconnect()
		}
	}, [throttledOnChange, containerRef])

	return { width, setWidth }
}
