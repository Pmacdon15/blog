import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Section } from '@/types/types';


const blogPostSections: Section[] = [
    {
        id: 1,
        type: 1,
        title: 'Tankstack useQuery paganation',
        publishDate: '2025-04-08',
    },
    {
        id: 2,
        type: 2,
        src: '/tanstack.png',
        alt: 'Tanstack Logo',
        width: 24,
    },
    {
        id: 3,
        type: 3,
        title: 'Introduction',
        text: `
                    I was dealing with paganation and useQuery. It seemed really simple at first, but then I ran in to some issues. 
                    I had my code set up exactly as shown in the examples. I was missing one key thing, that didnt come to mind at first...... 
                    what does the sever side code look like and act? I simply used the code for the hook, using page and limit in the search query param of the API route.
                `,
    },
    {
        id: 4,
        type: 3,
        text: `So I did the one thing devolpers hate doing lol RTFM(Reading the fucking manual). It was very usefule there was alot of good info in there, what I learned is .... 
            '[Rendering paginated data is a very common UI pattern and in TanStack Query, it "just works" by including the page information in the query key](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)'.`,
    },
    {
        id: 5,
        type: 4,
        language: 'typescript',
        code: `const result = useQuery({
  queryKey: ['projects', page],
  queryFn: fetchProjects,})
}`,
    },
    {
        id: 6,
        type: 3,
        text: `What I read was that althought this "just works" it is not optimal as it causes the UI to jump in and out of success and pending states becuase each page is treated like a new query.
            You can achieve better paginated queries with using placeholder data and setting it as keep previous data, This prevents the default behavior and The 
            '[data from the last successful fetch is available while new data is being requested, even though the query key has changed](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)'.
            This can simple be achieved with simple code:`,

    },
    {
        id: 7,
        type: 4,
        language: 'typescript',
        code: `const { isPending, isError, error, data, isFetching, isPlaceholderData } =
useQuery({
    queryKey: ['projects', page],
    queryFn: () => fetchProjects(page),
    placeholderData: keepPreviousData,
})`,
    },
    {
        id: 8,
        type: 3,
        title: 'Search Queries',
        text: `
                   From the videos I have watched online one would think that its as adding the search param page and limit. It wasn't lol!
                `,
    },
    {
        id: 10,
        type: 4,
        language: 'typescript',
        code: `const fetchPastTrips = async ({ driverEmail, page }: { driverEmail: string, page: number }) => {
    const response = await fetch(\`/api/pastTrips/\${driverEmail}?page=\${page}&limit=\${<limitValue>}\`);
    return await response.json();
}`,
    },
    {
        id: 11,
        type: 3,
        text: `
                I wasted way more time then I would like to admit using old API routes and added search queries to the URL. I think admiting when you spent to much time on something simple is important. 
                Noone is great and at everything, we've all had those moments where things have went way to smooth and you felt like a programing god, but atleast for me those are not the norm and I think
                more people need to hear that.
            `,
    },
    {
        id: 12,
        type: 3,
        title: 'The next place to look',
        text: `
            At this point it was 11:00pm and I needed to get ready for bed, and as I was brushing my teeth it hit me like a brick wall. How could I not have seen it, what 
            did everyone on youtube have in common that wasnt mentioned? The their backend must have been set up to handle the information in the search params, lol it's 
            not some magic, I just missed it becuase it was so obvious no one had mentioned it. I forgot for a moment, in programing you have the tell the computer what to do, it doesnt just happen.
            `,
    },
    {
        id: 13,
        type: 3,
        text: `
            From there it was fairly simple, get the search params from the url and update the SQL. I know very funny using sql instead of an ORM, it's on my list of things to learn.
            So first lets get the value from the URL this is how I did it in NextJs:     
        `
    },
    {
        id: 14,
        type: 4,
        language: 'typescript',
        code: `import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  
  const url = request.nextUrl;
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 4; `,
    },
    {
        id: 13,
        type: 3,
        title: 'The SQL',
        text: `
            I'll admit SQL is not my strong side and I am quick to use the LLM magic to achieve a quick out come. But that doesnt mean we can't also learn from what it produced.
            Let's go a head and look at the SQL I ended up going with:
        `
    },
    {
        id: 14,
        type: 4,
        language: 'typescript',
        code: `const offset = (page - 1) * limit;  
const result = await sql\`
    SELECT *
    FROM PTTrips
    WHERE driverEmail = \${uriDecodedDriverEmail}
    ORDER BY date DESC
    LIMIT \${limit}
    OFFSET \${offset}
\`;`,
    },
    {
        id: 15,
        type: 3,
        title: 'What I learnt',
        text: `
            LIMIT and OFFSET are SQL tools that help control how much data is shown at a time. LIMIT sets the number of items to show, like 10 or 20, and 
            OFFSET decides where to start showing them, like starting from the first item or the 11th item. This helps with pagination, making it easier to 
            navigate through large amounts of data by breaking it down into smaller, more manageable chunks.
        `
    },
    {
        id: 16,
        type: 3,
        title: 'Biggest take away',
        text: `
          Even if you read the documentation and watch videos, if it seems like magic, it's because there's a gap in your understanding. With patience and persistence, 
          you can bridge this gap and develop a deeper understanding of the subject.
           Keep an open mind, ask questions, and seek out additional resources until the concepts click into place
        `
    },

];

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

    return (
        <div className="flex flex-col justify-center items-center mt-8 pb-20 font-[family-name:var(--font-geist-sans)]">

            <div className='flex flex-col gap-4 p-4 justify-center items-center w-full md:w-4/6'>
                {blogPostSections.map((section, index) => {
                    switch (section.type) {
                        case 1:
                            return (
                                <div key={index}>
                                    <h1 className="text-5xl text-center">{section.title}</h1>
                                    <p className='text-center md:text-left'>Published on {section.publishDate}</p>
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
                            return (
                                <Paragraph key={index} section={section} />
                            );
                        case 4:
                            return (
                                <div key={index} className='w-full'>
                                    <SyntaxHighlighter className='min-w-3/6 max-w-fit' language={section.language} style={nightOwl} showLineNumbers>
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
    if (section.type === 3) {
        return (
            <div className="w-full text-center md:text-left">
                {section.title && <h1 className="text-4xl my-4 ">{section.title}</h1>}
                <p className="indent-8">
                    {renderTextWithLinks(section.text || '')}
                </p>
            </div>
        );
    }
}