import { schemaUpdateCodeSection, schemaUpdateParagraphSection, schemaUpdatePhotoSection, schemaUpdateTitleSection } from '@/zod/zod-schema';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { deleteBlob } from './blobs';

const sql = neon(`${process.env.DATABASE_URL}`);

type UpdateTitleSection = z.infer<typeof schemaUpdateTitleSection>;
type UpdatePhotoSection = z.infer<typeof schemaUpdatePhotoSection>;
type UpdateParagraphSection = z.infer<typeof schemaUpdateParagraphSection>;
type UpdateCodeSection = z.infer<typeof schemaUpdateCodeSection>;

export async function addSection(
    sectionTypeName: string,
    data: UpdateTitleSection | UpdatePhotoSection | UpdateParagraphSection | UpdateCodeSection,
    newPhotoUrl?: string
) {
    try {
        if (sectionTypeName === 'Title') {
            const titleData = data as UpdateTitleSection;
            await sql`
                WITH new_section AS (
                INSERT INTO Section (blog_id, type)
                VALUES (${titleData.blog_id}, 1)
                RETURNING id
                )
                INSERT INTO TitleSection (id, title, publish_date)
                SELECT id, ${titleData.title}, ${titleData.publish_date}
                FROM new_section;
            `;
        } else if (sectionTypeName === 'Paragraph') {
            const paragraphData = data as UpdateParagraphSection;
            await sql`
                WITH new_section AS (
                INSERT INTO Section (blog_id, type)
                VALUES (${paragraphData.blog_id}, 3)
                RETURNING id
                )
                INSERT INTO ParagraphSection (id, title, text)
                SELECT id, ${paragraphData.title}, ${paragraphData.text}
                FROM new_section;
            `;
        } else if (sectionTypeName === 'Code') {
            const codeData = data as UpdateCodeSection;
            await sql`
                WITH new_section AS (
                INSERT INTO Section (blog_id, type)
                VALUES (${codeData.blog_id}, 4)
                RETURNING id
                )
                INSERT INTO CodeSection (id, language, code)
                SELECT id, ${codeData.language}, ${codeData.code}
                FROM new_section;
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function updateSection(
    sectionTypeId: number,
    sectionId: number,
    data: UpdateTitleSection | UpdatePhotoSection | UpdateParagraphSection | UpdateCodeSection,
    newPhotoUrl?: string
) {
    try {
        if (sectionTypeId === 1) {
            const titleData = data as UpdateTitleSection;
            await sql`
                UPDATE TitleSection
                SET title = ${titleData.title}, publish_date = ${titleData.publish_date}
                WHERE id = ${sectionId}
            `;
        } else if (sectionTypeId === 2) {
            const photoData = data as UpdatePhotoSection;
            if (newPhotoUrl !== "") {
                const result = await sql`
                SELECT src FROM ImageSection WHERE id = ${sectionId}
            `;
                await deleteBlob(result[0].src)
                await sql`
                    UPDATE ImageSection
                    SET src = ${newPhotoUrl}, alt = ${photoData.alt}, width = ${photoData.width}
                    WHERE id = ${sectionId}
                `;
            } else {
                await sql`
                    UPDATE ImageSection
                    SET alt = ${photoData.alt}, width = ${photoData.width}
                    WHERE id = ${sectionId}
                `;
            }
        } else if (sectionTypeId === 3) {
            const paragraphData = data as UpdateParagraphSection;
            await sql`
                UPDATE ParagraphSection
                SET title = ${paragraphData.title || ""}, text = ${paragraphData.text}
                WHERE id = ${sectionId}
            `;
        } else if (sectionTypeId === 4) {
            const codeData = data as UpdateCodeSection;
            await sql`
                UPDATE CodeSection
                SET code = ${codeData.code || ""}, language = ${codeData.language}
                WHERE id = ${sectionId}
            `;
        } else {
            throw new Error('Unsupported section type');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}