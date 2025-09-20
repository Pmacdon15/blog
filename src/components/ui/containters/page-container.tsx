export default function PageContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-8 justify-center md:justify-start min-h-screen items-center mt-8 p-2 pb-10 font-[family-name:var(--font-geist-sans)]">
            <>
                {children}
            </>
        </div>
    );
}