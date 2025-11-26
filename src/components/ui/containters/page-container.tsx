export default function PageContainer({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-start gap-8 overflow-hidden bg-[url('/background.jpg')] bg-center bg-cover bg-fixed p-2 pt-4 pb-0 font-[family-name:var(--font-geist-sans)] md:gap-16">
			{children}
		</div>
	)
}
