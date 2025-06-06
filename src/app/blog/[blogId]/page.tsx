import React from 'react';
import ContextController from '@/components/ui/context-controller/context-controller';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isBlogPublished } from '@/lib/db';

export default async function Page({
    params,
}: {
    params: Promise<{ blogId: number }>
}) {

    const { blogId } = await params;
    if (!await isBlogPublished(blogId)) redirect(`/`)

    return (
        <div className="flex flex-col justify-start min-h-screen items-center mt-8 gap-4 pb-20 font-[family-name:var(--font-geist-sans)]">
            <ContextController blogId={blogId} isAdmin={false} />
            <Link
                href="/"
                className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
            >Back Home</Link>
        </div>
    );
}

