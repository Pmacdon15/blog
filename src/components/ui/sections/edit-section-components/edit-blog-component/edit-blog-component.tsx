'use client';
import { useDeleteSection, useTogglePublishBlog, useUpdateSection, useUpdateBlogOrder } from "@/lib/mutations/mutations";
import { Section } from "@/types/types";
import { useState, ChangeEvent, useMemo } from "react";
import { Code } from "../code-section";
import { TitleSection } from "../title-section";
import { Paragraph } from "../paragraph-section";
import { ImageSection } from "../image-section";
import { AddSectionForm } from "../../add-section-components/add-section-form/add-section-form";
import { Button } from "@/components/ui/buttons/button";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

type SectionState = {
    [key: number]: string | null | undefined;
};

function SortableItem({ id, children }: { id: number, children: React.ReactElement }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="w-full">
            {React.cloneElement(children, { attributes, listeners })}
        </div>
    );
}

export default function EditBlogComponent({ data }: { data: Section[] }) {
    const [sections, setSections] = useState<Section[]>(data);
    const [sectionState, setSectionState] = useState<SectionState>({});

    const { mutate: mutateTogglePublished } = useTogglePublishBlog(data[0].blog_id);
    const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateSection(data[0].blog_id);
    const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteSection(data[0].blog_id);
    const { mutate: mutateUpdateBlogOrder, isPending: isPendingUpdateOrder } = useUpdateBlogOrder(data[0].blog_id);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };
    
    const handleSaveOrder = () => {
        const newOrder = sections.map((section, index) => ({
            id: section.id,
            order_index: index,
        }));
        mutateUpdateBlogOrder({ blogId: data[0].blog_id, newOrder: newOrder });
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

    const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

    return (
        <div className="flex flex-col w-full lg:w-4/6 sm:w-5/6 gap-4 justify-start min-h-screen items-center mt-4 px-4 pb-4 font-[family-name:var(--font-geist-sans)]">
            {data && (
                <div className="flex gap-4">
                    <Button onClick={() => mutateTogglePublished({ blogId: data[0].blog_id })} text={data[0].published ? 'Unpublish this Blog' : 'Publish This Blog'} />
                    <Button onClick={handleSaveOrder} text="Save Order" isPending={isPendingUpdateOrder} />
                </div>
            )}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={sectionIds}>
                    {sections.map((section: Section) => {
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
            <AddSectionForm blogId={data[0].blog_id} />
        </div>
    );
}