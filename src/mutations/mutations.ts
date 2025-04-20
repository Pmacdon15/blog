import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

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
        mutationFn: async ({ formData, }: { formData: FormData; }) => {
            return await addBlog(formData);
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

const updateSection = async (blogId: number, sectionId: number, sectionTypeId: number, formData: FormData) => {
    const response = await fetch(`/api/update-section/${blogId}/${sectionId}/${sectionTypeId}`, {
        method: 'PUT',
        body: formData,
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
    }

    return await response.json();
};

export const useUpdateSection = (blogId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ formData, sectionId, sectionTypeId }: { formData: FormData; sectionId: number, sectionTypeId: number }) => {
            return await updateSection(blogId, sectionId, sectionTypeId, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-sections', blogId], });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};


const deleteSection = async (blogId: number, sectionId: number) => {
    const response = await fetch(`/api/delete-section/${blogId}/${sectionId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(JSON.stringify(errorResponse));
    }

    return await response.json();
};

export const useDeleteSection = (blogId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ sectionId }: { sectionId: number }) => {
            return await deleteSection(blogId, sectionId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-sections', blogId], });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};
