import { PaginationProps } from "@/types/types"

export function PaginationButtons({ page, setPage, hasMoreBlogs }: PaginationProps) {
    return (
      <div className="flex gap-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (hasMoreBlogs) {
              setPage((old) => old + 1)
            }
          }}
          disabled={!hasMoreBlogs}
        >
          Next
        </button>
      </div>
    )
  }