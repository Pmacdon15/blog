-- Insert into Blog table
INSERT INTO
    Blog (published)
VALUES (false),
    (false),
    (false),
    (false),
    (false),
    (false),
    (false);

-- Insert into Section table
INSERT INTO
    Section (blog_id, type)
VALUES (11, 1),
    (12, 1),
    (13, 1),
    (14, 1),
    (15, 1),
    (16, 1),
    (17, 1);

-- Insert into TitleSection table
INSERT INTO
    TitleSection (id, title, publish_date)
VALUES (
        28,
        'Unpublished Blog 1',
        '2025-04-11'
    ),
    (
        29,
        'Unpublished Blog 2',
        '2025-04-12'
    ),
    (
        30,
        'Unpublished Blog 3',
        '2025-04-13'
    ),
    (
        31,
        'Unpublished Blog 4',
        '2025-04-14'
    ),
    (
        32,
        'Unpublished Blog 5',
        '2025-04-15'
    ),
    (
        33,
        'Unpublished Blog 6',
        '2025-04-16'
    ),
    (
        34,
        'Unpublished Blog 7',
        '2025-04-17'
    );