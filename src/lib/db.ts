import { schemaUpdateCodeSection, schemaUpdateParagraphSection, schemaUpdatePhotoSection, schemaUpdateTitleSection } from '@/zod/zod-schema';
import { neon } from '@neondatabase/serverless';
import { z } from 'zod';
import { deleteBlob } from './blobs';

const sql = neon(`${process.env.DATABASE_URL}`);

type UpdateTitleSection = z.infer<typeof schemaUpdateTitleSection>;
type UpdatePhotoSection = z.infer<typeof schemaUpdatePhotoSection>;
type UpdateParagraphSection = z.infer<typeof schemaUpdateParagraphSection>;
type UpdateCodeSection = z.infer<typeof schemaUpdateCodeSection>;

export async function updateSection(
    sectionTypeId: number,
    sectionId: number,
    data: UpdateTitleSection | UpdatePhotoSection | UpdateParagraphSection | UpdateCodeSection,
    newPhotoUrl?: string
) {
    try {
        if (sectionTypeId === 1) {
            const titleData = data as UpdateTitleSection; // Type assertion
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
            const paragraphData = data as UpdateParagraphSection; // Type assertion
            await sql`
                UPDATE ParagraphSection
                SET title = ${paragraphData.title || ""}, text = ${paragraphData.text}
                WHERE id = ${sectionId}
            `;
        } else if (sectionTypeId === 4) {
            const codeData = data as UpdateCodeSection; // Type assertion
            await sql`
                UPDATE CodeSection
                SET code = ${codeData.code || ""}
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