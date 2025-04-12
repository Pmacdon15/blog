'use client';
import { useDeleteSection, useUpdateSection } from "@/mutations/mutations";
import { Section } from "@/types/types";
import { useState, ChangeEvent } from "react";
import { Code } from "../sections/code-section";
import { TitleSection } from "../sections/title-section";
import { Paragraph } from "../sections/paragraph-section";
import { PhotoSection } from "../sections/photo-section";

// Define the type for sectionState
type SectionState = {
    [key: number]: string | null | undefined;
};

export default function EditBlogComponent({ blogId, data }: { blogId: number, data: Section[] }) {
    // Use the defined SectionState type for sectionState
    const [sectionState, setSectionState] = useState<SectionState>({});

    const { mutate: mutateUpdate } = useUpdateSection(blogId);
    const { mutate: mutateDelete } = useDeleteSection(blogId);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>, sectionId: number) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSectionState(prevState => ({
                    ...prevState,
                    [sectionId]: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setSectionState(prevState => ({
                ...prevState,
                [sectionId]: null,
            }));
        }
    };

    return (
        <div className="flex flex-col w-full md:w-4/6 gap-8 justify-start min-h-screen items-center mt-8 pb-4 font-[family-name:var(--font-geist-sans)]">
            {data?.map((section: Section) => {
                switch (section.section_type_id) {
                    case 1:
                        return <TitleSection key={section.id} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} />;
                    case 2:
                        return (
                            <PhotoSection
                                key={section.id}
                                section={section}
                                formActionUpdate={mutateUpdate}
                                formActionDelete={mutateDelete}
                                sectionState={sectionState}
                                handleImageChange={handleImageChange}
                            />
                        );
                    case 3:
                        return <Paragraph key={section.id} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} />;
                    case 4:
                        return <Code key={section.id} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}


