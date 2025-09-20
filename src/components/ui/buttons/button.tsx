export function Button({ onClick, text, isPending }: { onClick: () => void, text: string, isPending?: boolean }) {
  return (
    <button
      className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? 'Saving...' : text}
    </button>
  );
}