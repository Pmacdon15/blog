import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSection, createBlog, deleteBlogSection, togglePublishBlog, updateSection } from "../actions/blog-action";
import { revalidatePathAction } from "../actions/revalidatePath-action";

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
            revalidatePathAction(`/edit-blog${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


export const useAddBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => {
            return createBlog(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs', false, 1], });
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
    return useMutation({
        mutationFn: ({ formData, blogId }: { formData: FormData, blogId: number }) => {
            return addSection(blogId, formData);
        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


export const useUpdateSection = (blogId: number) => {
    return useMutation({
        mutationFn: async ({ blogId, sectionId, sectionTypeId, formData }: { blogId: number, sectionId: number, sectionTypeId: number, formData: FormData }) => {
            await updateSection(blogId, sectionTypeId, sectionId, formData);
            return { blogId }; // Return blogId for use in onSuccess
        },
        onSuccess: () => {
            revalidatePathAction("/")
            revalidatePathAction("/blog")
            revalidatePathAction("/edit-blog")
            revalidatePathAction(`/blog/${blogId}`)
            revalidatePathAction(`/edit-blog${blogId}`)
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
            revalidatePathAction(`/edit-blog${blogId}`)
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


