export default function ParagraphSection({
	isPending,
	isError,
}: {
	isPending: boolean
	isError: boolean
}) {
	return (
		<div className="flex w-full flex-col gap-4 rounded-sm border border-muted-foreground bg-white/60 p-4 text-center md:text-left">
			<input
				className="rounded-sm border border-muted-foreground p-2 text-4xl"
				name="paragraph_title"
				placeholder="Title"
				type="text"
			/>
			<textarea
				className="min-h-36 rounded-sm border border-muted-foreground p-4 indent-8"
				name="text"
			/>
			{isPending && <p>Loading...</p>}
			{isError && <p className="text-red-600">Error adding section </p>}
		</div>
	)
}
