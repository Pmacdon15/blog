import { handleSubmit } from "@/lib/utils";
import { FormActionProps, Section } from "@/types/types";
import { Title } from "./section-components/title";
import { UpdateButton } from "./section-components/update-button";

export function TitleSection({ section, formActionUpdate, formActionDelete }: { section: Section } & FormActionProps) {
    return (
        <form
            onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
            className="flex flex-col gap-4 border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] " >
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
            <UpdateButton />
        </form >
    )
}