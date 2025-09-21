import ContextController from "@/components/ui/context-controller/context-controller";
import { getAllBlogIds, getSections } from "@/lib/DAL/blogs-dal";
import { Suspense } from "react";
import { notFound } from "next/navigation";

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
    params: { blogId: string }
}) {
    const sections = await getSections(params.blogId);

    if (!sections || 'error' in sections || sections.length === 0) {
        notFound();
    }

    return (
        <Suspense fallback={<div>Loading sections...</div>}>
            <ContextController sections={sections} />
        </Suspense>
    );
}