'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Section } from '@/types/types';
import { useGetSections } from '@/hooks/hooks';

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

export default function BlogPage() {
    const { data } = useGetSections();
    console.log('BlogPage data:', data);

    if (data) {
        console.log('Data type check:', Array.isArray(data) ? 'Array' : typeof data);
        if (Array.isArray(data) && data.length > 0) {
          console.log('First item structure:', data[0]);
          console.log('Has section_type_id:', 'section_type_id' in data[0]);
          console.log('Has title_section_title:', 'title_section_title' in data[0]);
        }
      } else {
        console.log('Data is undefined or null');
      }

    return (
        <div className="flex flex-col justify-center min-h-screen items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-4 p-4 justify-center items-center w-full md:w-4/6">
                {data?.map((section, index) => {
                    switch (section.section_type_id) {
                        case 1:
                            return (
                                <div key={index}>
                                    <h1 className="text-5xl text-center">{section.title_section_title}</h1>
                                    Published on {section.publish_date ? new Date(section.publish_date).toLocaleDateString() : 'N/A'}
                                </div>
                            );
                        case 2:
                            return (
                                <Image
                                    className="w-36 h-auto"
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