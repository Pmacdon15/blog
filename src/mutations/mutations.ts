import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const updateTitleSection = async (blogId: number, userEmail: string, formData: FormData) => {
    const response = await fetch(`/api/blog/${blogId}/${userEmail}`, {
      method: 'PUT',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to update title section');
    }
  
    return await response.json();
  };

export const useUpdateTitleSection = (blogId: number, userEmail: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await updateTitleSection(blogId, userEmail, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', blogId, userEmail] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });
};