import { DisplayBlogs } from "@/components/ui/display-blogs-display-blogs";

export default function Home() {
  const isAdmin = true;

  return (
    <div className="flex flex-col gap-8 justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <DisplayBlogs published={true} title="Published Blogs" isAdmin={isAdmin} />
      {isAdmin && <DisplayBlogs published={false} title="Draft Blogs" isAdmin={isAdmin} />}
    </div>
  );
}


