import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="mt-auto flex w-full flex-col items-center justify-center gap-4 border-t bg-muted-foreground/20 py-8 backdrop-blur-md md:flex-row md:justify-between md:px-16">
			<p className="text-muted-foreground text-sm">
				© 2025 Patrick MacDonald. All rights reserved.
			</p>
			<div className="flex gap-6">
				<Link
					className="font-medium text-sm transition-colors hover:text-primary hover:underline"
					href="mailto:patrick@patmac.ca"
				>
					patrick@patmac.ca
				</Link>
				<Link
					className="font-medium text-sm transition-colors hover:text-primary hover:underline"
					href="https://github.com/pmacdon15"
					rel="noopener noreferrer"
					target="_blank"
				>
					GitHub: pmacdon15
				</Link>
			</div>
		</footer>
	)
}
