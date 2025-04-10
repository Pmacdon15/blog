import { neon } from '@neondatabase/serverless';
import { Section} from '@/types/types';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {    
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        // const result1 = await sql`SELECT id, blog_id, type FROM Section WHERE blog_id = 1`;
        const result1 =  await sql `
        SELECT * FROM  TitleSection Where blog_id = 1;

        UNION 

        SELECT * FROM   ImageSection Where blog_id = 1;

        `
        return new Response(JSON.stringify(result1 as Section[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(`Error getting comments: ${error}`, { headers: { 'Content-Type': 'text/plain' } });
    }
}

