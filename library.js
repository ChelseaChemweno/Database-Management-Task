const express = require("express");
const mysql = require("mysql");
const app = express(); // Create an instance of Express

const myConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "librarysystem",
});

// Test the connection
myConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});
//SQL Query
//Created table Authors
myConnection.query(
  "CREATE TABLE IF NOT EXISTS Authors( Author_id INT  AUTO_INCREMENT,  First_name VARCHAR(50),Last_name VARCHAR(50),PRIMARY KEY (Author_ID))",
  (sqlerror) => {
    if (sqlerror) {
      console.log(sqlerror);
    } else {
      console.log("Table Authors Created");
    }
  }
);
//Created table Books
myConnection.query(
  "CREATE TABLE IF NOT EXISTS Books( Book_id INT AUTO_INCREMENT, Title VARCHAR(255),Publication_year INT,PRIMARY KEY (Book_id))",
  (sqlerror) => {
    if (sqlerror) {
      console.log(sqlerror);
    } else {
      console.log("Table Books Created");
    }
  }
);

//Created table Book_Authors
myConnection.query(
  "CREATE TABLE IF NOT EXISTS Book_Authors (Book_id INT, Author_id INT,PRIMARY KEY (Book_id, Author_id), FOREIGN KEY (Author_id) REFERENCES Authors(Author_id),FOREIGN KEY (Book_id) REFERENCES Books(Book_id))",
  (sqlerror) => {
    if (sqlerror) {
      console.log(sqlerror);
    } else {
      console.log("Table Book_Authors Created");
    }
  }
);
//Putining in the values
const authors = [
  { first_name: "J.R.R", last_name: "Tolkien" },
  { first_name: "Margaret", last_name: "Atwood" },
  { first_name: "Isaac", last_name: "Asimov" },
];

// Construct the SQL query
const sql = `INSERT INTO Authors (first_name, last_name) VALUES ?`;

// Execute the query with the authors data
myConnection.query(
  sql,
  [authors.map((author) => [author.first_name, author.last_name])],
  (sqlerror) => {
    if (sqlerror) {
      console.log(sqlerror);
    } else {
      console.log("Values inserted in the Author table");
    }
  }
);

//Inserting values into the table books
const books = [
  { Title: "The Lord of the Rings", Publication_year: "1954" },
  { Title: "The handmaids Tale", Publication_year: "1985" },
  { Title: "Foundation", Publication_year: "1951" },
];

// Construct the SQL query
const bookssql = "INSERT INTO Books(Title, Publication_year) VALUES ?";

// Execute the query with the books data
myConnection.query(
  bookssql,
  [books.map((book) => [book.Title, book.Publication_year])],
  function (err, result) {
    if (err) {
      console.error("Error inserting books:", err);
      return;
    }
    console.log("Books inserted successfully");
  }
);
//Inserting into the Books_Author table
const bookAuthors = [
  { Book_id: 2, Author_id: 1 },
  { Book_id: 1, Author_id: 2 },
  { Book_id: 2, Author_id: 2 },
  { Book_id: 3, Author_id: 3 },
];

// Construct the SQL query
const bookAuthorsSql = "INSERT INTO Book_Authors (Book_id, Author_id) VALUES ?";

// Execute the query with the book author data
myConnection.query(
  bookAuthorsSql,
  [bookAuthors.map((relation) => [relation.Book_id, relation.Author_id])],
  function (err, result) {
    if (err) {
      console.error("Error inserting book authors:", err);
      return;
    }
    console.log("Book authors inserted successfully");
  }
);
// Start the server
app.listen(5000, () => console.log("Server is running on port 5000"));
