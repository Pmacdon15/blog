import { neon } from '@neondatabase/serverless'
import { cacheLife, cacheTag } from 'next/cache'
import type { BlogData, Section } from '@/types/types'

export async function getUnpublishedOrPublishedSectionsDb(
	blogId: string,
): Promise<Section[]> {
	'use cache'
	cacheTag(`sections-unpublished-published-${blogId}`)
	cacheLife('weeks')
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
}

export async function getUnpublishedBlogsDb(): Promise<BlogData[]> {
	'use cache'
	cacheTag(`blogs-unpublished`)
	cacheLife('weeks')

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
}
