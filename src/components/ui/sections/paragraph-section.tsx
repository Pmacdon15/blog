import { handleSubmit } from "@/lib/utils";
import { FormActionProps, Section } from "@/types/types";
import { Title } from "./edit-section-components/title";
import { UpdateButton } from "./update-button";

export function Paragraph({ section, formActionUpdate, formActionDelete, isPending }: { section: Section, isPending: boolean } & FormActionProps) {

    return (
        <form
            onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
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
            <UpdateButton actionString="Update Section" disabled={isPending} />
        </form>
    );
}
