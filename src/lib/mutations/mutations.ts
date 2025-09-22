import { useMutation } from "@tanstack/react-query";
import { addSection, createBlog, deleteBlog, deleteBlogSection, togglePublishBlog, updateBlogOrder, updateSection } from "../actions/blog-action";
import { revalidatePathAction } from "../actions/revalidatePath-action";
import { Section } from "@/types/types";

export const useTogglePublishBlog = (blogId: number) => {
    return useMutation({
        mutationFn: ({ blogId }: { blogId: number }) => {
            return togglePublishBlog(blogId);
        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog/${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


export const useAddBlog = () => {
    return useMutation({
        mutationFn: (formData: FormData) => {
            return createBlog(formData);
        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useAddSection = (blogId: number) => {
    let tempIdCounter = -1;
    return useMutation({
        mutationFn: ({ formData, blogId }: { formData: FormData, blogId: number, addOptimisticSection: (action: Section) => void }) => {
            return addSection(blogId, formData);
        },
        onMutate: async ({ formData, addOptimisticSection }) => {
            const sectionType = formData.get('section-type') as string;
            const newSection: Partial<Section> = {
                id: tempIdCounter--,
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
        },
        onSuccess: (newRealSection: Section, { addOptimisticSection, blogId }) => {
            // This revalidation will fetch the latest data from the server
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog/${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


export const useUpdateSection = (blogId: number) => {
    return useMutation({
        mutationFn: ({ blogId, sectionId, sectionTypeId, formData }: { blogId: number, sectionId: number, sectionTypeId: number, formData: FormData }) => {
            return updateSection(blogId, sectionTypeId, sectionId, formData);

        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog/${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};



export const useDeleteSection = (blogId: number) => {
    return useMutation({
        mutationFn: ({ blogId, sectionId, sectionTypeId }: { blogId: number, sectionId: number, sectionTypeId: number }) => {
            return deleteBlogSection(blogId, sectionId, sectionTypeId);
        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog/${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


export const useUpdateBlogOrder = (blogId: number) => {
    return useMutation({
        mutationFn: ({ blogId, newOrder }: { blogId: number, newOrder: { id: number, order_index: number }[] }) => {
            return updateBlogOrder({ blogId, newOrder });
        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog/${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};

export const useDeleteBlog = () => {
    return useMutation({
        mutationFn: (blogId: number) => deleteBlog(blogId),        
        onError: (error) => {
            console.error('Delete blog error:', error);
        }
    });
};