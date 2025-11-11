'use client' // Error components must be Client Components

import { useEffect } from 'react'
import PageContainer from '@/components/ui/containters/page-container'
import GoHomeLink from '@/components/ui/links/go-home-link'

export default function ErrorPage({
	errorProp,
	reset,
}: {
	errorProp: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(errorProp)
	}, [errorProp])

	return (
		<PageContainer>
			<div className="flex flex-col items-center justify-center gap-4 text-center">
				<h2 className="font-bold text-4xl">Something went wrong!</h2>
				<p className="text-lg">
					We apologize, but an unexpected error occurred while loading
					this blog.
				</p>
				<button
					className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
					onClick={
						// Attempt to recover by trying to re-render the segment
						() => reset()
					}
					type="button"
				>
					Try again
				</button>
				<GoHomeLink />
			</div>
		</PageContainer>
	)
}
