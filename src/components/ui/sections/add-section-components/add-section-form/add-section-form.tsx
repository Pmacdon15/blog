'use client'
import { useState } from "react"
import { TitleSection } from "../title-section"
import ParagraphSection from "../paragraph-section";
import CodeSection from "../code-section";
import { ImageSection } from "../image-section";
import { useAddSection } from "@/lib/mutations/mutations";



export function AddSectionForm({ blogId }: { blogId: number }) {

    const { mutate, isPending, isError } = useAddSection(blogId);

    const sections = ['Title', 'Image', 'Paragraph', 'Code']
    const [currentSection, setCurrentSection] = useState("Title")

    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSection(event.target.value);
    };
   
    return (
        <form
            action={(formData: FormData) => mutate({ formData, blogId })}
            className="flex flex-col gap-4 border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] " >
            <h1>Add Section</h1>
            <select
                name="section-type"
                className="text-center border rounded-sm bg-[var(--secondary)] text-white p-2"
                value={currentSection}
                onChange={handleSectionChange}
            >
                <option value="">Select an option</option>
                {sections.map((section, index) => (
                    <option key={index} value={section}>{section}</option>
                ))}
            </select>
            {currentSection === "Title" &&
                <TitleSection isPending={isPending} isError={isError} />
            }
            {/* Add other sections here */}
            {currentSection === "Image" &&
                <ImageSection isPending={isPending} isError={isError} />
            }
            {currentSection === "Paragraph" &&
                <ParagraphSection isPending={isPending} isError={isError} />
            }
            {currentSection === "Code" &&
                <CodeSection isPending={isPending} isError={isError} />
            }
        </form>
    )
}