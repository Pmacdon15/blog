export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex w-full items-center gap-1 rounded-sm border bg-muted-foreground/30 p-8 shadow-2xl backdrop-blur-md md:w-5/6 lg:w-4/6">
			{children}
		</div>
	)
}
