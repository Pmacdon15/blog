-- Insert into Blog table
INSERT INTO Blog (id, published) VALUES (2, true), (3, true);

-- Insert into Section table
INSERT INTO Section (id, blog_id, type)
VALUES 
    (18, 2, 1),
    (19, 3, 1);

-- Insert into TitleSection table
INSERT INTO TitleSection (id, title, publish_date)
VALUES 
    (18, 'React Hooks', '2025-04-09'),
    (19, 'State Management in React', '2025-04-10');


    SELECT * FROM blog;