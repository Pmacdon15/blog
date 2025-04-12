'use client';
import { useDeleteSection, useUpdateSection } from "@/mutations/mutations";
import { Section, FormActionProps, FormActionInputDelete } from "@/types/types";
import { Key } from "react";

import Image from 'next/image';

export default function EditBlogComponent({ blogId, data }: { blogId: number, data: Section[] }) {

    const { mutate: mutateUpdate } = useUpdateSection(blogId);
    const { mutate: mutateDelete } = useDeleteSection(blogId);

    console.log(data)

    return (
        <div className="flex flex-col w-full md:w-4/6 gap-8 justify-start min-h-screen items-center mt-8 pb-4 font-[family-name:var(--font-geist-sans)]">
            {data?.map((section: Section, index: Key | null | undefined) => {
                switch (section.section_type_id) {
                    case 1:
                        return <TitleSection key={index} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} />
                    case 2:
                        return (
                            <Image
                                className="w-36 h-auto"
                                key={index}
                                src={section.src || ''}
                                alt={section.alt || ''}
                                width={600}
                                height={600}
                            />
                        );
                    case 3:
                        return <Paragraph key={index} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} />;
                    case 4:
                        return <Code key={index} section={section} formActionUpdate={mutateUpdate} formActionDelete={mutateDelete} />
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
        <div className="flex justify-between">
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
