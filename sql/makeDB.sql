DROP TABLE IF EXISTS CodeSection;

DROP TABLE IF EXISTS ParagraphSection;

DROP TABLE IF EXISTS ImageSection;

DROP TABLE IF EXISTS TitleSection;

DROP TABLE IF EXISTS Section;

DROP TABLE IF EXISTS Blog;

CREATE TABLE Blog (
    id SERIAL PRIMARY KEY,
    published BOOLEAN NOT NULL
);

CREATE TABLE Section (
    id SERIAL PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    type INTEGER NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES Blog (id) ON DELETE CASCADE
);

CREATE TABLE TitleSection (
    id INTEGER PRIMARY KEY REFERENCES Section (id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    publish_date DATE NOT NULL
);

CREATE TABLE ImageSection (
    id INTEGER PRIMARY KEY REFERENCES Section (id) ON DELETE CASCADE,
    src VARCHAR(200) NOT NULL,
    alt VARCHAR(100) NOT NULL,
    width INTEGER NOT NULL
);

CREATE TABLE ParagraphSection (
    id INTEGER PRIMARY KEY REFERENCES Section (id) ON DELETE CASCADE,
    title VARCHAR(100),
    text TEXT NOT NULL
);

CREATE TABLE CodeSection (
    id INTEGER PRIMARY KEY REFERENCES Section (id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL,
    code TEXT NOT NULL
);

-- Insert into Blog table
INSERT INTO Blog (published) VALUES (true);

-- Insert into Section table
INSERT INTO
    Section (blog_id, type)
VALUES (1, 1),
    (1, 2),
    (1, 3),
    (1, 3),
    (1, 4),
    (1, 3),
    (1, 4),
    (1, 3),
    (1, 4),
    (1, 3),
    (1, 3),
    (1, 3),
    (1, 3),
    (1, 4),
    (1, 3),
    (1, 4),
    (1, 3);

-- Insert into TitleSection table
INSERT INTO
    TitleSection (id, title, publish_date)
VALUES (
        1,
        'Tankstack useQuery paganation',
        '2025-04-08'
    );

-- Insert into ImageSection table
INSERT INTO
    ImageSection (id, src, alt, width)
VALUES (
        2,
        'https://yiteg94znhby2sle.public.blob.vercel-storage.com/tanstack-tTDLn3wLKj7OlaWvL9BicFgre6g6oJ.png',
        'Tanstack Logo',
        136
    );

-- Insert into ParagraphSection table
INSERT INTO
    ParagraphSection (id, title, text)
VALUES (
        3,
        'Introduction',
        '
        I was dealing with pagination and useQuery. It seemed really simple at first, but then I ran in to some issues. 
        I had my code set up exactly as shown in the examples. I was missing one key thing, that didnt come to mind at first...... 
        what does the sever side code look like and act? I simply used the code for the hook, using page and limit in the search query param of the API route.
    '
    ),
    (
        4,
        NULL,
        '
        So I did the one thing developers hate doing lol RTFM(Reading the manual). It was very useful there was a lot of good info in there, what I learned is ....' '[Rendering paginated data is a very common UI pattern and in TanStack Query, it "just works" by including the page information in the query key](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)''.
    '
    ),
    (
        6,
        NULL,
        '
        What I read was that although this "just works" it is not optimal as it causes the UI to jump in and out of success and pending states because each page is treated like a new query.
        You can achieve better paginated queries with using placeholder data and setting it as keep previous data, This prevents the default behavior and The 
        ''[data from the last successful fetch is available while new data is being requested, even though the query key has changed](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries)''.
        This can simple be achieved with simple code:
    '
    ),
    (
        8,
        'Search Queries',
        '
        From the videos I have watched online one would think that it''s as adding the search param page and limit. It wasn''t lol!
    '
    ),
    (
        10,
        NULL,
        '
        I wasted way more time then I would like to admit using old API routes and added search queries to the URL. I think admitting when you spent too much time on something simple is important. 
        No one is great at everything, we''ve all had those moments where things have went way too smooth and you felt like a programming god, but at least for me those are not the norm and I think
        more people need to hear that.
    '
    ),
    (
        11,
        'The next place to look',
        '
        At this point it was 11:00pm and I needed to get ready for bed, and as I was brushing my teeth it hit me like a brick wall. How could I not have seen it, what 
        did everyone on youtube have in common that wasnt mentioned? The their backend must have been set up to handle the information in the search params, lol it''s 
        not some magic, I just missed it becuase it was so obvious no one had mentioned it. I forgot for a moment, in programing you have the tell the computer what to do, it doesnt just happen.
    '
    ),
    (
        12,
        NULL,
        '
        From there it was fairly simple, get the search params from the url and update the SQL. I know very funny using sql instead of an ORM, it''s on my list of things to learn.
        So first lets get the value from the URL this is how I did it in NextJs:     
    '
    ),
    (
        13,
        'The SQL',
        '
        I''ll admit SQL is not my strong side and I am quick to use the LLM magic to achieve a quick out come. But that doesnt mean we can''t also learn from what it produced.
        Let''s go a head and look at the SQL I ended up going with:
    '
    ),
    (
        15,
        'What I learnt',
        '
        LIMIT and OFFSET are SQL tools that help control how much data is shown at a time. LIMIT sets the number of items to show, like 10 or 20, and 
        OFFSET decides where to start showing them, like starting from the first item or the 11th item. This helps with pagination, making it easier to 
        navigate through large amounts of data by breaking it down into smaller, more manageable chunks.
    '
    ),
    (
        17,
        'Biggest take away',
        '
        Even if you read the documentation and watch videos, if it seems like magic, it''s because there''s a gap in your understanding. With patience and persistence, 
        you can bridge this gap and develop a deeper understanding of the subject.
        Keep an open mind, ask questions, and seek out additional resources until the concepts click into place
    '
    );

-- Insert into CodeSection table
INSERT INTO
    CodeSection (id, language, code)
VALUES (
        5,
        'typescript',
        'const result = useQuery({
    queryKey: [''projects'', page],
    queryFn: fetchProjects,
})'
    ),
    (
        7,
        'typescript',
        'const { isPending, isError, error, data, isFetching, isPlaceholderData } =
    useQuery({
        queryKey: [''projects'', page],
        queryFn: () => fetchProjects(page),
        placeholderData: keepPreviousData,
    })'
    ),
    (
        9,
        'typescript',
        'const fetchPastTrips = async ({ driverEmail, page }: { driverEmail: string, page: number }) => {
    const response = await fetch(`/api/pastTrips/${driverEmail}?page=${page}&limit=${<limitValue>}`);
    return await response.json();
}'
    ),
    (
        14,
        'typescript',
        'import { NextRequest, NextResponse } from ''next/server'';

export async function GET(request: NextRequest) {
    
    const url = request.nextUrl;
    const page = Number(url.searchParams.get(''page'')) || 1;
    const limit = Number(url.searchParams.get(''limit'')) || 4;'
    ),
    (
        16,
        'sql',
        'const offset = (page - 1) * limit;  
const result = await sql`
    SELECT *
    FROM PTTrips
    WHERE driverEmail = ${uriDecodedDriverEmail}
    ORDER BY date DESC
    LIMIT ${limit}
    OFFSET ${offset}`;'
    );

-- SELECT * FROM blog;

-- SELECT * FROM imageSection