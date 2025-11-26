'use client'
import { loginDiscord } from '@/lib/actions/auth'

export default function Header() {
	return (
		<div className="mt-4 flex w-full flex-col items-center justify-center">
			<button
				className="w-5/6 p-4 text-center text-6xl underline md:w-3/6"
				onClick={() => loginDiscord()}
				type="button"
			>
				{process.env.NEXT_PUBLIC_OWNER_NAME}&apos;s Blogs
			</button>
		</div>
	)
}
