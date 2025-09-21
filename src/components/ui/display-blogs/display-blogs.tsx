import Link from "next/link";
import Image from "next/image";
import { BlogData, ResponseData } from "@/types/types";
import { PaginationButtons } from "@/components/ui/pagination-buttons/pagination-buttons";
import { NoticeDisplay } from "../text-display/notice";

export async function DisplayBlogs({ blogsPromise }: { blogsPromise: Promise<ResponseData | { error: string }> }) {

    const result = await blogsPromise;

    if ('error' in result) return <NoticeDisplay>Error: {result.error}</NoticeDisplay>;

    const { blogs, hasMore } = result;

    if (!blogs || blogs.length === 0) return <NoticeDisplay>No blogs found</NoticeDisplay>;

    const publishedBlogs = blogs.filter(b => b.published);
    const unpublishedBlogs = blogs.filter(b => !b.published);

    return (
        <div className="flex flex-col justify-center items-center w-full">
            {publishedBlogs.length > 0 && (
                <div className="flex flex-col items-center w-full gap-4">
                    <h2 className="text-2xl">Published Blogs</h2>
                    <div className={`flex flex-wrap gap-4 w-full justify-center `}>
                        {publishedBlogs.map((blog: BlogData) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            )}
            {unpublishedBlogs.length > 0 && (
                <div className="flex flex-col items-center w-full gap-4">
                    <h2 className="text-2xl">Unpublished Drafts</h2>
                    <div className={`flex flex-wrap gap-4 w-full justify-center`}>
                        {unpublishedBlogs.map((blog: BlogData) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            )}
            <PaginationButtons page={1} path={"/"} hasMoreBlogs={hasMore} />
        </div>
    )
}

function BlogCard({ blog }: { blog: BlogData }) {
    return (
        <div className="flex flex-col bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] rounded-sm shadow-xl gap-4 justify-center items-center flex-grow flex-shrink-0 basis-80 max-w-sm" >
            <h1 className="text-2xl text-center p-2">{blog.title}</h1>
            {blog.image_src &&
                <Image
                    src={blog.image_src || ""}
                    alt={"Blog Image"}
                    width={800}
                    height={800}
                    className="object-contain w-36 h-auto"
                />
            }
            <Link href={`/${blog.published ? 'blog' : 'edit-blog'}/${blog.id}`} className="p-2">
                {blog.published ? 'View Blog' : 'Edit Draft'}
            </Link >
        </div>
    )
}
