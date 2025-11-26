'use client'

export default function CodeSection({
	isPending,
	isError,
}: {
	isPending: boolean
	isError: boolean
}) {
	return (
		<div className="flex w-full flex-col gap-4 rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-4 text-center md:text-left">
			<input
				className="rounded-sm border p-2 text-4xl"
				name="language"
				placeholder="Language"
				type="text"
			/>
			<textarea className="min-h-36 rounded-sm border p-4" name="code" />
			{isPending && <p>Loading...</p>}
			{isError && <p className="text-red-600">Error adding section </p>}
		</div>
	)
}
