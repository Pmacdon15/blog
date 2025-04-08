import React from 'react';

interface Image {
    src: string;
    alt: string;
}

interface Section {
    type: 'paragraph' | 'image' | 'image-gallery';
    title?: string;
    text?: string;
    image?: Image;
    images?: Image[];
    src?: string;
    alt?: string;
}

interface BlogPost {
    id: string;
    title: string;
}

interface BlogPostSections {
    blogInfo: {
        id: string;
        title: string;
        publishDate: string;
    };
    sections: Section[];
}

const blogPostSections: BlogPostSections = {
    blogInfo: {
        id: '1',
        title: 'Blog Post Title',
        publishDate: '2022-01-01',
    },
    sections: [
        {
            type: 'paragraph',
            title: 'Optional Paragraph Title',
            text: 'This is a paragraph of text.',
        },
        {
            type: 'image',
            src: 'image-url.jpg',
            alt: 'Image alt text',
        },
        {
            type: 'paragraph',
            text: 'This is another paragraph of text without a title.',
        },
        {
            type: 'paragraph',
            title: 'Paragraph with an Image',
            text: 'This paragraph has an image.',
            image: {
                src: 'image-url.jpg',
                alt: 'Image alt text',
            },
        },
        {
            type: 'image-gallery',
            images: [
                {
                    src: 'image1-url.jpg',
                    alt: 'Image 1 alt text',
                },
                {
                    src: 'image2-url.jpg',
                    alt: 'Image 2 alt text',
                },
            ],
        },
    ],
};

export default function BlogPage() {
    return (
        <div>
            <h1>{blogPostSections.blogInfo.title}</h1>
            <p>Published on {blogPostSections.blogInfo.publishDate}</p>
            {blogPostSections.sections.map((section, index) => {
                switch (section.type) {
                    case 'paragraph':
                        return (
                            <div key={index}>
                                {section.title && <h2>{section.title}</h2>}
                                <p>{section.text}</p>
                                {section.image && (
                                    <img src={section.image.src} alt={section.image.alt} />
                                )}
                            </div>
                        );
                    case 'image':
                        return (
                            <img key={index} src={section.src} alt={section.alt} />
                        );
                    case 'image-gallery':
                        return (
                            <div key={index}>
                                {section.images?.map((image, imageIndex) => (
                                    <img key={imageIndex} src={image.src} alt={image.alt} />
                                ))}
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}