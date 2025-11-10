export function Button({
	onClick,
	text,
	isPending,
}: {
	onClick: () => void
	text: string
	isPending?: boolean
}) {
	return (
		<button
			className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
			disabled={isPending}
			onClick={onClick}
			type="button"
		>
			{isPending ? 'Saving...' : text}
		</button>
	)
}
