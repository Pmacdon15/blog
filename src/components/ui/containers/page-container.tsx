export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-8 justify-start min-h-screen items-center mt-8 p-2 pb-20 font-[family-name:var(--font-geist-sans)]">
            <>
                {children}
            </>
        </div>
    );
}