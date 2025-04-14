'use client'
import { useGetBlogs } from "@/hooks/hooks";
import Link from "next/link";
import Image from "next/image";
import { BlogData } from "@/types/types";
import { useState } from "react";

export default function Home() {
  const isAdmin = true;

  return (
    <div className="flex flex-col gap-8 justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <DisplayBlogs published={true} title="Published Blogs" isAdmin={isAdmin} />
      {isAdmin && <DisplayBlogs published={false} title="Draft Blogs" isAdmin={isAdmin} />}
    </div>
  );
}

function DisplayBlogs({ published, title, isAdmin }: { published: boolean, title: string, isAdmin: boolean }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetBlogs(page, published)

  if (isLoading) return <p className="flex flex-col justify-center items-center gap-4 rounded-sm shadow-xl border p-4 w-full lg:w-4/6 sm:w-5/6">Loading...</p>;
  if (error) return <p className="flex flex-col justify-center items-center gap-4 rounded-sm shadow-xl border p-4 w-full lg:w-4/6 sm:w-5/6">Error: {error.message}</p>;
  if (!data || !data.blogs) return <p className="flex flex-col justify-center items-center gap-4 rounded-sm shadow-xl border p-4 w-full lg:w-4/6 sm:w-5/6">No blogs found</p>;

  return (
    <div className="flex flex-col justify-center items-center gap-4 rounded-sm shadow-xl border p-4 w-full lg:w-4/6 sm:w-5/6">
      <h2 className="text-2xl">{title}</h2>
      {data.blogs.map((blog: BlogData) => (
        <BlogCard key={blog.id} blog={blog} published={published} isAdmin={isAdmin} />
      ))}
      <PaginationButtons page={page} setPage={setPage} hasMoreBlogs={data.hasMore} />
    </div>
  )
}

function BlogCard({ blog, published, isAdmin }: { blog: BlogData, published: boolean, isAdmin: boolean }) {
  return (
    <>
      <Link
        className="flex flex-col bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]  rounded-sm shadow-xl gap-4 p-4 justify-center items-center w-full  lg:w-4/6 sm:w-5/6"
        href={`/${published ? 'blog' : 'edit-blog'}/${blog.id}`}>
        <h1 className="text-4xl">{blog.title}</h1>
        {blog.image_src &&
          <Image
            src={blog.image_src || ""}
            alt={"Blog Image"}
            width={800}
            height={800}
            className="object-contain w-36 h-auto"
          />
        }
        {published ? 'Go to This Blog' : 'Edit This Blog'}
      </Link>
      {isAdmin && published &&
        <Link href={`/edit-blog/${blog.id}`}>Edit This Blog</Link>
      }
    </>
  )
}

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasMoreBlogs: boolean | undefined;
}

function PaginationButtons({ page, setPage, hasMoreBlogs }: PaginationProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (hasMoreBlogs) {
            setPage((old) => old + 1)
          }
        }}
        disabled={!hasMoreBlogs}
      >
        Next
      </button>
    </div>
  )
}