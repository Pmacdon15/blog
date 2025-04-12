import React from 'react';
import ContextController from '@/components/ui/context-controller/context-controller';

export default async function Page({
    params,
}: {
    params: Promise<{ blogId: number }>}) {

    const { blogId } = await params;    

    return (
        <div className="flex flex-col justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <ContextController blogId={blogId} isAdmin={false} />
        </div>
    );
}

