'use client';
import { useDeleteSection, useUpdateSection } from "@/mutations/mutations";
import { Section, FormActionProps, FormActionInputDelete, PhotoSectionProps } from "@/types/types";
import { Key, useState, ChangeEvent, useRef } from "react";
import Image from 'next/image';
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


// function PhotoSection({ section, formActionUpdate, formActionDelete, sectionState, handleImageChange }: PhotoSectionProps) {
//     const [showOldPhoto, setShowOldPhoto] = useState(true);
//     const [width, setWidth] = useState(section.width);

//     const handleImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
//         const img = event.target as HTMLImageElement;
//         setWidth(img.width);
//     };


//     return (
//         <div
//             className="flex flex-col gap-4 justify-center items-center border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
//             key={section.id}>
//             <form
//                 className="w-full flex flex-col gap-4 justify-center items-center"
//                 onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
//             >
//                 <Title section={section} formActionDelete={formActionDelete} />

//                 <div
//                     className={`overflow-hidden border rounded-sm p-2 h-auto  w-[${width}px] max-w-[810px] max-h-[810px]`}
//                     style={{
//                         aspectRatio: "1 / 1", // Maintain a square aspect ratio or adjust based on image
//                         resize: "horizontal", // Only allow horizontal resizing (optional, can remove if not needed)
//                     }}
//                     onChange={(e) => setWidth(set the withh when it changes)}
//                 >
//                     <Image
//                         src={showOldPhoto ? (sectionState[section.id] || section.src || '') : (section.src || '')}
//                         alt={section.alt || ''}
//                         width={800}
//                         height={800}
//                         className="object-contain w-full h-full"
//                         onLoad={handleImageLoaded}

//                     />
//                 </div>
//                 <input
//                     className="border rounded-sm border-white p-2"
//                     name="new-image"
//                     type="file"
//                     placeholder="Select new image"
//                     onChange={(e) => handleImageChange(e, section.id)}
//                 />
//                 <input
//                     className="border rounded-sm border-white p-2"
//                     name="alt"
//                     type="text"
//                     defaultValue={section.alt || ""}
//                     placeholder="Description"
//                 />
//                 <input
//                     className="border rounded-sm border-white p-2"
//                     name="width"
//                     type="number"
//                     value={width || section.width || 0}
//                     onChange={(e) => setWidth(Number(e.target.value))}
//                 />
//                 <UpdateButton />
//             </form>
//             {sectionState[section.id] &&
//                 <button
//                     onClick={() => (setShowOldPhoto(!showOldPhoto))}
//                     className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300">
//                     {showOldPhoto ? 'Preview New Photo' : 'Show Old Photo'}
//                 </button>}
//         </div>
//     );
// }
