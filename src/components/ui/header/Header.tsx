'use client'
import Link from 'next/link'
import { loginDiscord, logout } from '@/lib/actions/auth'
import { useIsAdmin } from '@/lib/hooks/hooks'

export default function Header() {
	const { data } = useIsAdmin()
	const isLoggedIn = data?.isLoggedIn

	return (
		<header className="sticky top-4 z-50 flex w-11/12 flex-col items-center justify-between rounded-full border bg-muted-foreground/30 px-8 py-4 shadow-lg backdrop-blur-md transition-all hover:bg-muted-foreground/20 md:w-3/4 md:flex-row lg:w-2/3">
			<Link href={'/'}>
				<h1 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold text-4xl text-bg-muted-foreground/30 md:text-3xl underline">
					{process.env.NEXT_PUBLIC_OWNER_NAME}&apos;s Blogs
				</h1>
			</Link>

			<div className="flex flex-col items-center gap-2 md:flex-row">
				<Link href={'/blogs'}>
					<button
						className="rounded-full border border-primary/20 bg-primary/10 px-6 py-2 font-medium text-bg-muted-foreground/30 text-sm transition-all hover:bg-primary/20 hover:shadow-md active:scale-95"
						type="button"
					>
						Blogs
					</button>
				</Link>
				{data?.isAdmin && isLoggedIn && (
					<Link href={'/unpublished-blogs'}>
						<button
							className="rounded-full border border-primary/20 bg-primary/10 px-6 py-2 font-medium text-bg-muted-foreground/30 text-sm transition-all hover:bg-primary/20 hover:shadow-md active:scale-95"
							type="button"
						>
							Unpublished Blogs
						</button>
					</Link>
				)}

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
