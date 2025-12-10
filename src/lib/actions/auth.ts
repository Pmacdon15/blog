'use server'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export const isAdmin = async () => {
	const { getUser } = getKindeServerSession()
	const user = await getUser()

	return {
		isAdmin:
			user?.email === process.env.OWNERS_EMAIL &&
			process.env.OWNERS_EMAIL !== '' &&
			process.env.OWNERS_EMAIL !== undefined,		
	}
}
