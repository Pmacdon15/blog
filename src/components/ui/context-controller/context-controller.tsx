'use client'
import BlogComponent from "../blog-component/blog-component";
import EditBlogComponent from "../sections/edit-section-components/edit-blog-component/edit-blog-component"
import { useState, use } from "react";
import { Button } from "../buttons/button";
import { Section } from "@/types/types";
import { NoticeDisplay } from "../text-display/notice";
import { useIsAdmin } from "@/lib/hooks/hooks";
import BackHomeLink from "../links/back-home-link";


export default function ContextController({ sectionsPromise, defaultState = false }: { sectionsPromise: Promise<Section[] | { error: string }>, defaultState?: boolean }) {

  const [editBlog, setEditBlog] = useState(defaultState);
  const data = use(sectionsPromise);

  const { data: isAdmin } = useIsAdmin()

  if ('error' in data) return <NoticeDisplay>Error: {data.error}</NoticeDisplay>;

  if (!data) return <NoticeDisplay>Loading...</NoticeDisplay>;


  return (
    <>
      {isAdmin &&
        <Button onClick={() => setEditBlog(!editBlog)} text={`${editBlog ? 'Show Blog' : 'Edit Blog'}`} />
      }
      {editBlog && isAdmin ?
        <EditBlogComponent blogId={data[0].blog_id} data={data} /> :
        <BlogComponent data={data} />
      }
      {isAdmin &&
        <button
          className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
          onClick={() => { setEditBlog(!editBlog) }}>{`${editBlog ? 'Show Blog' : 'Edit Blog'} `}</button>
      }
      <BackHomeLink />
    </>
  );
};