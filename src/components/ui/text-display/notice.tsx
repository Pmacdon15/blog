export function NoticeDisplay({ children }: { children: React.ReactNode }) {
    return (
        <p className="flex flex-col justify-center items-center gap-4 p-4 w-full lg:w-4/6 sm:w-5/6"><>{children}</></p>
    )
}
