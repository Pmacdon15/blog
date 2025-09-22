import React, { useState, ChangeEvent, useMemo, useCallback, useRef, useEffect, useOptimistic, useTransition } from "react";
import { Section } from "@/types/types";
import { useDeleteSection, useTogglePublishBlog, useUpdateSection, useUpdateBlogOrder, useDeleteBlog } from "@/lib/mutations/mutations";
import { useSyncedSections } from "@/lib/hooks/hooks";
import { Code } from "../code-section";
import { TitleSection } from "../title-section";
import { Paragraph } from "../paragraph-section";
import { ImageSection } from "../image-section";
import { AddSectionForm } from "../../add-section-components/add-section-form/add-section-form";
import { Button } from "@/components/ui/buttons/button";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, TouchSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grip } from 'lucide-react';

type SectionState = {
    [key: number]: string | null | undefined;
};

function SortableItem({ id, children }: { id: number, children: React.ReactNode }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,

    };

    return (
        <div ref={setNodeRef} style={style} className="flex flex-col w-full">
            <div {...attributes} {...listeners} style={{ touchAction: 'none' }} className="cursor-grab p-2 self-start">
                <Grip />
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}

export default function EditBlogComponent({ data }: { data: Section[] }) {
    const [sections, setSections] = useSyncedSections(data);
    const [sectionState, setSectionState] = useState<SectionState>({});
    const [isPending, startTransition] = useTransition();
    const [optimisticSections, addOptimisticSection] = useOptimistic(
        sections,
        (state: Section[], newSection: Section) => [...state, newSection]
    );

    const { mutate: mutateTogglePublished } = useTogglePublishBlog(data[0].blog_id);
    const { mutate: mutateUpdate, isPending: isPendingUpdate, isError, error } = useUpdateSection(data[0].blog_id);
    const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteSection(data[0].blog_id);
    const { mutate: mutateUpdateBlogOrder } = useUpdateBlogOrder(data[0].blog_id);
    const { mutate: mutateDeleteBlog, isPending: isPendingDeleteBlog } = useDeleteBlog();

    const handleDeleteBlog = () => {
        if (window.confirm('Are you sure you want to delete this entire blog? This action cannot be undone.')) {
            mutateDeleteBlog(data[0].blog_id);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {

                distance: 100,
                handler: true,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const debouncedSaveRef = useRef<NodeJS.Timeout | null>(null);

    const saveOrder = useCallback((currentSections: Section[]) => {
        const newOrder = currentSections.map((section, index) => ({
            id: section.id,
            order_index: index,
        }));
        mutateUpdateBlogOrder({ blogId: data[0].blog_id, newOrder: newOrder });
    }, [mutateUpdateBlogOrder, data]);

    useEffect(() => {
        return () => {
            if (debouncedSaveRef.current) {
                clearTimeout(debouncedSaveRef.current);
            }
        };
    }, []);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newSections = arrayMove(items, oldIndex, newIndex);

                if (debouncedSaveRef.current) {
                    clearTimeout(debouncedSaveRef.current);
                }
                debouncedSaveRef.current = setTimeout(() => {
                    saveOrder(newSections);
                }, 500); // Debounce for 500ms

                return newSections;
            });
        }
    };

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

    const sectionIds = useMemo(() => optimisticSections.map((section) => section.id), [optimisticSections]);
    // console.log("sectionIds: ", sectionIds)
    // console.log("section 0: ", sections[0])
    // console.log(`Published value at render time: ${data[0].published}`);
    if (isError) console.log("Error: ", error?.message)

    return (
        <div className="flex flex-col w-full lg:w-4/6 sm:w-5/6 gap-4 justify-start min-h-screen items-center pb-4 font-[family-name:var(--font-geist-sans)]">
            {data && (
                <div className="flex gap-4">
                    <Button onClick={() => mutateTogglePublished({ blogId: data[0].blog_id })} text={data[0].published ? 'Unpublish this Blog' : 'Publish This Blog'} />
                    <button onClick={handleDeleteBlog} disabled={isPendingDeleteBlog} className="bg-red-600 text-white border p-2 rounded-sm mx-auto hover:bg-red-700 hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isPendingDeleteBlog ? 'Deleting...' : 'Delete Blog'}
                    </button>
                </div>
            )}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sectionIds}>
                    {optimisticSections.map((section: Section) => {
                        const formActionDelete = () => mutateDelete({ sectionId: section.id, sectionTypeId: section.section_type_id, blogId: data[0].blog_id });
                        let sectionComponent;
                        switch (section.section_type_id) {
                            case 1:
                                sectionComponent = <TitleSection section={section} formAction={(formData: FormData) => mutateUpdate({ formData, sectionId: section.id, sectionTypeId: section.section_type_id, blogId: data[0].blog_id })} formActionDelete={formActionDelete} isPending={isPendingUpdate || isPendingDelete} />;
                                break;
                            case 2:
                                sectionComponent = (
                                    <ImageSection
                                        section={section}
                                        formAction={(formData: FormData) => mutateUpdate({ formData, sectionId: section.id, sectionTypeId: section.section_type_id, blogId: data[0].blog_id })}
                                        formActionDelete={formActionDelete}
                                        sectionState={sectionState}
                                        handleImageChange={handleImageChange}
                                        isPending={isPendingUpdate || isPendingDelete}
                                    />
                                );
                                break;
                            case 3:
                                sectionComponent = <Paragraph section={section} formAction={(formData: FormData) => mutateUpdate({ formData, sectionId: section.id, sectionTypeId: section.section_type_id, blogId: data[0].blog_id })} formActionDelete={formActionDelete} isPending={isPendingUpdate || isPendingDelete} />;
                                break;
                            case 4:
                                sectionComponent = <Code section={section} formAction={(formData: FormData) => mutateUpdate({ formData, sectionId: section.id, sectionTypeId: section.section_type_id, blogId: data[0].blog_id })} formActionDelete={formActionDelete} isPending={isPendingUpdate || isPendingDelete} />;
                                break;
                            default:
                                sectionComponent = <div>Unsupported section type</div>;
                        }
                        return (
                            <SortableItem key={section.id} id={section.id}>
                                {sectionComponent}
                            </SortableItem>
                        );
                    })}
                </SortableContext>
            </DndContext>
            {isError && <p className="text-red-600">Error:{error.message}</p>}
            <AddSectionForm blogId={data[0].blog_id} addOptimisticSection={addOptimisticSection}  />
        </div>
    );
}