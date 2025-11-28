'use server'
import type { Route } from 'next'
import { revalidatePath, updateTag } from 'next/cache'
import { RedirectType, redirect } from 'next/navigation'

export async function revalidatePathAction(path: string) {
	revalidatePath(path)
}

export async function updateTagAction(path: string) {
	updateTag(path)
}

export async function redirectAction(path: string) {
	redirect(path as Route, RedirectType.push)
}
