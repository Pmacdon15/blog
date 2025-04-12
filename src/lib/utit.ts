import { Section } from "@/types/types";

export const handleSubmit = (event: React.FormEvent<HTMLFormElement>, section: Section, formActionUpdate: (input: { formData: FormData; sectionId: number; sectionTypeId: number }) => void) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formActionUpdate({ formData, sectionId: section.id, sectionTypeId: section.section_type_id });
}