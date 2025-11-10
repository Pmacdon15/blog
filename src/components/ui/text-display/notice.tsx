export function NoticeDisplay({ children }: { children: React.ReactNode }) {
	return (
		<p className="flex w-full flex-col items-center justify-center gap-4 p-4 sm:w-5/6 lg:w-4/6">
			{children}
		</p>
	)
}
