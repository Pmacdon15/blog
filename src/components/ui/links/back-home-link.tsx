import Link from 'next/link'

export default function BackHomeLink() {
	return (
		<Link
			className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
			href="/"
		>
			Back Home
		</Link>
	)
}
