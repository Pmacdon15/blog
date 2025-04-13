'use client'
import { useGetBlogs } from "@/hooks/hooks";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const { data } = useGetBlogs(1, true)

  console.log('Data:', data)
  return (
    <div className="flex flex-col gap-8 justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">

      {data && data.length > 0 ? (
        data.map((blog) => (
          <div
            className="flex flex-col border rounded-sm gap-4 p-4 justify-center items-center w-full  lg:w-4/6 sm:w-5/6"
            key={blog.id}>
            <h1
              className="text-4xl"
              key={blog.id}>
              {blog.title}
            </h1>
            {blog.image_src &&
              <Image
                src={blog.image_src || ""}
                alt={"Blog Image"}
                width={800}
                height={800}
                className="object-contain w-36 h-auto"
              />
            }
            <Link href={`/blog/${blog.id}`}>Go to This Blog</Link>
          </div>
        ))
      ) : (
        <p>No data</p>
      )}

    </div>
  );
}