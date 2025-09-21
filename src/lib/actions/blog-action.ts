'use server'
import { dealWithNewPhoto, deleteBlob, deleteBlobs } from '../blobs';
import { schemaUpdateCodeSection, schemaUpdateParagraphSection, schemaUpdateImageSection, schemaUpdateTitleSection } from '@/zod/zod-schema';
import { addSection as addSectionDB, togglePublishBlogDB, updateSectionDb } from "../db"
import { isAdmin } from "./auth"
import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

export async function togglePublishBlog(blogId: number) {
    if (await isAdmin() === true) {
        await togglePublishBlogDB(blogId)
    }
}

export async function createBlog(formData: FormData) {
    if (await isAdmin() !== true) {
        throw new Error('Unauthorized');
    }
    const title = formData.get('title');
    const sql = neon(`${process.env.DATABASE_URL}`);

    await sql`
    WITH new_blog AS (
    INSERT INTO Blog (published)
    VALUES (false)
    RETURNING id
  ),
  new_section AS (
    INSERT INTO Section (blog_id, type)
    SELECT id, 1 FROM new_blog
    RETURNING id
  )
  INSERT INTO TitleSection (id, title, publish_date)
  SELECT id, ${title}, CURRENT_DATE
  FROM new_section;
  `;
}

export async function addSection(blogId: number, formData: FormData) {
    if (await isAdmin() !== true) {
        throw new Error('Unauthorized');
    }
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
        const file = formData.get('new-file') as File;
        validatedFields = schemaUpdateImageSection.safeParse({
            blog_id: blogId,
            new_file: file.size > 0 ? file : undefined,
            alt: formData.get('alt'),
            width: Number(formData.get("width"))
        });
        if (validatedFields.success && validatedFields.data.new_file) {
            const blob = await dealWithNewPhoto(validatedFields.data);
            newPhotoUrl = blob.url;
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
        return { error: 'Unsupported section type' };
    }


    if (!validatedFields?.success) {
        return {
            error: {
                message: 'Validation failed',
                details: validatedFields?.error.flatten().fieldErrors,
            },
        };
    }
    try {
        await addSectionDB(sectionTypeName, validatedFields.data, newPhotoUrl || "");
    } catch (error) {
        return { error: `Error: ${error}` };
    }

    return {
        success: true,
        message: 'Blog updated successfully',
    };
}

export async function updateSection(blogId: number, sectionTypeId: number, sectionId: number, formData: FormData) {
    if (await isAdmin() !== true) {
        throw new Error('Unauthorized');
    }

    const data = Object.fromEntries(formData.entries());

    switch (sectionTypeId) {
        case 1: {
            const validatedData = schemaUpdateTitleSection.parse({
                blog_id: blogId,
                title: data.title,
                publish_date: new Date(data.publish_date as string),
            });
            await updateSectionDb(validatedData, sectionTypeId, sectionId);
            break;
        }
        case 2: {
            const file = formData.get('new-file') as File;
            let newPhotoUrl = '';

            const validatedData = schemaUpdateImageSection.parse({
                blog_id: blogId,
                alt: data.alt,
                width: Number(data.width),
                new_file: file.size > 0 ? file : undefined
            });

            if (validatedData.new_file) {
                const blob = await dealWithNewPhoto(validatedData);
                newPhotoUrl = blob.url;
            }

            await updateSectionDb(validatedData, sectionTypeId, sectionId, newPhotoUrl);
            break;
        }
        case 3: {
            const validatedData = schemaUpdateParagraphSection.parse({
                blog_id: blogId,
                title: data.title,
                text: data.text,
            });
            await updateSectionDb(validatedData, sectionTypeId, sectionId);
            break;
        }
        case 4: {
            const validatedData = schemaUpdateCodeSection.parse({
                blog_id: blogId,
                language: data.language,
                code: data.code,
            });
            await updateSectionDb(validatedData, sectionTypeId, sectionId);
            break;
        }
        default:
            throw new Error('Invalid section type');
    }
}

export async function deleteBlogSection(blogId: number, sectionId: number, sectionTypeId: number) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    let srcToDelete: string | null = null;

    if (sectionTypeId === 2) {
        const result = await sql`SELECT src FROM ImageSection WHERE id = ${sectionId}`;
        if (result.length > 0 && result[0].src) {
            const url = result[0].src;
            if (url.includes('blob.vercel-storage.com')) {
                srcToDelete = url;
            }
        }
    }

    await sql`
       DELETE FROM Section
       WHERE blog_id = ${blogId} AND id = ${sectionId};
    `;

    if (srcToDelete) {
        await deleteBlob(srcToDelete);
    }
}

export async function deleteBlog(blogId: number) {
    if (await isAdmin() !== true) {
        throw new Error('Unauthorized');
    }
    const sql = neon(`${process.env.DATABASE_URL}`);

    const imageSections = await sql`
        SELECT s.id, ims.src
        FROM Section s
        JOIN ImageSection ims ON s.id = ims.id
        WHERE s.blog_id = ${blogId};
    `;

    if (imageSections.length > 0) {
        const blobUrls = imageSections
            .map(img => img.src)
            .filter((src): src is string => !!src && src.includes('blob.vercel-storage.com'));

        if (blobUrls.length > 0) {
            await deleteBlobs(blobUrls);
        }
    }

    await sql`DELETE FROM Blog WHERE id = ${blogId}`;

    revalidatePath('/');
    revalidatePath('/blog');
    revalidatePath('/edit-blog');
}

export async function updateBlogOrder({ blogId, newOrder }: { blogId: number, newOrder: { id: number, order_index: number }[] }) {
    if (await isAdmin() !== true) {
        throw new Error('Unauthorized');
    }
    const sql = neon(`${process.env.DATABASE_URL}`);

    try {
        const queries = newOrder.map(section => sql`
            UPDATE Section
            SET order_index = ${section.order_index}
            WHERE id = ${section.id} AND blog_id = ${blogId};
        `);
        await sql.transaction(queries);
    } catch (error) {
        console.error('Failed to update blog order:', error);
        throw new Error('Failed to update blog order');
    }
}
