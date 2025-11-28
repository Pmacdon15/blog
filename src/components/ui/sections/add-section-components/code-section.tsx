'use client'

export default function CodeSection({
	isPending,
	isError,
}: {
	isPending: boolean
	isError: boolean
}) {
	return (
		<div className="flex w-full flex-col gap-4 rounded-sm border border-muted-foreground bg-white/60 p-4 text-center md:text-left">
			<input
				className="rounded-sm border p-2 text-4xl border-muted-foreground"
				name="language"
				placeholder="Language"
				type="text"
			/>
			<textarea className="min-h-36 rounded-sm border border-muted-foreground p-4" name="code" />
			{isPending && <p>Loading...</p>}
			{isError && <p className="text-red-600">Error adding section </p>}
		</div>
	)
}
