import { handleSubmit } from "@/lib/utils";
import { FormActionProps, Section } from "@/types/types";
import { UpdateButton } from "../../buttons/update-button";
import { Title } from "./title";

export function Code({ section, formActionUpdate, formActionDelete, isPending }: { section: Section, isPending: boolean } & FormActionProps) {

    return (
        <form
            onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
            className="flex flex-col w-full text-center md:text-left  gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <Title section={section} formActionDelete={formActionDelete} />
            <input
                type='text'
                name='language'
                placeholder="Language"
                className="text-4xl border rounded-sm p-2"
                defaultValue={section.language || ""}
                required
            />
            <textarea
                className="min-h-36 border p-4 rounded-sm "
                name="code"
                defaultValue={section.code || ""}
                required
            />
            <UpdateButton actionString="Update Section" disabled={isPending} />
        </form>
    );
}