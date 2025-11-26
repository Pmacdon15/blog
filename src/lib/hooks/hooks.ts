import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { Section } from '@/types/types'
import { isAdmin } from '../actions/auth'

export const useIsAdmin = () => {
	return useQuery<{ isAdmin: boolean; isLoggedIn: boolean }>({
		queryKey: ['isAdmin'],
		queryFn: () => isAdmin(),
	})
}

export const useSyncedSections = (
	initialData: Section[],
): [Section[], React.Dispatch<React.SetStateAction<Section[]>>] => {
	const [sections, setSections] = useState<Section[]>(initialData)

	useEffect(() => {
		setSections(initialData)
	}, [initialData])

	return [sections, setSections]
}
