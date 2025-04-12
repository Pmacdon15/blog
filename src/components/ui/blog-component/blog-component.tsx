'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Section } from '@/types/types';

const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts = text.split(linkRegex);

    return parts.map((part, index) => {
        if (index % 3 === 0) {
            return <React.Fragment key={index}>{part}</React.Fragment>;
        } else if (index % 3 === 1) {
            const linkText = part;
            const linkUrl = parts[index + 1];
            return (
                <Link key={index} href={linkUrl} className="underline">
                    {linkText}
                </Link>
            );
        }
        return null;
    });
};

export default function BlogComponent({ data }: { data: Section[] | undefined }) {

    return (
        <div className="flex flex-col gap-4 p-4 justify-center items-center w-full md:w-4/6">
            {data?.map((section, index) => {
                console.log(section.width)
                switch (section.section_type_id) {
                    case 1:
                        return (
                            <div key={index}>
                                <h1 className="text-5xl text-center">{section.title_section_title}</h1>
                                <p className='text-center md:text-start'>Published on {section.publish_date ? new Date(section.publish_date).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        );
                    case 2:
                        return (
                            <Image
                                className={`w-[${section.width}px] h-auto`}
                                key={index}
                                src={section.src || ''}
                                alt={section.alt || ''}
                                width={600}
                                height={600}
                            />
                        );
                    case 3:
                        return <Paragraph key={index} section={section} />;
                    case 4:
                        return (
                            <div key={index} className="w-full">
                                <SyntaxHighlighter
                                    className="min-w-3/6 max-w-fit"
                                    language={section.language || 'text'}
                                    style={nightOwl}
                                    showLineNumbers
                                >
                                    {section.code || ''}
                                </SyntaxHighlighter>
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}

function Paragraph({ section }: { section: Section }) {
    if (section.section_type_id === 3) {
        return (
            <div className="w-full text-center md:text-left">
                {section.paragraph_title && <h1 className="text-4xl my-4">{section.paragraph_title}</h1>}
                <p className="indent-8">{renderTextWithLinks(section.text || '')}</p>
            </div>
        );
    }
    return null;
}