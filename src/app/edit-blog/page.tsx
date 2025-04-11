'use client';
import { useGetSections } from "@/hooks/hooks";
import { Section } from "@/types/types";
import Image from 'next/image';
export default function BlogPage({ blogId }: { blogId: number }) {
    const { data } = useGetSections(2);
    const userEmail = "pmacdonald15@gmail.com";
    console.log(data)
    return (
        <div className="flex flex-col justify-start min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-4 p-4 w-full md:w-4/6 ">

                {data?.map((section, index) => {
                    switch (section.section_type_id) {
                        case 1:
                            return <TitleSection key={index} section={section} />
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
                        // case 3:
                        //     return <></>;
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

function TitleSection({ section }: { section: Section }) {
    return (
        <form className="flex flex-col gap-4">
            <input
                type='text'
                placeholder="Title"
                defaultValue={section.title_section_title || ""}
                className="text-5xl text-center border rounded-sm"
            />
            <input
                name='date'
                type='date'
                defaultValue={new Date().toISOString().slice(0, 10)}
                className="text-center md-start border rounded-sm w-full md:w-2/6 p-2 "
            />
            <button
                className="border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110"
                style={{ background: 'var(--background)' }}
            >
                Update Section
            </button>
        </form>
    )
}