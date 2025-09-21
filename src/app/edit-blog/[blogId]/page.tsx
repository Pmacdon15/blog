import ContextController from "@/components/ui/context-controller/context-controller";
import { getSections } from "@/lib/DAL/blogs-dal";
import { Suspense } from "react";
import { notFound } from 'next/navigation';

export default async function BlogPage(props: PageProps<'/edit-blog/[blogId]'>) {
    const sections = await getSections((await props.params).blogId);

    if (!sections || 'error' in sections || sections.length === 0) notFound();

    return (
        <Suspense fallback={<div>Loading sections...</div>}>
            <ContextController sections={sections} defaultState />
        </Suspense>
    );
}
