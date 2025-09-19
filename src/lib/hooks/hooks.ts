import { useQuery } from '@tanstack/react-query';
import { BlogPublishedResponse, Section } from '@/types/types';
import { isAdmin } from '../actions/auth';

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


export const useIsAdmin = () => {
  return useQuery({
    queryKey: ['isAdmin'],
    queryFn: () => isAdmin(),
  })
}