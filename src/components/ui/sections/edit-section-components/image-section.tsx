import { useState, useRef, useEffect, useCallback, ChangeEvent } from "react";
import { UpdateButton } from "../../buttons/update-button";
import { Section, SectionState } from "@/types/types";
import { Title } from "./title";
import Image from "next/image";
import { throttle } from '@/lib/utils';

export function ImageSection({ section, formAction, formActionDelete, sectionState, handleImageChange, isPending }: { section: Section, formAction: (formData: FormData) => void, formActionDelete: (input: { sectionId: number; }) => void, sectionState: SectionState, handleImageChange: (event: ChangeEvent<HTMLInputElement>, sectionId: number) => void, isPending: boolean }) {
    const [showOldPhoto, setShowOldPhoto] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, setWidth } = useThrottledWidth(containerRef, section.width || 150);

    // Image source: new photo if !showOldPhoto and sectionState exists, else old photo
    const imageSrc = !showOldPhoto && sectionState[section.id] ? sectionState[section.id] : section.src || "/placeholder.jpg";

    return (
        <div
            className="flex flex-col gap-4 justify-center items-center border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            key={section.id}
        >
            <form
                className="w-full flex flex-col gap-4 justify-center items-center"
            >
                <Title section={section} formActionDelete={formActionDelete} />

                <div
                    ref={containerRef}
                    className="overflow-hidden border rounded-sm p-2 h-auto min-w-36 max-w-[810px] max-h-[810px]"
                    style={{
                        width: `${width}px`, // Controlled by state
                        aspectRatio: "1 / 1",
                        resize: "horizontal",
                    }}
                >
                    <Image
                        src={imageSrc || ""}
                        alt={section.alt || ""}
                        width={800}
                        height={800}
                        className="object-contain w-full h-full"
                    />
                </div>
                <input
                    className="border rounded-sm border-white p-2"
                    name="new-file"
                    type="file"
                    placeholder="Select new image"
                    onChange={(e) => {
                        handleImageChange(e, section.id);
                        setShowOldPhoto(false); // Show new photo after upload
                    }}
                />
                <input
                    className="border rounded-sm border-white p-2"
                    name="alt"
                    type="text"
                    defaultValue={section.alt || ""}
                    placeholder="Description"
                    required
                />
                <input
                    className="border rounded-sm border-white p-2"
                    name="width"
                    type="number"
                    value={width} // Controlled by state
                    onChange={(e) => setWidth(Math.max(0, Number(e.target.value)))} // Allow input changes
                    placeholder="Width (px)"
                    min="0"
                    hidden
                />
                <UpdateButton formAction={formAction} actionString="Update Section" disabled={isPending} />
            </form>
            {sectionState[section.id] && (
                <button
                    onClick={() => setShowOldPhoto(!showOldPhoto)}
                    className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
                >
                    {showOldPhoto ? "Preview New Photo" : "Show Old Photo"}
                </button>
            )}
        </div>
    );
}

// At the bottom of the page
function useThrottledWidth(containerRef: React.RefObject<HTMLDivElement | null>, initialWidth: number) {
    const [width, setWidth] = useState(initialWidth);
    const isInitialRender = useRef(true);
    const throttledSetWidth = useCallback(
        (newWidth: number) => {
            setWidth(newWidth);
        },
        [setWidth]
    );

    useEffect(() => {
        const throttled = throttle(throttledSetWidth, 100);
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newWidth = Math.round(entry.contentRect.width);
                if (isInitialRender.current) {
                    isInitialRender.current = false;
                    return;
                }
                throttled(newWidth);
            }
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [throttledSetWidth, containerRef]);

    return { width, setWidth };
}