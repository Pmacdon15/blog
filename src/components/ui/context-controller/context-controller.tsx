'use client'
import { useGetSections } from "@/hooks/hooks";
import BlogComponent from "../blog-component/blog-component";
import EditBlogComponent from "../edit-blog-component/edit-blog-component"
import { useState } from "react";
export default function ContectCooontroller({ blogId, isAdmin }: { blogId: number, isAdmin: boolean }) {

  const [editBlog, setEditBlog] = useState(true);
  const { data } = useGetSections(blogId);

  return (
    <div className="flex flex-col gap-2 justify-center w-full  items-center">
      {isAdmin &&
        <button
          className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
          onClick={() => { setEditBlog(!editBlog) }}>{`${editBlog ? 'Show Blog' : 'Edit Blog'} `}</button>
      }
      {editBlog && isAdmin && data ?
        <EditBlogComponent blogId={blogId} data={data} /> :
        <BlogComponent data={data} />
      }
      {!isAdmin &&
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