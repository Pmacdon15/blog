'use client'
import { useAddBlog } from "@/lib/mutations/mutations";

export default function AddBlogForm() {

    const { mutate, isPending, isError } = useAddBlog();
    return (
        <form
            className=" rounded-sm shadow-xl border p-1 w-full lg:w-4/6 sm:w-5/6 bg-white/60"
            action={mutate}
        >
            <div className="flex flex-col gap-4  items-center bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] p-2 shadow-lg">
                <input
                    type='text'
                    name='title'
                    placeholder="Title"
                    className="text-5xl text-center w-full md:w-5/6 border rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
                    required
                />
                <button className="hover:cursor-pointer border p-2 rounded-sm " disabled={isPending}>Add Blog</button>
                {isError && <h1 className="bold text-red-600"> There was an error creating a blog</h1>}
            </div>
        </form>
    );
};