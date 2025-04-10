import { useQuery } from '@tanstack/react-query';
import { Section } from '@/types/types';

const fetchBlogSections = async (blogId: number): Promise<Section[]> => {
    const response = await fetch(`/api/blog/${blogId}`)
    return await response.json();
}

export const useGetSections = (blogId: number) => {
    return useQuery({
        queryKey: ['blog-sections', blogId],
        queryFn: () => fetchBlogSections(blogId),
    })
}



