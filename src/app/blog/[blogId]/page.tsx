import React from 'react';
import BlogPage from '@/components/ui/blog-page/blog-page';

export default async function Page({
    params,
}: {
    params: Promise<{ blogId: number }>
}) {

    const { blogId } = await params;
 
    return (
        <div className="flex flex-col justify-center min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <BlogPage blogId={blogId} />
        </div>
    );
}

