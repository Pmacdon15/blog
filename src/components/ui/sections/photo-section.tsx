import { useState, useRef, useEffect, useCallback } from "react";
import { UpdateButton } from "./section-components/update-button";
import { PhotoSectionProps } from "@/types/types";
import { Title } from "./section-components/title";
import Image from "next/image";
import { handleSubmit } from "@/lib/utit";

// Simple throttle utility
function throttle<T extends (...args: any[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

export function PhotoSection({ section, formActionUpdate, formActionDelete, sectionState, handleImageChange }: PhotoSectionProps) {
    const [showOldPhoto, setShowOldPhoto] = useState(true);
    const [width, setWidth] = useState<number>(section.width || 150); // Initialize with section.width
    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialRender = useRef(true); // Track first render

    // Throttled setWidth
    const throttledSetWidth = useCallback(
        throttle((newWidth: number) => {
            console.log("Throttled width update:", newWidth);
            setWidth(newWidth);
        }, 50), // 50ms interval
        []
    );

    // Observe container width changes from dragging
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newWidth = Math.round(entry.contentRect.width);
                // Skip update on initial render to preserve section.width
                if (isInitialRender.current) {
                    isInitialRender.current = false;
                    console.log("Initial container width:", newWidth);
                    return;
                }
                throttledSetWidth(newWidth);
            }
        });

        observer.observe(containerRef.current);

        // Cleanup on unmount
        return () => {
            observer.disconnect();
        };
    }, [throttledSetWidth]);

    // Image source: new photo if !showOldPhoto and sectionState exists, else old photo
    const imageSrc = !showOldPhoto && sectionState[section.id] ? sectionState[section.id] : section.src || "/placeholder.jpg";

    return (
        <div
            className="flex flex-col gap-4 justify-center items-center border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            key={section.id}
        >
            <form
                className="w-full flex flex-col gap-4 justify-center items-center"
                onSubmit={(event) => handleSubmit(event, section, formActionUpdate)}
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
                    name="new-image"
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
                <UpdateButton />
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