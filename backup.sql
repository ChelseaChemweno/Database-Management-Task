/* Authors table (Author_id,First_name,last_name,)
Books Table(book_id,title,publiction_year)
Book_Authors (This is a mnay to mant relationship table)
BookAuthors Table (book_id,author_id)
N/B(book_is(INT , FOREIGN KEY) references Books.book_id)-Connects to the book author_id(INT FOREIGN KEY references authors_id)
-connects to the author PRIMARY KEY(book_id,author_id)
Both book_id and author_id together uniquely identify a record in the database
Task 
1. Create three tables mentioned above with their respective columns and data type 
2.Implement the primary key and foreign key as mentioned above 
3.Insert the data in the tables 
4.Write a query to retrieve all the books along with their corresponding authors (USE JOIN operation)
*/
/* Creating the three tables */
CREATE TABLE Authors (
    Author_id INT AUTO_INCREMENT PRIMARY KEY,
    First_name VARCHAR(50),
    Last_name VARCHAR(50)
);
CREATE TABLE Books (
    Book_id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255),
    Publication_year INT
);
/*Inserting Values into the three table*/
CREATE TABLE Book_Authors (
    Book_id INT,
    Author_id INT,
    PRIMARY KEY (Book_id, Author_id),
    FOREIGN KEY (Book_id) REFERENCES Books(Book_id),
    FOREIGN KEY (Author_id) REFERENCES Authors(Author_id)
);
INSERT INTO Authors (First_name, Last_name) VALUES
('J.R.R','Tolkein'),
('Margret','Atwood'),
('Issac','Asimov'),

INSERT INTO Books (Title, Publication_year) VALUES

('The Lord of the Rings', 1954),
('The handmaids Tale',1985),
('Foundation',1951),

INSERT INTO Book_Authors (Book_id, Author_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3);

/*Query to retrieve  all the books along with their corresponding authors */
SELECT 
    Books.Title AS Book_Title,
    Books.Publication_year AS Publication_Year,
    CONCAT(Authors.First_name, ' ', Authors.Last_name) AS Author_Name
FROM 
    Books
JOIN 
    Book_Authors ON Books.Book_id = Book_Authors.Book_id
JOIN 
    Authors ON Book_Authors.Author_id = Authors.Author_id;
