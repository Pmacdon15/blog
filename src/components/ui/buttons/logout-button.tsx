'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/buttons/button'
import { useIsAdmin } from '@/lib/hooks/hooks'

export function LogoutButton() {
	const handleLogout = async () => {
		await signOut({ redirectTo: '/' })
	}

	const { data } = useIsAdmin()
	return <>{data && <Button onClick={handleLogout} text={'Logout'} />}</>
}
