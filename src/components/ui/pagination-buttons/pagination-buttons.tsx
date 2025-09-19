import { PaginationProps } from "@/types/types"
import Link from "next/link"

export function PaginationButtons({ page, path, hasMoreBlogs }: PaginationProps) {
  return (
    <div className="flex gap-4">
      {page > 1 && <Link href={path + "?page=" + (page - 1)}>
        Previous
      </Link>}
      {
        hasMoreBlogs && <Link href={path + "?page=" + (page + 1)}>
          disabled={!hasMoreBlogs}

          Next
        </Link>
      }
    </div >
  )
}