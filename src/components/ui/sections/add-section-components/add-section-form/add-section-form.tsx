import { useState, Dispatch, SetStateAction } from "react"
import { TitleSection } from "../title-section"
import ParagraphSection from "../paragraph-section";
import CodeSection from "../code-section";
import { ImageSection } from "../image-section";
import { useAddSection } from "@/lib/mutations/mutations";
import { Section } from "@/types/types";

export function AddSectionForm({ blogId, addOptimisticSection, setSections }: { blogId: number, addOptimisticSection: (action: Section) => void, setSections: Dispatch<SetStateAction<Section[]>> }) {

    const { mutate, isPending, isError } = useAddSection(blogId);

    const sections = ['Title', 'Image', 'Paragraph', 'Code']
    const [currentSection, setCurrentSection] = useState("Title")

    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSection(event.target.value);
    };

    const formAction = async (formData: FormData) => {
        const sectionType = formData.get('section-type') as string;
        const newSection: Partial<Section> = {
            id: Date.now(), // Temporary ID
            blog_id: blogId,
            order_index: 0, // This will be updated on the server
        };

        if (sectionType === 'Title') {
            newSection.section_type_id = 1;
            newSection.content = formData.get('title') as string;
        } else if (sectionType === 'Image') {
            newSection.section_type_id = 2;
            newSection.image_url = '' // Placeholder, will be updated on the server
        } else if (sectionType === 'Paragraph') {
            newSection.section_type_id = 3;
            newSection.content = formData.get('paragraph') as string;
        } else if (sectionType === 'Code') {
            newSection.section_type_id = 4;
            newSection.content = formData.get('code') as string;
        }

        addOptimisticSection(newSection as Section);
        mutate({ formData, blogId, addOptimisticSection, setSections });
    }

    return (
        <form
            action={formAction}
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