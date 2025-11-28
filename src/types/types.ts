import type { ChangeEvent } from 'react'

// src/types/types.ts
export interface Section {
	id: number
	blog_id: number
	section_type_id: number
	section_type: 'title' | 'image' | 'paragraph' | 'code'
	title_section_title: string | null
	publish_date: string | null
	src: string | null
	alt: string | null
	width: number | null
	paragraph_title: string | null
	text: string | null
	language: string | null
	code: string | null
	published: boolean | null
	order_index: number
	new_file_object?: File
}

export interface FormActionInputDelete {
	sectionId: number
}

// Define the type for the section state in the parent component
export type SectionState = {
	[key: number]: string | null | undefined
}

// Define the props for the PhotoSection component
export interface PhotoSectionProps {
	section: Section // Ensure this matches the specific type if you've refined it (e.g., ImageSection)
	sectionState: SectionState
	handleImageChange: (
		event: ChangeEvent<HTMLInputElement>,
		sectionId: number,
	) => void
	isPending: boolean
}

export type BlogData = {
	id: number
	published: boolean
	section_id: number
	title: string
	publish_date: string
	image_src?: string
	// hasMore: boolean
}

// export type ResponseData = {
// 	blogs: BlogData[]
// 	hasMore: boolean
// }

export interface PaginationProps {
	page: number
	path: string
	hasMoreBlogs: boolean | undefined
}

export interface BlogPublishedResponse {
	success: boolean
	message: string
	published: boolean
}
