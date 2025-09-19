import PageContainer from "@/components/ui/containers/page-container";
import ContextController from "@/components/ui/context-controller/context-controller";
import { getSections } from "@/lib/blogs-dal";
import { Suspense } from "react";

export default async function BlogPage({
    params,
}: {
    params: Promise<{ blogId: string }>
}) {
    const { blogId } = await params;
    const sectionsPromise = getSections(blogId);

    return (
        <PageContainer>
            <Suspense fallback={<div>Loading sections...</div>}>
                <ContextController sectionsPromise={sectionsPromise} defaultState />
            </Suspense>           
        </PageContainer>
    );
}
