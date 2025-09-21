export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 w-full justify-start min-h-screen items-center pt-4 p-2 pb-10 font-[family-name:var(--font-geist-sans)]">
            <>
                {children}
            </>
        </div>
    );
}