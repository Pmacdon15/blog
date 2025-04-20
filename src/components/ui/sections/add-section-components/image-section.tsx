import { useState, useRef, useEffect, useCallback } from "react";
import { UpdateButton } from "../update-button";
import { PhotoSectionProps } from "@/types/types";
import Image from "next/image";
import { throttle } from '@/lib/utils';

export function ImageSection({ isPending, isError }: {
    isPending: boolean,
    isError: boolean
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, setWidth } = useThrottledWidth(containerRef, 150);
    const [imageSrc, setImageSrc] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setImageSrc(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <div className="w-full flex flex-col gap-4 justify-center items-center">
                <div
                    ref={containerRef}
                    className="overflow-hidden border rounded-sm p-2 h-auto min-w-36 max-w-[810px] max-h-[810px]"
                    style={{
                        width: `${width}px`, // Controlled by state
                        aspectRatio: "1 / 1",
                        resize: "horizontal",
                    }}
                >
                    {imageSrc !== '' &&
                        <Image
                            src={imageSrc || ""}
                            alt={""}
                            width={800}
                            height={800}
                            className="object-contain w-full h-full"
                        />
                    }
                </div>
                <input
                    className="border rounded-sm border-white p-2"
                    name="new-file"
                    type="file"
                    placeholder="Select new image"
                    onChange={handleFileChange}
                />
                <input
                    className="border rounded-sm border-white p-2"
                    name="alt"
                    type="text"
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
                <UpdateButton actionString="Add Section" disabled={isPending} />
            </div>
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