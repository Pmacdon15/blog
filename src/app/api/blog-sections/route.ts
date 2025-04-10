import { neon } from '@neondatabase/serverless';
import { NextRequest } from 'next/server';
import { Section } from '@/types/types';

export async function GET(request: NextRequest) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result1 = await sql`
      SELECT 
        s.id,
        s.blog_id,
        s.type AS section_type_id,
        CASE s.type
          WHEN 1 THEN 'title'
          WHEN 2 THEN 'image'
          WHEN 3 THEN 'paragraph'
          WHEN 4 THEN 'code'
        END AS section_type,
        ts.title AS title_section_title,
        ts.publish_date,
        ims.src,
        ims.alt,
        ims.width,
        ps.title AS paragraph_title,
        ps.text,
        cs.language,
        cs.code
      FROM "section" s
      LEFT JOIN "titlesection" ts ON s.id = ts.id AND s.type = 1
      LEFT JOIN "imagesection" ims ON s.id = ims.id AND s.type = 2
      LEFT JOIN "paragraphsection" ps ON s.id = ps.id AND s.type = 3
      LEFT JOIN "codesection" cs ON s.id = cs.id AND s.type = 4
      WHERE s.blog_id = 1
      ORDER BY s.id
    `;

    console.log('Result:', result1);

    return new Response(JSON.stringify(result1 as Section[]), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(`Error: ${error}`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}