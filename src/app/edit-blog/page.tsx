import ContextController from "@/components/ui/context-controller/context-controller";

export default function Page() {
    const blogId = 1;
    const userEmail = "pmacdonald15@gmail.com";
    return (
        <div className="flex flex-col justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <ContextController blogId={blogId} isAdmin={true} />
        </div>
    );
}
