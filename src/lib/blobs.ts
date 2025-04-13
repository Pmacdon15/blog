import { schemaUpdatePhotoSection } from "@/zod/zod-schema";
import { z } from "zod";
import { put, del } from "@vercel/blob";

export async function dealWithNewPhoto(validatedFields: z.infer<typeof schemaUpdatePhotoSection> | null | undefined) {
    const file = validatedFields?.new_file as File;
    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
    });
    return blob;
}

export async function deleteBlob(blobUrl: string) {
    await del(blobUrl);
}
