import { Section } from "@/types/types";
import { Title } from "./title";
import { UpdateButton } from "../../buttons/update-button";

export function TitleSection({ section, formAction, formActionDelete, isPending, attributes, listeners }: { section: Section, formAction: (formData: FormData) => void, formActionDelete: () => void, isPending: boolean, attributes?: any, listeners?: any }) {
    return (
        <form
            className="flex flex-col gap-4  p-4 w-full " >
            <Title section={section} formActionDelete={formActionDelete} attributes={attributes} listeners={listeners} />
            <input
                type='text'
                name='title'
                placeholder="Title"
                defaultValue={section.title_section_title || ""}
                className="text-5xl text-center rounded-sm focus:border-2 focus:border-blue-500 focus:outline-none"
            />

            <input
                name='publish_date'
                type='date'
                defaultValue={section.publish_date ? new Date(section.publish_date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}
                className="text-center md-start rounded-sm w-full md:w-2/6 p-2 focus:border-2 focus:border-blue-500 focus:outline-none"
            />
            <UpdateButton formAction={formAction} actionString="Update Section" disabled={isPending} />
        </form >
    )
}