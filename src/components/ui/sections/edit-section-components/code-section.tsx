import { Section } from "@/types/types";
import { UpdateButton } from "../../buttons/update-button";
import { Title } from "./title";

export function Code({ section, formAction, formActionDelete, isPending }: { section: Section, formAction: (formData: FormData) => void, formActionDelete: () => void, isPending: boolean }) {

    return (
        <form            
            className="flex flex-col w-full text-center md:text-left  gap-4 p-4 " >
            <Title formActionDelete={formActionDelete} />
            <input
                type='text'
                name='language'
                placeholder="Language"
                className="text-4xl rounded-sm p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
                defaultValue={section.language || ""}
                required
            />
            <textarea
                className="min-h-36 p-4 rounded-sm focus:border-2 focus:border-blue-500 focus:outline-none"
                name="code"
                defaultValue={section.code || ""}
                required
            />
            <UpdateButton formAction={formAction} actionString="Update Section" disabled={isPending} />
        </form>
    );
}