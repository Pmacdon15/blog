import AddBlogForm from "@/components/ui/add-blog-form/add-blog-form";
import { DisplayBlogs } from "@/components/ui/display-blogs/display-blogs";
import { getBlogs } from "@/lib/blogs-dal";
import { Suspense } from "react";
import { LogoutButton } from "@/components/ui/buttons/logout-button";
import PageContainer from "@/components/ui/containers/page-container";

export default function Loading() {
  const blogsPromise = getBlogs();

  return (
    <PageContainer>
      <AddBlogForm />
      <LogoutButton />
    </PageContainer>
  );
}
