'use client'

import { loginDiscord, logout } from '@/lib/actions/auth'
import { useIsAdmin } from '@/lib/hooks/hooks'

export default function Header() {
	const { data } = useIsAdmin()
	const isLoggedIn = data?.isLoggedIn

	return (
		<header className="sticky top-4 z-50 flex w-full items-center justify-center">
			<div className="flex w-11/12 items-center justify-between rounded-full border bg-muted-foreground/30 px-8 py-4 shadow-lg backdrop-blur-md transition-all hover:bg-muted-foreground/20 md:w-3/4 lg:w-2/3">
				<h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold text-2xl text-bg-muted-foreground/30 md:text-3xl">
					{process.env.NEXT_PUBLIC_OWNER_NAME}&apos;s Blogs
				</h1>
				{isLoggedIn ? (
					<button
						className="rounded-full border border-primary/20 bg-primary/10 px-6 py-2 font-medium text-bg-muted-foreground/30 text-sm transition-all hover:bg-primary/20 hover:shadow-md active:scale-95"
						onClick={() => logout()}
						type="button"
					>
						Logout
					</button>
				) : (
					<button
						className="rounded-full border border-primary/20 bg-primary/10 px-6 py-2 font-medium text-bg-muted-foreground/30 text-sm transition-all hover:bg-primary/20 hover:shadow-md active:scale-95"
						onClick={() => loginDiscord()}
						type="button"
					>
						Login
					</button>
				)}
			</div>
		</header>
	)
}
