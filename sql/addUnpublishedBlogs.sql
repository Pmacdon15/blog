-- Insert into Blog table
INSERT INTO Blog (id, published) VALUES 
    (4, false), 
    (5, false), 
    (6, false);

-- Insert into Section table
INSERT INTO Section (id, blog_id, type)
VALUES 
    (20, 4, 1),
    (21, 5, 1),
    (22, 6, 1);

-- Insert into TitleSection table
INSERT INTO TitleSection (id, title, publish_date)
VALUES 
    (20, 'Unpublished Blog 1', '2025-04-11'),
    (21, 'Unpublished Blog 2', '2025-04-12'),
    (22, 'Unpublished Blog 3', '2025-04-13');