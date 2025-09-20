import { isBlogPublished, togglePublishBlog } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 1]);

    try {
        if (await isBlogPublished(blogId)) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Blog is Published',
                    published: true,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Blog is not Published',
                    published: false,
                },
                { status: 200 }
            );
        }

    } catch (error) {
        return new Response(`Error: ${error}`, {
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}

export async function PUT(request: NextRequest) {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split('/');
    const blogId = Number(pathSegments[pathSegments.length - 1]);

    try {
        if (await togglePublishBlog(blogId)) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Blog is Published',
                    published: true,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Blog is not Published',
                    published: false,
                },
                { status: 200 }
            );
        }
    } catch (error) {
        return new Response(`Error: ${error}`, {
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}