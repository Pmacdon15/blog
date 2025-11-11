import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

const protectedRoutes = ['/edit-blog']

export default async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	)

	if (isProtected) {
		const session = await auth()

		if (
			session?.user?.email !== process.env.OWNERS_EMAIL &&
			process.env.OWNERS_EMAIL !== '' &&
			process.env.OWNERS_EMAIL !== undefined
		) {
			return NextResponse.redirect(
				new URL('/api/auth/signin', request.url),
			)
		}
	}

	return NextResponse.next()
}
