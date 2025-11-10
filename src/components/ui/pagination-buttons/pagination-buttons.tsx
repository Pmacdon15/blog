import Link from 'next/link'
import type { PaginationProps } from '@/types/types'

export function PaginationButtons({
	page,
	path,
	hasMoreBlogs,
}: PaginationProps) {
	return (
		<div className="flex gap-4">
			{page > 1 && (
				<Link href={{ pathname: path, query: { page: page - 1 } }}>
					Previous
				</Link>
			)}
			{hasMoreBlogs && (
				<Link href={{ pathname: path, query: { page: page + 1 } }}>
					disabled={!hasMoreBlogs}
					Next
				</Link>
			)}
		</div>
	)
}
