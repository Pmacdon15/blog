import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function throttle<Args extends unknown[], Return = void>(
	func: (...args: Args) => Return,
	limit: number,
): (...args: Args) => void {
	let inThrottle: boolean
	return (...args: Args) => {
		if (!inThrottle) {
			func(...args)
			inThrottle = true
			setTimeout(() => {
				inThrottle = false
			}, limit)
		}
	}
}
