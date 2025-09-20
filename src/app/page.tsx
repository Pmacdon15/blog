import AddBlogForm from "@/components/ui/add-blog-form/add-blog-form";
import { DisplayBlogs } from "@/components/ui/display-blogs/display-blogs";
import { getBlogs } from "@/lib/blogs-dal";
import { Suspense } from "react";
import { LogoutButton } from "@/components/ui/buttons/logout-button";
import PageContainer from "@/components/ui/containters/page-container";

export default async function Home() {
  const blogsPromise = getBlogs();

  return (
    <>
      <Suspense fallback={<div className="text-2xl">Loading blogs...</div>}>
        <DisplayBlogs blogsPromise={blogsPromise} />
      </Suspense>
      <AddBlogForm />
      <LogoutButton />
    </>
  );
}
