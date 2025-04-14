import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';
import { ResponseData } from '@/types/types';



export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  const published = url.searchParams.get('published') === 'true';

  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 3;

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const offset = (page - 1) * limit;
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
    WHERE 
      B.published = ${published}  
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    const countBlogs = await sql`
      SELECT COUNT(*) as count
      FROM Blog
      WHERE published = ${published}
    `

    const totalTrips = countBlogs[0]?.count || 0;
    const hasMore = totalTrips > page * limit;

    if (!result[0]) {
      return new Response(JSON.stringify({ message: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const responseData = { blogs: result, hasMore };
    return new Response(JSON.stringify(responseData as ResponseData), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(`Error: ${error}`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

