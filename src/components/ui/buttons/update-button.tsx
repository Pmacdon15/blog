export function UpdateButton({ actionString, disabled }: { actionString: string, disabled: boolean }) {
    return (
        <button
            disabled={disabled}
            className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300">
            {actionString}
        </button>
    )
}