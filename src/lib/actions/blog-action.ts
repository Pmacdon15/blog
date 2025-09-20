'use server'
import { dealWithNewPhoto } from '../blobs';
import { schemaUpdateCodeSection, schemaUpdateParagraphSection, schemaUpdateImageSection, schemaUpdateTitleSection } from '@/zod/zod-schema';
import { togglePublishBlogDB, updateSectionDb } from "../db"
import { isAdmin } from "./auth"

export async function togglePublishBlog(blogId: number) {
    if (await isAdmin() === true) {
        await togglePublishBlogDB(blogId)
    }
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