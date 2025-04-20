'use client'
import { useState } from "react"
import { TitleSection } from "../title-section"
import { useAddSection } from "@/mutations/mutations";
import ParagraphSection from "../paragraph-section";
import CodeSection from "../code-section";
import { ImageSection } from "../image-section";



export function AddSectionForm({ blogId }: { blogId: number }) {

    const { mutate, isPending, isError } = useAddSection(blogId);

    const sections = ['Title', 'Image', 'Paragraph', 'Code']
    const [currentSection, setCurrentSection] = useState("Title")

    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSection(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutate({ formData, blogId });
        event.currentTarget.reset();
    };


    return (
        <form
            onSubmit={handleSubmit}
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