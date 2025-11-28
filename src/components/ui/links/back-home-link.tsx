import Link from 'next/link'
import { Button } from '../button'

export default function BackHomeLink() {
	return (
		<Link
			className="mx-auto p-2 transition-transform duration-300 hover:scale-110"
			href="/"
		>
			<Button>Back Home</Button>
		</Link>
	)
}
