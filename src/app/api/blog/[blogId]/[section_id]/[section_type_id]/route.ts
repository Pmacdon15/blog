import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schemaUpdateTitleSection = z.object({
    blog_id: z.number(),
    title: z.string(),
    publish_date: z.date(),   
});

const schemaUpdateParagraphSection = z.object({
    blog_id: z.number(),
    title: z.string(),
    text: z.string(),   
});

const schemaUpdateCodeSection = z.object({
    blog_id: z.number(),
    code: z.string(),   
});

type UpdateTitleSection = z.infer<typeof schemaUpdateTitleSection>;
type UpdateParagraphSection = z.infer<typeof schemaUpdateParagraphSection>;
type UpdateCodeSection = z.infer<typeof schemaUpdateCodeSection>;

export async function PUT(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 3]);
    const sectionTypeId = Number(pathSegments[pathSegments.length - 1]);
    const sectionId = Number(pathSegments[pathSegments.length - 2]);  
    
    const formData = await request.formData();

    let validatedFields;

    if (Number(sectionTypeId) === 1) {
        validatedFields = schemaUpdateTitleSection.safeParse({
            blog_id: blogId,
            title: formData.get('title'),
            publish_date: new Date(formData.get('publish_date') as string),  
        });
    } else if (sectionTypeId === 3) {
        validatedFields = schemaUpdateParagraphSection.safeParse({
            blog_id: blogId,
            title: formData.get('title'),
            text: formData.get('text'),
        });
    } else if (sectionTypeId === 4) {
        validatedFields = schemaUpdateCodeSection.safeParse({
            blog_id: blogId,
            code: formData.get('code'),
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
    } else if (sectionTypeId === 4) {
        const data = validatedFields.data as UpdateCodeSection;
        await sql`
            UPDATE CodeSection
            SET code = ${data.code || ""}
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