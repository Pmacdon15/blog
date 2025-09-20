'use server'
import { togglePublishBlogDB } from "../db"
import { isAdmin } from "./auth"

export async function togglePublishBlog(blogId: number) {
    if (await isAdmin() === true) {
        await togglePublishBlogDB(blogId)
    }
} 
export async function updateSection(blogId: number, sectionTypeId: number, sectionId: number) {
    if (await isAdmin() === true) {
        await updateSectionDB(blogId, sectionTypeId, sectionId)
    }
} 