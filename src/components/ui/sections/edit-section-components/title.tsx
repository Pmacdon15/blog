
export function Title({ formActionDelete }: { formActionDelete: () => void }) {
    return (
        <div className="flex justify-end w-full">
            <button
                className="ml-auto bg-red-400 w-8 rounded-lg shadow-lg  hover:bg-red-600 hover:scale-110 transition-transform duration-300"
                onClick={formActionDelete}
            >
                X
            </button>
        </div>
    )
}
