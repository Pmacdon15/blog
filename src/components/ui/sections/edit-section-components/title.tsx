import { Section } from "@/types/types";

export function Title({ section, formActionDelete }: { section: Section; formActionDelete: () => void }) {
    const handleDelete = () => {
        formActionDelete();
    };

    return (
        <div className="flex justify-between w-full">
            <h1 className="text-xl">{section.section_type.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</h1>
            <button
                className="ml-auto bg-red-400 w-8 rounded-lg shadow-lg  hover:bg-red-600 hover:scale-110 transition-transform duration-300"
                onClick={handleDelete}
            >
                X
            </button>
        </div>
    )
}
