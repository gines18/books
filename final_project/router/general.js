const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.json(books)
  return res.status(300).json({message: "Yet to be implemented"});
});
// Get book details based on isbn
public_users.get('/isbn/:isbn', (req, res) => {
  const isbn = parseInt(req.params.isbn, 10);
  const book = books.find((b) => b.isbn === isbn);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

  // Get all books based on author
public_users.get('/author/:author', (req, res) => {
  const authorName = req.params.author;
  const matchingBooks = books.filter((book) => book.author === authorName);

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "Author not found" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const titleName = req.params.title;
  const matchingBooks = books.filter((book) => book.title === titleName);

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "Title not found" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = parseInt(req.params.isbn, 10);
  const book = books.find((b) => b.isbn === isbn);

  if (book) {
    const reviews = book.reviews;

    if (Object.keys(reviews).length > 0) {
      res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: "No reviews found for this book" });
    }
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
