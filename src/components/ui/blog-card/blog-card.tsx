import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import type { BlogData } from '@/types/types'

export function BlogCard({
	blog,
	linkToEdit,
}: {
	blog: BlogData
	linkToEdit: boolean
}) {
	return (
		<Card className="relative w-full max-w-sm">
			<CardHeader>
				<CardTitle className="mx-auto">{blog.title}</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				{blog.image_src && (
					<div className="flex justify-center">
						<Image
							alt={'Blog Image'}
							className="mr-2 h-24 w-24 rounded-full object-cover object-center"
							height={200}
							src={blog.image_src}
							width={200}
						/>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Link
					href={
						linkToEdit
							? `/edit-blog/${blog.id}`
							: `/blog/${blog.id}`
					}
				>
					<Button className="w-full" type="submit">
						View
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
