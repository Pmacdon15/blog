import { z } from 'zod'

export const schemaUpdateTitleSection = z.object({
	blog_id: z.number(),
	title: z.string(),
	publish_date: z.date(),
})

const imageMimeTypes = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/bmp',
	'image/svg+xml',
]
export const schemaUpdateImageSection = z.object({
	blog_id: z.number(),
	alt: z.string(),
	new_file: z
		.instanceof(File)
		.nullable()
		.optional()
		.transform((file) => (file?.size === 0 ? undefined : file)) // Transform empty file to undefined
		.refine(
			(file) =>
				!file ||
				(file instanceof File && imageMimeTypes.includes(file.type)),
			{
				message: 'Invalid image type',
			},
		),
	width: z.number(),
})

export const schemaUpdateParagraphSection = z.object({
	blog_id: z.number(),
	title: z.string(),
	text: z.string(),
})

export const schemaUpdateCodeSection = z.object({
	blog_id: z.number(),
	language: z.string(),
	code: z.string(),
})
