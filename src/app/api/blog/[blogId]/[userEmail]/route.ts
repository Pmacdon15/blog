import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'

const schemaUpdateTitleSectionp = z.object({
    blog_id: z.number({
        invalid_type_error: 'Blog Id is required',
        required_error: 'Blog ID is required',
    }),
    title: z.string({
        invalid_type_error: 'Title is required',
        required_error: 'Title is required',
    }),
    publish_date: z.date({
        invalid_type_error: 'Publish date is required',
        required_error: 'Publish date is required',
    }),
    user_email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Invalid email address',
    })
})

export async function PUT(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 2]);
    const userEmail = pathSegments[pathSegments.length - 1];

    const formData = await request.formData();

    const validatedFields = schemaUpdateTitleSectionp.safeParse({
        user_email: userEmail,
        blog_id: blogId,
        title: formData.get("title"),
        publish_date: new Date(formData.get('publish_date') as string),
    });

    if (!validatedFields.success) {
        return NextResponse.json({
            error: {
                message: 'Validation failed',
                // details: validatedFields.error.flatten().fieldErrors,
            },
        }, {
            status: 400,
        });
    }

    // Update operation here
    const sql = neon(`${process.env.DATABASE_URL}`);
    await sql`
    UPDATE TitleSection
    SET title = ${validatedFields.data.title}, publish_date = ${validatedFields.data.publish_date}
    FROM Section
    WHERE TitleSection.id = Section.id AND Section.blog_id = ${validatedFields.data.blog_id} AND Section.type = 1
`;

    return NextResponse.json({
        success: true,
        message: 'Blog updated successfully',
    }, {
        status: 200,
    });
}