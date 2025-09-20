import { addNewPhoto } from '@/lib/blobs';
import { addSection } from '@/lib/db';
import { schemaUpdateCodeSection, schemaUpdateImageSection, schemaUpdateParagraphSection, schemaUpdateTitleSection } from '@/zod/zod-schema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 1]);

    const formData = await request.formData();
    const sectionTypeName = formData.get('section-type') as string ?? '';
    
    let validatedFields;
    let newPhotoUrl;

    if (sectionTypeName === 'Title') {
        validatedFields = schemaUpdateTitleSection.safeParse({
            blog_id: blogId,
            title: formData.get('title'),
            publish_date: new Date(formData.get('publish_date') as string),
        });
    } else if (sectionTypeName === 'Image') {
        validatedFields = schemaUpdateImageSection.safeParse({
            blog_id: blogId,
            new_file: formData.get('new-file'),
            alt: formData.get('alt'),
            width: Number(formData.get("width"))
        });
        if (validatedFields.success && validatedFields.data.new_file) {
            newPhotoUrl = await addNewPhoto(validatedFields.data);
            // console.log(newPhotoUrl)
        }

    } else if (sectionTypeName === 'Paragraph') {
        validatedFields = schemaUpdateParagraphSection.safeParse({
            blog_id: blogId,
            title: formData.get('title'),
            text: formData.get('text'),
        });
    } else if (sectionTypeName === 'Code') {
        validatedFields = schemaUpdateCodeSection.safeParse({
            blog_id: blogId,
            language: formData.get('language'),
            code: formData.get('code'),
        });
    } else {
        return NextResponse.json({ error: 'Unsupported section type' }, { status: 400 });
    }


    if (!validatedFields?.success) {
        return NextResponse.json(
            {
                error: {
                    message: 'Validation failed' + JSON.stringify(validatedFields?.error),
                    details: validatedFields?.error.flatten().fieldErrors,
                },
            },
            { status: 400 }
        );
    }
    try {
        await addSection(sectionTypeName, validatedFields.data, newPhotoUrl?.url || "");
    } catch (error) {
        return new Response(`Error: ${error}`, {
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    return NextResponse.json(
        {
            success: true,
            message: 'Blog updated successfully',
        },
        { status: 200 }
    );
}

