'use client'

import { signOut } from 'next-auth/react'
import { useIsAdmin } from '@/lib/hooks/hooks'
import { Button } from '../button'

export function LogoutButton() {
	const handleLogout = async () => {
		await signOut({ redirectTo: '/' })
	}

	const { data } = useIsAdmin()
	return <>{data && <Button onClick={handleLogout}>Log out</Button>}</>
}
