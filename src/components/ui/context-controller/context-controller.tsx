'use client'
import { useGetSections } from "@/hooks/hooks";
import BlogComponent from "../blog-component/blog-component";
import EditBlogComponent from "../sections/edit-section-components/edit-blog-component/edit-blog-component"
import { useState } from "react";
import { Button } from "../buttons/button";
export default function ContextController({ blogId, isAdmin }: { blogId: number, isAdmin: boolean }) {

  const [editBlog, setEditBlog] = useState(true);
  const { data, isLoading, isError } = useGetSections(blogId);

  if (isLoading) return <p className="flex flex-col gap-4 p-4 justify-center items-center w-full  lg:w-4/6 sm:w-5/6">Loading...</p>;
  if (isError) return <p className="flex flex-col text-red-500 gap-4 p-4 justify-center items-center w-5/6 lg:w-4/6 sm:w-5/6">Error Blog</p>;

  return (
    <div className="flex flex-col justify-center w-full items-center">
      {isAdmin &&
        <Button onClick={() => setEditBlog(!editBlog)} text={`${editBlog ? 'Show Blog' : 'Edit Blog'}`} />
      }
      {editBlog && isAdmin && data ?
        <EditBlogComponent blogId={blogId} data={data} /> :
        <BlogComponent data={data} />
      }
      {isAdmin &&
        <button
          className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
          onClick={() => { setEditBlog(!editBlog) }}>{`${editBlog ? 'Show Blog' : 'Edit Blog'} `}</button>
      }
    </div>
  );
};

