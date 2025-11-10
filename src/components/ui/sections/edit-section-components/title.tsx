export function Title({ formActionDelete }: { formActionDelete: () => void }) {
	return (
		<div className="flex w-full justify-end">
			<button
				className="ml-auto w-8 rounded-lg bg-red-400 shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-red-600"
				onClick={formActionDelete}
				type="button"
			>
				X
			</button>
		</div>
	)
}
