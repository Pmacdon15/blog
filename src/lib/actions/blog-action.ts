'use server'
import { togglePublishBlogDB } from "../db"
import { isAdmin } from "./auth"

export async function togglePublishBlog(blogId: number) {
    if (await isAdmin() === true) {
        await togglePublishBlogDB(blogId)
    }
}