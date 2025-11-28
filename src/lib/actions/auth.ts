'use server'
import { auth, signIn, signOut } from '@/auth'

export const loginDiscord = async () => {
	await signIn('discord', { redirectTo: '/' })
}

export const logout = async () => {
	await signOut({ redirectTo: '/' })
}

export const isAdmin = async () => {
	const session = await auth()	
	return {
		isAdmin:
			session?.user?.email === process.env.OWNERS_EMAIL &&
			process.env.OWNERS_EMAIL !== '' &&
			process.env.OWNERS_EMAIL !== undefined,
		isLoggedIn: !!session,
	}
}
