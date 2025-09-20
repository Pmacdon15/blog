import { Section } from "@/types/types";
import { Grip } from "lucide-react";

export function Title({ section, formActionDelete, attributes, listeners }: { section: Section; formActionDelete: () => void, attributes?: any, listeners?: any }) {
    const handleDelete = () => {
        formActionDelete();
    };

    return (
        <div className="flex justify-between w-full items-center">
            <div {...attributes} {...listeners} className="cursor-grab">
                <Grip />
            </div>
            <button
                className="ml-auto bg-red-400 w-8 rounded-lg shadow-lg  hover:bg-red-600 hover:scale-110 transition-transform duration-300"
                onClick={handleDelete}
            >
                X
            </button>
        </div>
    )
}
