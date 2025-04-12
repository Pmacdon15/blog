import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schemaUpdateTitleSection = z.object({
    blog_id: z.number(),
    title: z.string(),
    publish_date: z.date(),
    user_email: z.string().email(),
});

const schemaUpdateParagraphSection = z.object({
    blog_id: z.number(),
    title: z.string(),
    text: z.string(),
    user_email: z.string().email(),
});

type UpdateTitleSection = z.infer<typeof schemaUpdateTitleSection>;
type UpdateParagraphSection = z.infer<typeof schemaUpdateParagraphSection>;

export async function PUT(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 4]);
    const sectionTypeId = Number(pathSegments[pathSegments.length - 3]);
    const sectionId = Number(pathSegments[pathSegments.length - 2]);
    const userEmail = pathSegments[pathSegments.length - 1];

    const formData = await request.formData();

    let validatedFields;

    if (Number(sectionTypeId) === 1) {
        validatedFields = schemaUpdateTitleSection.safeParse({
            blog_id: blogId,
            title: formData.get('title'),
            publish_date: new Date(formData.get('publish_date') as string),
            user_email: userEmail,
        });
    } else if (sectionTypeId === 3) {
        validatedFields = schemaUpdateParagraphSection.safeParse({
            blog_id: blogId,
            title: formData.get('title'),
            text: formData.get('text'),
            user_email: userEmail,
        });
    } else {
        return NextResponse.json({ error: 'Unsupported section type' }, { status: 400 });
    }

    if (!validatedFields.success) {
        return NextResponse.json(
            {
                error: {
                    message: 'Validation failed' + JSON.stringify(validatedFields.error),
                    details: validatedFields.error.flatten().fieldErrors,
                },
            },
            { status: 400 }
        );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    if (sectionTypeId === 1) {
        const data = validatedFields.data as UpdateTitleSection;       
        await sql`
      UPDATE TitleSection
      SET title = ${data.title}, publish_date = ${data.publish_date}
      WHERE id = ${sectionId}
    `;
    } else if (sectionTypeId === 3) {
        const data = validatedFields.data as UpdateParagraphSection;
        await sql`
      UPDATE ParagraphSection
      SET title = ${data.title || ""}, text = ${data.text}
      WHERE id = ${sectionId}
    `;
    }
    return NextResponse.json(
        {
            success: true,
            message: 'Blog updated successfully',
        },
        { status: 200 }
    );
}