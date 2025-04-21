import { UpdateButton } from "../../buttons/update-button";

export default function CodeSection({ isPending, isError }: {
    isPending: boolean,
    isError: boolean
}) {
    return (
        <div className="flex flex-col w-full text-center md:text-left  gap-4 border p-4 rounded-sm bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))]">
            <input
                type='text'
                name='language'
                placeholder="Language"
                className="text-4xl border rounded-sm p-2"
                required
            />
            <textarea
                className="min-h-36 border p-4 rounded-sm "
                name="code"
                required
            />
            <UpdateButton actionString="Add Section" disabled={isPending} />
            {isPending && <p>Loading...</p>}
            {isError && <p className="text-red-600">Error adding section </p>}
        </div>
    );
};