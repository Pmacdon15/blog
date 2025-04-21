import { logout } from "@/actions/auth";
import { auth } from "@/auth";
import AddBlogForm from "@/components/ui/add-blog-form/add-blog-form";
import { Button } from "@/components/ui/buttons/button";
import { LogoutButton } from "@/components/ui/buttons/logout-button";
import { DisplayBlogs } from "@/components/ui/display-blogs/display-blogs";

export default async function Home() {
  const session = await auth();
  const isAdmin = session?.user?.email === process.env.OWNERS_EMAIL && process.env.OWNERS_EMAIL !== "" && process.env.OWNERS_EMAIL !== undefined

  return (
    <div className="flex flex-col gap-8 justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <DisplayBlogs published={true} title="Published Blogs" isAdmin={isAdmin} />
      {isAdmin &&
        <>
          <DisplayBlogs published={false} title="Draft Blogs" isAdmin={isAdmin} />
          <AddBlogForm />
          <LogoutButton />
        </>
      }
    </div>
  );
}


