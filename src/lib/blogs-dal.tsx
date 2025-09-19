import { neon } from '@neondatabase/serverless';
import { ResponseData, BlogData } from '@/types/types';
import { auth } from '@/auth';

export async function getBlogs({ page = 1, limit = 10 }: { page?: number, limit?: number } = {}): Promise<ResponseData | { error: string }> {
    const session = await auth();
    const isAdmin = session?.user?.email === process.env.OWNERS_EMAIL && process.env.OWNERS_EMAIL !== "" && process.env.OWNERS_EMAIL !== undefined;

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const offset = (page - 1) * limit;
        
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
        `;

        const countQuery = `
            SELECT COUNT(*) as count
            FROM Blog B
            ${isAdmin ? '' : 'WHERE B.published = true'}
        `;

        const [result, countResult] = await Promise.all([
            sql.query(query),
            sql.query(countQuery)
        ]);

        const totalBlogs = Number((countResult as {count: string}[])[0]?.count) || 0;
        const hasMore = totalBlogs > (page * limit);

        return { blogs: result as BlogData[], hasMore };

    } catch (error) {
        console.error('Error:', error);
        return { error: 'Failed to fetch blogs' };
    }
}