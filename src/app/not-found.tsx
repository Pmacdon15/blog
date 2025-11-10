import Link from 'next/link'
import PageContainer from '@/components/ui/containters/page-container'

export default function NotFound() {
	return (
		<PageContainer>
			<div className="flex flex-col items-center justify-center gap-4 text-center">
				<h2 className="font-bold text-4xl">Page Not Found</h2>
				<p className="text-lg">
					We couldn&lsquo;t find the page you were looking for.
				</p>
				<Link
					className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
					href="/"
				>
					Return Home
				</Link>
			</div>
		</PageContainer>
	)
}
