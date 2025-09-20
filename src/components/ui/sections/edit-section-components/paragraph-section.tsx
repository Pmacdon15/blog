import {  Section } from "@/types/types";
import { Title } from "./title";
import { UpdateButton } from "../../buttons/update-button";

export function Paragraph({ section, formAction, formActionDelete, isPending }: { section: Section, formAction: (formData: FormData) => void, formActionDelete: (input: { sectionId: number; }) => void, isPending: boolean }) {

    return (
        <form
            className="flex flex-col w-full text-center md:text-left  gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <Title section={section} formActionDelete={formActionDelete} />
            <input
                type='text'
                name='title'
                placeholder="Title"
                defaultValue={section.paragraph_title || ""}
                className="text-4xl border rounded-sm p-2">
            </input>
            <textarea
                className="indent-8 min-h-36 border p-4 rounded-sm "
                name="text"
                defaultValue={section.text || ""}
            />
            <UpdateButton formAction={formAction} actionString="Update Section" disabled={isPending} />
        </form>
    );
}
