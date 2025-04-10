import { useQuery } from '@tanstack/react-query';
import { Section } from '@/types/types';

const fetchBlogSections = async (): Promise<Array<Section[]>> => {
    const response = await fetch(`/api/blog-sections`)
    return await response.json();
}

export const useGetSections = () => {
    return useQuery({
        queryKey: ['blog-sections'],
        queryFn: fetchBlogSections,
    })
}

