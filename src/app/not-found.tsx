import Link from 'next/link'
import PageContainer from '@/components/ui/containters/page-container'
 
export default function NotFound() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-4xl font-bold">Page Not Found</h2>
        <p className="text-lg">We couldn&lsquo;t find the page you were looking for.</p>
        <Link
            href="/"
            className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
        >
            Return Home
        </Link>
      </div>
    </PageContainer>
  )
}