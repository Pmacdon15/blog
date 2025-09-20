import Link from "next/link";

export default function BackHomeLink() {
    return (
        <Link
            href="/"
            className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
        >Back Home
        </Link>
    );
}