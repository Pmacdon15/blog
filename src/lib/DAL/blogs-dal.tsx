import { neon } from '@neondatabase/serverless'
import { cacheLife, cacheTag } from 'next/cache'
import { RedirectType, redirect } from 'next/navigation'
import type { BlogData, Section } from '@/types/types'
import { isAdmin } from '../actions/auth'

export async function getBlogs(): Promise<BlogData[] | { error: string }> {
	'use cache'
	cacheTag('blogs')
	cacheLife('hours')
	try {
		const sql = neon(`${process.env.DATABASE_URL}`)

		const result = await sql`
		  SELECT
		    B.id,
		    B.published,
		    S.id AS section_id,
		    TS.title,
		    TS.publish_date,
		    (SELECT src FROM ImageSection WHERE id = (
		      SELECT id FROM Section WHERE blog_id = B.id AND type = 2 LIMIT 1
		    )) AS image_src
		  FROM
		    Blog B
		    LEFT JOIN Section S ON B.id = S.blog_id AND S.type = 1
		    LEFT JOIN TitleSection TS ON S.id = TS.id
		  WHERE B.published = ${true}
		  ORDER BY TS.publish_date DESC		  
		`
		// const result = await sql`
		//   SELECT
		//     B.id,
		//     B.published,
		//     S.id AS section_id,
		//     TS.title,
		//     TS.publish_date,
		//     (SELECT src FROM ImageSection WHERE id = (
		//       SELECT id FROM Section WHERE blog_id = B.id AND type = 2 LIMIT 1
		//     )) AS image_src
		//   FROM
		//     Blog B
		//     LEFT JOIN Section S ON B.id = S.blog_id AND S.type = 1
		//     LEFT JOIN TitleSection TS ON S.id = TS.id
		//   WHERE B.published = true
		//   ORDER BY TS.publish_date DESC
		//   LIMIT 1
		// `

		// const blogs = Array(10)
		// 	.fill(null)
		// 	.map((_, index) => ({
		// 		...result[0],
		// 		id: `${result[0].id}-${index}`,
		// 	})) as unknown as BlogData[]
		// return blogs as BlogData[]

		return result as BlogData[]
	} catch (error) {
		console.error('Error:', error)
		return { error: 'Failed to fetch blogs' }
	}
}

export async function getUnpublishedBlogs(): Promise<
	BlogData[] | { error: string }
> {
	'use cache: private'
	cacheTag('unpublished-blogs')
	;(await isAdmin()).isAdmin === false &&
		redirect('/blogs', RedirectType.push)

	try {
		const sql = neon(`${process.env.DATABASE_URL}`)

		const result = await sql`
		  SELECT
		    B.id,
		    B.published,
		    S.id AS section_id,
		    TS.title,
		    TS.publish_date,
		    (SELECT src FROM ImageSection WHERE id = (
		      SELECT id FROM Section WHERE blog_id = B.id AND type = 2 LIMIT 1
		    )) AS image_src
		  FROM
		    Blog B
		    LEFT JOIN Section S ON B.id = S.blog_id AND S.type = 1
		    LEFT JOIN TitleSection TS ON S.id = TS.id
		  WHERE B.published = ${false}
		  ORDER BY TS.publish_date DESC		  
		`

		return result as BlogData[]
	} catch (error) {
		console.error('Error:', error)
		return { error: 'Failed to fetch blogs' }
	}
}

// export async function getAllBlogIds(): Promise<
// 	{ blogId: string }[] | { error: string }
// > {
// 	try {
// 		const sql = neon(`${process.env.DATABASE_URL}`)
// 		const result = await sql`SELECT id FROM Blog`

// 		return (result as { id: number }[]).map((blog) => ({
// 			blogId: String(blog.id),
// 		}))
// 	} catch (error) {
// 		console.error('Error fetching all blog IDs:', error)
// 		return { error: 'Failed to fetch all blog IDs' }
// 	}
// }

export async function getSections(blogId: string): Promise<Section[]> {
	'use cache'
	cacheTag(`sections-${blogId}`)
	// cacheLife("days")
	await new Promise(resolve => setTimeout(resolve, 10000));
	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const result = await sql`
            SELECT 
				S.id,
				S.blog_id,
				S.type as section_type_id,
				S.order_index,
				CASE S.type
					WHEN 1 THEN 'title'
					WHEN 2 THEN 'image'
					WHEN 3 THEN 'paragraph'
					WHEN 4 THEN 'code'
				END as section_type,
				TS.title as title_section_title,
				TS.publish_date,
				I.src,
				I.alt,
				I.width,
				P.title as paragraph_title,
				P.text,
				C.language,
				C.code,
				B.published
			FROM Section S
			LEFT JOIN TitleSection TS ON S.id = TS.id AND S.type = 1
			LEFT JOIN ImageSection I ON S.id = I.id AND S.type = 2
			LEFT JOIN ParagraphSection P ON S.id = P.id AND S.type = 3
			LEFT JOIN CodeSection C ON S.id = C.id AND S.type = 4
			JOIN Blog B ON S.blog_id = B.id
			WHERE S.blog_id = ${blogId} AND B.published = true
			ORDER BY S.order_index ASC
        `
		return result as Section[]
	} catch (error) {
		console.error('Error:', error)
		throw new Error('Error fetching sections')
	}
}

export async function getUnpublishedOrPublishedSections(
	blogId: string,
): Promise<Section[]> {

	;(await isAdmin()).isAdmin === false &&
		redirect('/blogs', RedirectType.push)

	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const result = await sql`
            SELECT 
                S.id,
                S.blog_id,
                S.type as section_type_id,
                S.order_index,
                CASE S.type
                    WHEN 1 THEN 'title'
                    WHEN 2 THEN 'image'
                    WHEN 3 THEN 'paragraph'
                    WHEN 4 THEN 'code'
                END as section_type,
                TS.title as title_section_title,
                TS.publish_date,
                I.src,
                I.alt,
                I.width,
                P.title as paragraph_title,
                P.text,
                C.language,
                C.code,
                B.published
            FROM Section S
            LEFT JOIN TitleSection TS ON S.id = TS.id AND S.type = 1
            LEFT JOIN ImageSection I ON S.id = I.id AND S.type = 2
            LEFT JOIN ParagraphSection P ON S.id = P.id AND S.type = 3
            LEFT JOIN CodeSection C ON S.id = C.id AND S.type = 4
            JOIN Blog B ON S.blog_id = B.id
            WHERE S.blog_id = ${blogId}
            ORDER BY S.order_index ASC
        `
		return result as Section[]
	} catch (error) {
		console.error('Error:', error)
		throw new Error('Error fetching sections')
	}
}
