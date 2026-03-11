-- Insert into Blog table
INSERT INTO Blog (published)
VALUES 
    (true),
    (true),
    (true),
    (true),
    (true),
    (true),
    (true),
    (true),
    (true),
    (true);

-- Let's assume the IDs are 2, 3, 4, 5, 6, 7, 8, 9, 10, 11

-- Insert into Section table
INSERT INTO Section (blog_id, type)
VALUES 
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 1),
    (8, 1),
    (9, 1),
    (10, 1),
    (11, 1);

-- Let's assume the IDs are 18, 19, 20, 21, 22, 23, 24, 25, 26, 27

-- Insert into TitleSection table
INSERT INTO TitleSection (id, title, publish_date)
VALUES 
    (18, 'New Blog 1', '2025-04-16'),
    (19, 'New Blog 2', '2025-04-17'),
    (20, 'New Blog 3', '2025-04-18'),
    (21, 'New Blog 4', '2025-04-19'),
    (22, 'New Blog 5', '2025-04-20'),
    (23, 'New Blog 6', '2025-04-21'),
    (24, 'New Blog 7', '2025-04-22'),
    (25, 'New Blog 8', '2025-04-23'),
    (26, 'New Blog 9', '2025-04-24'),
    (27, 'New Blog 10', '2025-04-25');