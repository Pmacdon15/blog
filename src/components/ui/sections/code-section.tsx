import { handleSubmit } from "@/lib/utit";
import { FormActionProps, Section } from "@/types/types";
import { UpdateButton } from "./section-components/update-button";
import { Title } from "./section-components/title";

export function Code({ section, formActionUpdate, formActionDelete }: { section: Section } & FormActionProps) {

    return (
        <form
            onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
            className="flex flex-col w-full text-center md:text-left  gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <Title section={section} formActionDelete={formActionDelete} />
            <textarea
                className="min-h-36 border p-4 rounded-sm "
                name="code"
                defaultValue={section.code || ""}
            />
            <UpdateButton />
        </form>
    );
}