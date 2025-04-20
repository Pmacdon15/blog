import { UpdateButton } from "../update-button";

export function TitleSection({ addSection, isPending, isError }: { addSection: ({ formData }: { formData: FormData }) => void, isPending: boolean, isError: boolean }) {


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        addSection({ formData });
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
            {isError && <p>Error adding section </p>}
        </form >
    );
}