import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ResponseData, Section } from '@/types/types';

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

const fetchBlogs = async (page: number, published: boolean): Promise<ResponseData> => {
    const response = await fetch(`/api/blogs?published=${published}&page=${page}&limit=3`)
    return await response.json();
}

export const useGetBlogs = (page: number, published: boolean) => {
    return useQuery({
        queryKey: ['blogs', published, page], // Include page in the query key
        queryFn: () => fetchBlogs(page, published),
        placeholderData: keepPreviousData,
    })
}


