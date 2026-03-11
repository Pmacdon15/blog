import { useMutation } from '@tanstack/react-query'
import {
	addSection,
	createBlog,
	deleteBlog,
	deleteBlogSection,
	togglePublishBlog,
	updateBlogOrder,
	updateSection,
} from '../actions/blog-action'
import {
	redirectAction,
	revalidatePathAction,
	updateTagAction,
} from '../actions/revalidatePath-action'

export const useTogglePublishBlog = (blogId: number) => {
	return useMutation({
		mutationFn: ({ blogId }: { blogId: number }) => {
			return togglePublishBlog(blogId)
		},
		onSuccess: () => {
			updateTagAction(`sections-${blogId}`)
			updateTagAction(`sections-unpublished-published-${blogId}`)
			updateTagAction('blogs')
			updateTagAction('blogs-unpublished')
			redirectAction('/unpublished-blogs')
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useAddBlog = () => {
	return useMutation({
		mutationFn: async (formData: FormData) => {
			const resultData = await createBlog(formData)
			return resultData
		},
		onSuccess: (resultData) => {
			// updateTagAction('blogs')
			updateTagAction('blogs-unpublished')
			updateTagAction(`sections-unpublished-published-${resultData.id}`)
			// revalidatePathAction(`/unpublished-blogs`)
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useAddSection = (blogId: number) => {
	return useMutation({
		mutationFn: ({
			formData,
			blogId,
		}: {
			formData: FormData
			blogId: number
		}) => {
			return addSection(blogId, formData)
		},
		onSuccess: () => {
			updateTagAction(`sections-${blogId}`)
			updateTagAction(`sections-unpublished-published-${blogId}`)
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useUpdateSection = (blogId: number) => {
	return useMutation({
		mutationFn: ({
			blogId,
			sectionId,
			sectionTypeId,
			formData,
		}: {
			blogId: number
			sectionId: number
			sectionTypeId: number
			formData: FormData
		}) => {
			return updateSection(blogId, sectionTypeId, sectionId, formData)
		},
		onSuccess: () => {
			updateTagAction(`blogs`)
			updateTagAction(`blogs-unpublished`)
			updateTagAction(`sections-${blogId}`)
			updateTagAction(`sections-unpublished-published-${blogId}`)
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useDeleteSection = (blogId: number) => {
	return useMutation({
		mutationFn: ({
			blogId,
			sectionId,
			sectionTypeId,
		}: {
			blogId: number
			sectionId: number
			sectionTypeId: number
		}) => {
			return deleteBlogSection(blogId, sectionId, sectionTypeId)
		},
		onSuccess: () => {
			updateTagAction(`sections-${blogId}`)
			updateTagAction(`sections-unpublished-published-${blogId}`)
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useUpdateBlogOrder = (blogId: number) => {
	return useMutation({
		mutationFn: ({
			blogId,
			newOrder,
		}: {
			blogId: number
			newOrder: { id: number; order_index: number }[]
		}) => {
			return updateBlogOrder({ blogId, newOrder })
		},
		onSuccess: () => {
			updateTagAction(`sections-${blogId}`)
			updateTagAction(`sections-unpublished-published-${blogId}`)
		},
		onError: (error) => {
			console.error('Mutation error:', error)
		},
	})
}

export const useDeleteBlog = () => {
	return useMutation({
		mutationFn: (blogId: number) => deleteBlog(blogId),
		onSuccess: (_data, blogId) => {
			updateTagAction('blogs')
			updateTagAction('blogs-unpublished')
			updateTagAction(`sections-${blogId}`)
			updateTagAction(`sections-unpublished-published-${blogId}`)
			// revalidatePathAction(`/blog/${blogId}`)
			// revalidatePathAction(`/edit-blog/${blogId}`)
			
		},
		onError: (error) => {
			console.error('Delete blog error:', error)
		},
	})
}
