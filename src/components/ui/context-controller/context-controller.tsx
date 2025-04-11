import BlogComponent from "../blog-component/blog-component";
import EditBlogComponent from "../edit-blog-component/edit-blog-component"
import { useState } from "react";
export default function ContectCooontroller({ userEmail, blogId }: { userEmail: string, blogId: number }) {
  const [editBlog, setEditBlog] = useState(true);
  return (
    <>
      <button
        className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
        onClick={() => { setEditBlog(!editBlog) }}>{`${editBlog ? 'Show Blog' : 'Edit Blog'} `}</button>
      {editBlog ?
        <EditBlogComponent userEmail={userEmail} blogId={blogId} /> :
        <BlogComponent userEmail={userEmail} blogId={blogId} />}
    </>


  );
};