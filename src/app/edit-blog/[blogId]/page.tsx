import PageContainer from "@/components/ui/containers/page-container";
import ContextController from "@/components/ui/context-controller/context-controller";
import { getSections } from "@/lib/blogs-dal";
import Link from "next/link";
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
            <Link
                href="/"
                className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
            >Back Home
            </Link>
        </PageContainer>
    );
}
