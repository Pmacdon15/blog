import { schemaUpdatePhotoSection } from "@/zod/zod-schema";
import { z } from "zod";
import { put } from "@vercel/blob";

export async function dealWithNewPhoto(validatedFields: z.infer<typeof schemaUpdatePhotoSection> | null | undefined) {
    const file = validatedFields?.new_file as File;
    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
    });
    return blob;
}


