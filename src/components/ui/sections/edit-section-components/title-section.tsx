import {  Section } from "@/types/types";
import { Title } from "./title";
import { UpdateButton } from "../../buttons/update-button";

export function TitleSection({ section, formAction, formActionDelete, isPending }: { section: Section, formAction: (formData: FormData) => void, formActionDelete: (input: { sectionId: number; }) => void, isPending: boolean }) {
    return (
        <form
            className="flex flex-col gap-4  p-4 w-full border shadow-2xl rounded-sm  " >
            <Title section={section} formActionDelete={formActionDelete} />
            <input
                type='text'
                name='title'
                placeholder="Title"
                defaultValue={section.title_section_title || ""}
                className="text-5xl text-center border rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            />
            <input
                name='publish_date'
                type='date'
                defaultValue={section.publish_date ? new Date(section.publish_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}
                className="text-center md-start border rounded-sm w-full md:w-2/6 p-2 bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            />
            <UpdateButton formAction={formAction} actionString="Update Section" disabled={isPending} />
        </form >
    )
}