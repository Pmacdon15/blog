import Link from 'next/link';
import React from 'react';

export default function GoHomeLink() {
    return (
        <Link
            href="/"
            className="bg-[linear-gradient(to_bottom_right,var(--primary),var(--secondary))] border p-2 rounded-sm mx-auto hover:bg-black hover:scale-110 transition-transform duration-300"
        >
            Return Home
        </Link>
    );
}
