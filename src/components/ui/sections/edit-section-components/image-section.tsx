import Image from 'next/image'
import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { throttle } from '@/lib/utils'
import type { Section, SectionState } from '@/types/types'
import { UpdateButton } from '../../buttons/update-button'
import { Title } from './title'

export function ImageSection({
	section,
	formAction,
	formActionDelete,
	sectionState,
	handleImageChange,
	isPending,
}: {
	section: Section
	formAction: (formData: FormData) => void
	formActionDelete: () => void
	sectionState: SectionState
	handleImageChange: (
		event: ChangeEvent<HTMLInputElement>,
		sectionId: number,
	) => void
	isPending: boolean
}) {
	const [showOldPhoto, setShowOldPhoto] = useState(true)
	const containerRef = useRef<HTMLDivElement>(null)
	const { width, setWidth } = useThrottledWidth(
		containerRef,
		section.width || 150,
	)

	// Image source: new photo if !showOldPhoto and sectionState exists, else old photo
	const imageSrc =
		!showOldPhoto && sectionState[section.id]
			? sectionState[section.id]
			: section.src || '/placeholder.jpg'

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 p-4">
			<Title formActionDelete={formActionDelete} />
			<form className="flex w-full flex-col items-center justify-center gap-4">
				<div
					className="h-auto max-h-[810px] max-w-[810px] overflow-hidden rounded-sm border p-2"
					ref={containerRef}
					style={{
						width: `${width}px`, // Controlled by state
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
					onChange={(e) => {
						handleImageChange(e, section.id)
						setShowOldPhoto(false) // Show new photo after upload
					}}
					placeholder="Select new image"
					type="file"
				/>
				<input
					className="rounded-sm border border-white p-2"
					defaultValue={section.alt || ''}
					name="alt"
					placeholder="Description"
					required
					type="text"
				/>
				<input
					className="rounded-sm border border-white p-2"
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
				<UpdateButton
					actionString="Update Section"
					disabled={isPending}
					formAction={formAction}
				/>
			</form>
			{sectionState[section.id] && (
				<button
					className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
					onClick={() => setShowOldPhoto(!showOldPhoto)}
					type="button"
				>
					{showOldPhoto ? 'Preview New Photo' : 'Show Old Photo'}
				</button>
			)}
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
