import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Section } from '@/types/types'

const renderTextWithLinks = (text: string) => {
	const linkRegex = /\[(.*?)\]\((.*?)\)/g
	const parts = text.split(linkRegex)

	return parts.map((part, index) => {
		if (index % 3 === 0) {
			return <React.Fragment key={index}>{part}</React.Fragment>
		} else if (index % 3 === 1) {
			const linkText = part
			const linkUrl = parts[index + 1]
			return (
				<Link
					className="underline"
					href={
						linkUrl as __next_route_internal_types__.RouteImpl<string>
					}
					key={index}
				>
					{linkText}
				</Link>
			)
		}
		return null
	})
}

export default async function BlogComponent({
	dataPromise,
}: {
	dataPromise: Promise<Section[]>
}) {
	const data = await dataPromise
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 p-4 sm:w-5/6 lg:w-4/6">
			{data?.map((section) => {
				switch (section.section_type_id) {
					case 1:
						return (
							<div
								className="mb-4 w-full rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md"
								key={section.order_index}
							>
								<h1 className="break-words text-center text-5xl">
									{section.title_section_title}
								</h1>
								<p className="break-words text-center md:text-start">
									Published on{' '}
									{section.publish_date
										? new Date(
												section.publish_date,
											).toLocaleDateString('en-US', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
											})
										: 'N/A'}
								</p>
							</div>
						)
					case 2:
						return (
							<div
								className="mb-4 flex w-full justify-center rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md"
								key={section.order_index}
							>
								<Image
									alt={section.alt || ''}
									className={`h-auto`}
									height={600}
									src={section.src || ''}
									style={{
										width: `${section.width}px`,
									}}
									width={600}
								/>
							</div>
						)
					case 3:
						return (
							<div
								className="mb-4 w-full rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md"
								key={section.order_index}
							>
								<Paragraph section={section} />
							</div>
						)
					case 4:
						return (
							<div
								className="mb-4 w-full rounded-lg border border-white/10 bg-white/30 p-4 backdrop-blur-md"
								key={section.order_index}
							>
								<SyntaxHighlighter
									className="min-w-3/6 max-w-fit"
									language={section.language || 'text'}
									showLineNumbers
									style={nightOwl}
								>
									{section.code || ''}
								</SyntaxHighlighter>
							</div>
						)
					default:
						return null
				}
			})}
		</div>
	)
}

function Paragraph({ section }: { section: Section }) {
	if (section.section_type_id === 3) {
		return (
			<div className="w-full text-center md:text-left">
				{section.paragraph_title && (
					<h1 className="my-4 text-4xl">{section.paragraph_title}</h1>
				)}
				<p className="break-words indent-8">
					{renderTextWithLinks(section.text || '')}
				</p>
			</div>
		)
	}
	return null
}
