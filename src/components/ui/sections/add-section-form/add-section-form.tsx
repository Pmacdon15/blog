'use client'
import { useState } from "react"
import { TitleSection } from "../add-section-components/title-section"

export function AddSectionForm() {
    const sections = ['Title', 'Image', 'Paragraph', 'Code']
    const [currentSection, setCurrentSection] = useState("Title")

    const handleSectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentSection(event.target.value);
    };

    return (
        <div className="flex flex-col gap-4 border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] " >
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
                <TitleSection />
            }
            {/* Add other sections here */}
            {currentSection === "Image" &&
                <p>Image section</p>
            }
            {currentSection === "Paragraph" &&
                <p>Paragraph section</p>
            }
            {currentSection === "Code" &&
                <p>Code section</p>
            }
        </div>
    )
}