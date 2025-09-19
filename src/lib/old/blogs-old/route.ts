// import { fetchBlogs } from '@/lib/blogs-dal';
// import { NextRequest, NextResponse } from 'next/server';
// import { neon } from '@neondatabase/serverless';

// export async function GET(request: NextRequest) {
//   const url = request.nextUrl;
//   const published = url.searchParams.get('published') === 'true';
//   const page = Number(url.searchParams.get('page')) || 1;
//   const limit = Number(url.searchParams.get('limit')) || 3;

//   try {
//     const data = await fetchBlogs({ published, page, limit });
//     if ('error' in data) {
//         return NextResponse.json({ error: data.error }, { status: 500 });
//     }
//     return NextResponse.json(data);
//   } catch (error) {
//     const message = error instanceof Error ? error.message : 'An unknown error occurred';
//     return NextResponse.json({ error: message }, { status: 401 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.formData();
//     const title = body.get('title');

//     // Do something with the title
//     console.log(title);
//     const sql = neon(`${process.env.DATABASE_URL}`);

//     await sql`
//     WITH new_blog AS (
//     INSERT INTO Blog (published)
//     VALUES (false)
//     RETURNING id
//   ),
//   new_section AS (
//     INSERT INTO Section (blog_id, type)
//     SELECT id, 1 FROM new_blog
//     RETURNING id
//   )
//   INSERT INTO TitleSection (id, title, publish_date)
//   SELECT id, ${title}, CURRENT_DATE
//   FROM new_section;
//   `;
//     return new Response(JSON.stringify({ message: 'Title received' }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error:', error);
//     return new Response(`Error: ${error}`, {
//       headers: { 'Content-Type': 'text/plain' },
//     });
//   }
// }
