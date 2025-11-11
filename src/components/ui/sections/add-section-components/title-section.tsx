export function TitleSection({	
	isPending,
	isError,
}: {	
	isPending: boolean
	isError: boolean
}) {
	return (
		<div className="flex w-full flex-col gap-4 rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-4">
			<input
				className="rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] text-center text-5xl"
				name="title"
				placeholder="Title"
				type="text"
			/>

			{isPending && <p>Loading...</p>}
			{isError && <p className="text-red-600">Error adding section </p>}
		</div>
	)
}
