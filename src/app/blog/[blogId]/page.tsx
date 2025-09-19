import { getSections } from "@/lib/blogs-dal";
import ContextController from "@/components/ui/context-controller/context-controller";
import { Suspense } from "react";

export default async function BlogPage({
    params,
}: {
    params: Promise<{ blogId: string }>
}) {
    const { blogId } = await params;
    const sectionsPromise = getSections(blogId);

    return (
        <Suspense fallback={<div>Loading sections...</div>}>
            <ContextController sectionsPromise={sectionsPromise} />
        </Suspense>

    );
}