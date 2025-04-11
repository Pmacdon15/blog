'use client';
import { useGetSections } from "@/hooks/hooks";
import { useUpdateSection } from "@/mutations/mutations";
import { Section } from "@/types/types";
// import Image from 'next/image';

export default function BlogPage() {
    const { data } = useGetSections(2);
    const userEmail = "pmacdonald15@gmail.com";
    const blogId = 2;

    const { mutate } = useUpdateSection(blogId, userEmail);

    console.log(data)
    return (
        <div className="flex flex-col justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-4 p-4 w-full md:w-4/6 ">

                {data?.map((section, index) => {
                    switch (section.section_type_id) {
                        case 1:
                            return <TitleSection key={index} section={section} formAction={mutate} />
                        // case 2:
                        //     return <>
                        //         <Image
                        //             className="w-36 h-auto"
                        //             key={index}
                        //             src={section.src || ''}
                        //             alt={section.alt || ''}
                        //             width={600}
                        //             height={600}
                        //         />;
                        //     </>
                        case 3:
                            return <Paragraph key={index} section={section} formAction={mutate}></Paragraph>;
                        // case 4:
                        //     return (
                        //         <></>
                        //     );

                    }
                })}
            </div>
        </div>
    );
}

function TitleSection({ section, formAction }:
    {
        section: Section,
        formAction: (input: { formData: FormData; sectionTypeId: number }) => void;
    }) {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formAction({ formData, sectionTypeId: section.section_type_id });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] " >
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
            <button className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
            >
                Update Section
            </button>

        </form >
    )
}

function Paragraph({ section, formAction }:
    {
        section: Section,
        formAction: (input: { formData: FormData; sectionTypeId: number }) => void;
    }) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formAction({ formData, sectionTypeId: section.section_type_id });
    };


    return (
        <form
            onSubmit={handleSubmit} className="flex flex-col w-full text-center md:text-left  gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <input
                type='text'
                name='title'
                placeholder="Title"
                defaultValue={section.paragraph_title || ""}
                className="text-4xl border rounded-sm">
            </input>
            <textarea
                className="indent-8 min-h-36 border p-4 rounded-sm "
                name="text"
                defaultValue={section.text || ""}
            />

            <button className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border  p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
            >
                Update Section
            </button>
        </form>
    );
}
