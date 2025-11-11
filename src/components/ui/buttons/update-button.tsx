export function UpdateButton({
	formAction,
	actionString,
	disabled,
}: {
	formAction?: (formData: FormData) => void
	actionString: string
	disabled: boolean
}) {
	return (
		<button
			className="mx-auto rounded-sm border bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] p-2 transition-transform duration-300 hover:scale-110 hover:bg-black"
			disabled={disabled}
			formAction={formAction}
			type="submit"
		>
			{actionString}
		</button>
	)
}
