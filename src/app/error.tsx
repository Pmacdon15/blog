'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import PageContainer from '@/components/ui/containters/page-container'
import GoHomeLink from '@/components/ui/links/go-home-link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-4xl font-bold">Something went wrong!</h2>
        <p className="text-lg">We apologize, but an unexpected error occurred.</p>
        <button
          className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <GoHomeLink />
      </div>
    </PageContainer>
  )
}