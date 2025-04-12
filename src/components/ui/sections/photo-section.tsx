import { useState } from "react";
import { UpdateButton } from "./section-components/update-button";
import { PhotoSectionProps } from "@/types/types";
import { Title } from "./section-components/title";
import Image from 'next/image'
import { handleSubmit } from "@/lib/utit";

export function PhotoSection({ section, formActionUpdate, formActionDelete, sectionState, handleImageChange }: PhotoSectionProps) {
    const [showOldPhoto, setShowOldPhoto] = useState(true);
    const [width, setWidth] = useState(section.width);

    const handleImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.target as HTMLImageElement;
        setWidth(img.width);
    };


    return (
        <div
            className="flex flex-col gap-4 justify-center items-center border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            key={section.id}>
            <form
                className="w-full flex flex-col gap-4 justify-center items-center"
                onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
            >
                <Title section={section} formActionDelete={formActionDelete} />

                <div
                    className={`overflow-hidden border rounded-sm p-2 h-auto  w-[${width}px] max-w-[810px] max-h-[810px]`}
                    style={{
                        aspectRatio: "1 / 1", // Maintain a square aspect ratio or adjust based on image
                        resize: "horizontal", // Only allow horizontal resizing (optional, can remove if not needed)
                    }}
                    onChange={(e) => setWidth(set the withh when it changes)}
                >
                    <Image
                        src={showOldPhoto ? (sectionState[section.id] || section.src || '') : (section.src || '')}
                        alt={section.alt || ''}
                        width={800}
                        height={800}
                        className="object-contain w-full h-full"
                        onLoad={handleImageLoaded}

                    />
                </div>
                <input
                    className="border rounded-sm border-white p-2"
                    name="new-image"
                    type="file"
                    placeholder="Select new image"
                    onChange={(e) => handleImageChange(e, section.id)}
                />
                <input
                    className="border rounded-sm border-white p-2"
                    name="alt"
                    type="text"
                    defaultValue={section.alt || ""}
                    placeholder="Description"
                />
                <input
                    className="border rounded-sm border-white p-2"
                    name="width"
                    type="number"
                    value={width || section.width || 0}
                    onChange={(e) => setWidth(Number(e.target.value))}
                />
                <UpdateButton />
            </form>
            {sectionState[section.id] &&
                <button
                    onClick={() => (setShowOldPhoto(!showOldPhoto))}
                    className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300">
                    {showOldPhoto ? 'Preview New Photo' : 'Show Old Photo'}
                </button>}
        </div>
    );
}
