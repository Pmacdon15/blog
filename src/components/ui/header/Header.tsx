'use client'
import { loginDiscord } from '@/lib/actions/auth'

export default function Header() {
	return (
		<div className="mt-4 flex w-full flex-col items-center justify-center">
			<h1 className="w-5/6 rounded-sm border p-4 text-center text-6xl md:w-3/6">
				{process.env.NEXT_PUBLIC_OWNER_NAME}&apos;s{' '}
				<button onClick={() => loginDiscord()} type="button">
					Blogs
				</button>
			</h1>
		</div>
	)
}
