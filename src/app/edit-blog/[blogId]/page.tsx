import ContextController from "@/components/ui/context-controller/context-controller";
import {  getAllBlogIds, getSections } from "@/lib/DAL/blogs-dal";
import { Suspense } from "react";

export async function generateStaticParams() {
    const blogIds = await getAllBlogIds();
    if ('error' in blogIds) {
        console.error("Error generating static params:", blogIds.error);
        return [];
    }
    return blogIds;
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ blogId: string }>
}) {
    const { blogId } = await params;
    const sectionsPromise = getSections(blogId);

    return (
        <Suspense fallback={<div>Loading sections...</div>}>
            <ContextController sectionsPromise={sectionsPromise} defaultState />
        </Suspense>
    );
}
