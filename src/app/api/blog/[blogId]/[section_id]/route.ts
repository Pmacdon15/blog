import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function DELETE(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 2]);
    const sectionId = Number(pathSegments[pathSegments.length - 1]);
    console.log("Blog Id: ", blogId, "SectionId: ", sectionId)

    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`
       DELETE FROM Section
       WHERE blog_id = ${blogId} AND id = ${sectionId};
        `;


    return NextResponse.json(
        {
            success: true,
            message: 'Section delete successfully',
        },
        { status: 200 }
    );
}