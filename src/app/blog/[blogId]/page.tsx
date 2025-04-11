import React from 'react';
import BlogComponent from '@/components/ui/blog-component/blog-component';

export default async function Page({
    params,
}: {
    params: Promise<{ blogId: number }>
}) {

    const { blogId } = await params;
    const userEmail = "pmacdonald15@gmail.com"
 
    return (
        <div className="flex flex-col justify-center min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <BlogComponent userEmail={userEmail} blogId={blogId} />
        </div>
    );
}

