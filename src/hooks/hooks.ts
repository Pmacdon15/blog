import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { BlogPublishedResponse, ResponseData, Section } from '@/types/types';

const fetchBlogSections = async (blogId: number): Promise<Section[]> => {
  const response = await fetch(`/api/sections/${blogId}`)
  if (!response.ok) {
    throw new Error(response.statusText);
  }
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
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export const useGetBlogs = (page: number, published: boolean) => {
  return useQuery({
    queryKey: ['blogs', published, page],
    queryFn: () => fetchBlogs(page, published),
    placeholderData: keepPreviousData,
  })
}


const fetchIsBlogPublished = async (blogId: number): Promise<BlogPublishedResponse> => {
  const response = await fetch(`/api/blog/${blogId}`)
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export const useGetIsBlogPublished = (blogId: number) => {
  return useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => fetchIsBlogPublished(blogId),
  })
}