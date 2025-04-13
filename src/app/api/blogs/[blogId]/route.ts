import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';
import { BlogData } from '@/types/types';

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const pathSegments = url.pathname.split('/');
  const blogId = pathSegments[pathSegments.length - 1];
  const published = Boolean(url.searchParams.get('published')) || false;

  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
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
  B.published = ${published};
    `;

    if (!result[0]) {
      return new Response(JSON.stringify({ message: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(result as BlogData[]), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error:', error);
    return new Response(`Error: ${error}`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

