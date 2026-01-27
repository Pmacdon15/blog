// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'
// import { auth } from '@/auth'

// const protectedRoutes = ['/edit-blog']

// export default async function proxy(request: NextRequest) {
// 	const { pathname } = request.nextUrl

// 	const isProtected = protectedRoutes.some((route) =>
// 		pathname.startsWith(route),
// 	)

// 	if (isProtected) {
// 		const session = await auth()

// 		if (
// 			session?.user?.email !== process.env.OWNERS_EMAIL &&
// 			process.env.OWNERS_EMAIL !== '' &&
// 			process.env.OWNERS_EMAIL !== undefined
// 		) {
// 			return NextResponse.redirect(
// 				new URL('/api/auth/signin', request.url),
// 			)
// 		}
// 	}

// 	return NextResponse.next()
// }

import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware'

export default withAuth(async function middleware(_req: Request) {}, {
	// Middleware still runs on all routes, but doesn't protect the blog route
	publicPaths: ['/blog', '/' ,'/sitemap*'],
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	],
}

// export default withAuth(async function middleware(req) {
//   console.log("look at me", req.kindeAuth);
// });
