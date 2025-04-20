import { UpdateButton } from "../update-button";

export default function ParagraphSection({ isPending, isError }: {
    isPending: boolean,
    isError: boolean
}) {
    return (
        <div className="flex flex-col w-full text-center md:text-left  gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <input
                type='text'
                name='title'
                placeholder="Title"
                className="text-4xl border rounded-sm p-2">
            </input>
            <textarea
                className="indent-8 min-h-36 border p-4 rounded-sm "
                name="text"
                required
            />
            <UpdateButton actionString="Add Section" disabled={isPending} />
            {isPending && <p>Loading...</p>}
            {isError && <p className="text-red-600">Error adding section </p>}
        </div>
    );
};