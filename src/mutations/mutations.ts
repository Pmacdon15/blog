import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const updateSection = async (blogId: number, sectionId: number, sectionTypeId: number, formData: FormData) => {
    const response = await fetch(`/api/blog/${blogId}/${sectionId}/${sectionTypeId}`, {
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
            return await updateSection(blogId, sectionId, sectionTypeId,formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-sections', blogId], });
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });
};