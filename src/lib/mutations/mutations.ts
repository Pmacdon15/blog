import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteBlogSection, togglePublishBlog, updateSection } from "../actions/blog-action";
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


const addBlog = async (formData: FormData) => {
    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
    }

    return await response.json();
};

export const useAddBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) => {
            return addBlog(formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs', false, 1], });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


const addSection = async (formData: FormData, blogId: number) => {
    const response = await fetch(`/api/add-section/${blogId}`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
    }

    return await response.json();
};

export const useAddSection = (blogId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ formData, blogId }: { formData: FormData, blogId: number }) => {
            return await addSection(formData, blogId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-sections', blogId], });
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


