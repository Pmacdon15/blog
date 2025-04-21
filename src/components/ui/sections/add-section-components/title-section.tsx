import { UpdateButton } from "../../buttons/update-button";

export function TitleSection({ isPending, isError }: {
    isPending: boolean,
    isError: boolean
}) {
    return (
        <div
            className="flex flex-col gap-4 border p-4 w-full rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] " >
            <input
                type='text'
                name='title'
                placeholder="Title"
                className="text-5xl text-center border rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]"
            />
            <UpdateButton actionString="Add Section" disabled={isPending} />
            {isPending && <p>Loading...</p>}
            {isError && <p className="text-red-600">Error adding section </p>}
        </div>
    );
}