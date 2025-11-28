import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { throttle } from '@/lib/utils'

export function ImageSection({
	isPending,
	isError,
}: {
	isPending: boolean
	isError: boolean
}) {
	const containerRef = useRef<HTMLDivElement>(null)
	const { width, setWidth } = useThrottledWidth(containerRef, 150)
	const [imageSrc, setImageSrc] = useState('')

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0]
			setImageSrc(URL.createObjectURL(file))
		}
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 rounded-sm border p-4 border-muted-foreground bg-white/60">
			<div className="flex w-full flex-col items-center justify-center gap-4">
				<div
					className="h-auto max-h-[810px] min-w-36 max-w-[810px] overflow-hidden rounded-sm border p-2 border-muted-foreground"
					ref={containerRef}
					style={{
						width: `${width}px`, // Controlled by state
						aspectRatio: '1 / 1',
						resize: 'horizontal',
					}}
				>
					{imageSrc !== '' && (
						<Image
							alt={''}
							className="h-full w-full object-contain border-muted-foreground"
							height={800}
							src={imageSrc || ''}
							width={800}
						/>
					)}
				</div>
				<input
					className="w-5/6 rounded-sm border border-muted-foreground p-2 md:w-4/5"
					name="new-file"
					onChange={handleFileChange}
					placeholder="Select new image"
					type="file"
				/>
				<input
					className="rounded-sm border border-muted-foreground p-2"
					name="alt"
					placeholder="Description"
					type="text"
				/>
				<input
					className="rounded-sm border border-muted-foreground p-2"
					hidden
					min="0"
					name="width" // Controlled by state
					onChange={(e) =>
						setWidth(Math.max(0, Number(e.target.value)))
					} // Allow input changes
					placeholder="Width (px)"
					type="number"
					value={width}
				/>
				{isPending && <p>Loading...</p>}
				{isError && (
					<p className="text-red-600">Error adding section </p>
				)}
			</div>
		</div>
	)
}

// At the bottom of the page
function useThrottledWidth(
	containerRef: React.RefObject<HTMLDivElement | null>,
	initialWidth: number,
) {
	const [width, setWidth] = useState(initialWidth)
	const isInitialRender = useRef(true)
	const throttledSetWidth = useCallback((newWidth: number) => {
		setWidth(newWidth)
	}, [])

	useEffect(() => {
		const throttled = throttle(throttledSetWidth, 100)
		if (!containerRef.current) return

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const newWidth = Math.round(entry.contentRect.width)
				if (isInitialRender.current) {
					isInitialRender.current = false
					return
				}
				throttled(newWidth)
			}
		})

		observer.observe(containerRef.current)

		return () => {
			observer.disconnect()
		}
	}, [throttledSetWidth, containerRef])

	return { width, setWidth }
}
