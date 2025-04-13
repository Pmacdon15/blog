import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { deleteBlob } from "@/lib/blobs";

export async function DELETE(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 2]);
    const sectionId = Number(pathSegments[pathSegments.length - 1]);

    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`
       DELETE FROM Section
       WHERE blog_id = ${blogId} AND id = ${sectionId};
        `;
    if (sectionId === 2) {
        const result = await sql`SELECT src FROM ImageSection WHERE id = ${sectionId}
        `;
        await deleteBlob(result[0].src)
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Section delete successfully',
        },
        { status: 200 }
    );
}