import AddBlogForm from "@/components/ui/add-blog-form/add-blog-form";
import { DisplayBlogs } from "@/components/ui/display-blogs/display-blogs";
import { getBlogs } from "@/lib/blogs-dal";
import { Suspense } from "react";
import { LogoutButton } from "@/components/ui/buttons/logout-button";

export default async function Home() {
  const blogsPromise = getBlogs();

  return (
    <div className="flex flex-col gap-8 justify-start min-h-screen items-center mt-8 p-2 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<div className="text-2xl">Loading blogs...</div>}>
        <DisplayBlogs blogsPromise={blogsPromise} />
      </Suspense>
      <AddBlogForm />
      <LogoutButton />
    </div>
  );
}
