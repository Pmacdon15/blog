'use client'
import { useAddBlog } from "@/mutations/mutations";

export default function AddBlogForm() {

    const { mutate } = useAddBlog();
    return (
        <form
            className="flex flex-col justify-center items-center gap-4 rounded-sm shadow-xl border p-4 w-full lg:w-4/6 sm:w-5/6"
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                mutate({ formData });
                event.currentTarget.reset();
            }}
        >
            <input
                type='text'
                name='title'
                placeholder="Title"
                className="text-5xl text-center w-full md:w-5/6 border rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
                required
            />
            <button>Add Blog</button>
        </form>
    );
};