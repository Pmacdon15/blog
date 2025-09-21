import { schemaUpdateImageSection } from "@/zod/zod-schema";
import { z } from "zod";
import { put, del } from "@vercel/blob";

export async function dealWithNewPhoto(validatedFields: z.infer<typeof schemaUpdateImageSection> | null | undefined) {
    const file = validatedFields?.new_file as File;
    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
    });
    return blob;
}
export async function addNewPhoto(validatedFields: z.infer<typeof schemaUpdateImageSection> | null | undefined) {
    const file = validatedFields?.new_file as File;
    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
    });
    return blob;
}

export async function deleteBlob(blobUrl: string) {
    try {
        await del(blobUrl);
    } catch (error) {
        console.error(`Failed to delete blob: ${blobUrl}`, error);
    }
}

export async function deleteBlobs(urls: string[]) {
    try {
        await del(urls);
    } catch (error) {
        console.error('Failed to delete blobs', error);
    }
}
