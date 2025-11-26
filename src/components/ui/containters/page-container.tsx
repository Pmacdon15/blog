export default function PageContainer({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex h-screen min-h-screen w-full flex-col items-center justify-start gap-4 bg-[url('/background.jpg')] bg-center bg-cover p-2 pt-4 pb-10 font-[family-name:var(--font-geist-sans)]">
			{children}
		</div>
	)
}
