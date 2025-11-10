import { neon } from '@neondatabase/serverless'
import { auth } from '@/auth'
import type { BlogData, ResponseData, Section } from '@/types/types'
export async function getBlogs({
	page = 1,
	limit = 10,
}: {
	page?: number
	limit?: number
}): Promise<ResponseData | { error: string }> {
	const session = await auth()
	const isAdmin =
		session?.user?.email === process.env.OWNERS_EMAIL &&
		process.env.OWNERS_EMAIL !== '' &&
		process.env.OWNERS_EMAIL !== undefined

	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const offset = (page - 1) * limit

		const query = `
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
            ${isAdmin ? '' : 'WHERE B.published = true'}
            ORDER BY B.published DESC, TS.publish_date DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `

		const countQuery = `
            SELECT COUNT(*) as count
            FROM Blog B
            ${isAdmin ? '' : 'WHERE B.published = true'}
        `

		const [result, countResult] = await Promise.all([
			sql.query(query),
			sql.query(countQuery),
		])

		const totalBlogs =
			Number((countResult as { count: string }[])[0]?.count) || 0
		const hasMore = totalBlogs > page * limit

		return { blogs: result as BlogData[], hasMore }
	} catch (error) {
		console.error('Error:', error)
		return { error: 'Failed to fetch blogs' }
	}
}

export async function getAllBlogIds(): Promise<
	{ blogId: string }[] | { error: string }
> {
	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const result = await sql`SELECT id FROM Blog WHERE published = true`

		return (result as { id: number }[]).map((blog) => ({
			blogId: String(blog.id),
		}))
	} catch (error) {
		console.error('Error fetching all blog IDs:', error)
		return { error: 'Failed to fetch all blog IDs' }
	}
}

export async function getSections(
	blogId: string,
): Promise<Section[] | { error: string }> {
  'use cache'
	try {
		const sql = neon(`${process.env.DATABASE_URL}`)

		// const sectionsQuery = `
    //         SELECT 
    //             S.id,
    //             S.blog_id,
    //             S.type as section_type_id,
    //             S.order_index,
    //             CASE S.type
    //                 WHEN 1 THEN 'title'
    //                 WHEN 2 THEN 'image'
    //                 WHEN 3 THEN 'paragraph'
    //                 WHEN 4 THEN 'code'
    //             END as section_type,
    //             TS.title as title_section_title,
    //             TS.publish_date,
    //             I.src,
    //             I.alt,
    //             I.width,
    //             P.title as paragraph_title,
    //             P.text,
    //             C.language,
    //             C.code,
    //             B.published
    //         FROM Section S
    //         LEFT JOIN TitleSection TS ON S.id = TS.id AND S.type = 1
    //         LEFT JOIN ImageSection I ON S.id = I.id AND S.type = 2
    //         LEFT JOIN ParagraphSection P ON S.id = P.id AND S.type = 3
    //         LEFT JOIN CodeSection C ON S.id = C.id AND S.type = 4
    //         JOIN Blog B ON S.blog_id = B.id
    //         WHERE S.blog_id = ${blogId}
    //         ORDER BY S.order_index ASC
    //     `
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
		return { error: 'Failed to fetch sections' }
	}
}
