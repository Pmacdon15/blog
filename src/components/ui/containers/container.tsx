export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-4/6 border-2 bg-white p-2">
			<div className="flex items-center gap-1 bg-muted-foreground p-8">
				{children}
			</div>
		</div>
	)
}
