'use client';
import { useDeleteSection, useTogglePublishBlog, useUpdateSection } from "@/lib/mutations/mutations";
import { Section } from "@/types/types";
import { useState, ChangeEvent } from "react";
import { Code } from "../code-section";
import { TitleSection } from "../title-section";
import { Paragraph } from "../paragraph-section";
import { ImageSection } from "../image-section";
import { AddSectionForm } from "../../add-section-components/add-section-form/add-section-form";
import { useGetIsBlogPublished } from "@/lib/hooks/hooks";
import { Button } from "@/components/ui/buttons/button";

// Define the type for sectionState
type SectionState = {
    [key: number]: string | null | undefined;
};

export default function EditBlogComponent({ blogId, data }: { blogId: number, data: Section[] }) {

    const [sectionState, setSectionState] = useState<SectionState>({});

    const { data: dataIsPublished } = useGetIsBlogPublished(blogId);
    const { mutate: mutateTogglePublished } = useTogglePublishBlog(blogId);

    console.log("data", dataIsPublished);

    const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateSection(blogId);
    const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteSection(blogId);

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
        <div className="flex flex-col w-full lg:w-4/6 sm:w-5/6 gap-4 justify-start min-h-screen items-center mt-4 px-4 pb-4 font-[family-name:var(--font-geist-sans)]">
            {dataIsPublished &&
                <Button onClick={() => mutateTogglePublished({ blogId })} text={dataIsPublished.published ? 'Unpublish this Blog' : 'Publish This Blog'} />
            }
            {data?.map((section: Section) => {
                switch (section.section_type_id) {
                    case 1:
                        return <TitleSection key={section.id} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} isPending={isPendingUpdate || isPendingDelete} />;
                    case 2:
                        return (
                            <ImageSection
                                key={section.id}
                                section={section}
                                formActionUpdate={mutateUpdate}
                                formActionDelete={mutateDelete}
                                sectionState={sectionState}
                                handleImageChange={handleImageChange}
                                isPending={isPendingUpdate || isPendingDelete}
                            />
                        );
                    case 3:
                        return <Paragraph key={section.id} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} isPending={isPendingUpdate || isPendingDelete} />;
                    case 4:
                        return <Code key={section.id} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} isPending={isPendingUpdate || isPendingDelete} />;
                    default:
                        return null;
                }
            })}
            <AddSectionForm blogId={blogId} />
        </div>
    );
}

