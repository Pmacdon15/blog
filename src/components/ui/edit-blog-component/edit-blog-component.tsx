'use client';
import { useDeleteSection, useUpdateSection } from "@/mutations/mutations";
import { Section, FormActionProps, FormActionInputDelete } from "@/types/types";
import { Key, useState, ChangeEvent } from "react";
import Image from 'next/image';

// Define the type for sectionState
type SectionState = {
    [key: number]: string | null | undefined;
};

export default function EditBlogComponent({ blogId, data }: { blogId: number, data: Section[] }) {
    // Use the defined SectionState type for sectionState
    const [sectionState, setSectionState] = useState<SectionState>({});

    const { mutate: mutateUpdate } = useUpdateSection(blogId);
    const { mutate: mutateDelete } = useDeleteSection(blogId);

    console.log(data)

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
            {data?.map((section: Section, index: Key | null | undefined) => {
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
                                sectionState={sectionState} // Pass sectionState
                                handleImageChange={handleImageChange} // Pass handleImageChange
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

const handleSubmit = (event: React.FormEvent<HTMLFormElement>, section: Section, formActionUpdate: (input: { formData: FormData; sectionId: number; sectionTypeId: number }) => void) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formActionUpdate({ formData, sectionId: section.id, sectionTypeId: section.section_type_id });
}

function UpdateButton() {
    return (
        <button className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300">
            Update Section
        </button>
    )
}

function Title({ section, formActionDelete }: { section: Section; formActionDelete: (input: FormActionInputDelete) => void }) {
    const handleDelete = () => {
        formActionDelete({ sectionId: section.id });
    };

    return (
        <div className="flex justify-between w-full">
            <h1 className="text-xl">{section.section_type.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}</h1>
            <button
                className="ml-auto bg-red-400 w-8 rounded-lg shadow-lg  hover:bg-red-600 hover:scale-110 transition-transform duration-300"
                onClick={handleDelete}
            >
                X
            </button>
        </div>
    )
}

function TitleSection({ section, formActionUpdate, formActionDelete }: { section: Section } & FormActionProps) {
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

interface PhotoSectionProps extends FormActionProps {
    section: Section; // Or ImageSection if more specific
    sectionState: SectionState;
    handleImageChange: (event: ChangeEvent<HTMLInputElement>, sectionId: number) => void;
}

function PhotoSection({ section, formActionUpdate, formActionDelete, sectionState, handleImageChange }: PhotoSectionProps) {
    return (
        <div
            className="flex flex-col gap-4 justify-center items-center border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            key={section.id}
        >
            <Title section={section} formActionDelete={formActionDelete} />

            <div
                className={`overflow-hidden border rounded-sm p-2 h-auto  w-[${section.width}px] max-w-[810px] max-h-[810px]`}
                style={{
                    aspectRatio: "1 / 1", // Maintain a square aspect ratio or adjust based on image
                    resize: "horizontal", // Only allow horizontal resizing (optional, can remove if not needed)
                }}
            >
                <Image
                    src={sectionState[section.id] || section.src || ''}
                    alt={section.alt || ''}
                    width={800}
                    height={800}
                    className="object-contain w-full h-full"
                />
            </div>
            <input
                className="border rounded-sm border-white p-2"
                name="new-image"
                type="file"
                placeholder="Select new image"
                onChange={(e) => handleImageChange(e, section.id)}
            />
            <UpdateButton />
        </div>
    );
}

function Paragraph({ section, formActionUpdate, formActionDelete }: { section: Section } & FormActionProps) {

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
            <UpdateButton />
        </form>
    );
}


function Code({ section, formActionUpdate, formActionDelete }: { section: Section } & FormActionProps) {

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