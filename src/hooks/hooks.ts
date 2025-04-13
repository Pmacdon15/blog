import { useQuery } from '@tanstack/react-query';
import { BlogData, Section } from '@/types/types';

const fetchBlogSections = async (blogId: number): Promise<Section[]> => {
    const response = await fetch(`/api/sections/${blogId}`)
    return await response.json();
}

export const useGetSections = (blogId: number) => {
    return useQuery({
        queryKey: ['blog-sections', blogId],
        queryFn: () => fetchBlogSections(blogId),
    })
}

const fetchBlogs = async (blogId: number, published: boolean): Promise<BlogData[]> => {
    const response = await fetch(`/api/blogs/${blogId}?published=${published}`)
    return await response.json();
}

export const useGetBlogs = (blogId: number, published: boolean) => {
    return useQuery({
        queryKey: ['blogs', blogId, published],
        queryFn: () => fetchBlogs(blogId, published),
    })
}



