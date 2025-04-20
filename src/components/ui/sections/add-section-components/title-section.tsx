import { useAddBlog } from "@/mutations/mutations";
import { UpdateButton } from "../update-button";

export function TitleSection() {
    const { mutate, isPending, error } = useAddBlog();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        mutate({ formData });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] " >
            <input
                type='text'
                name='title'
                placeholder="Title"
                className="text-5xl text-center border rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            />         
            <UpdateButton actionString="Add Section" disabled={isPending} />
            {isPending && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </form >
    );
}