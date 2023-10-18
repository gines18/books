const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Incomplete information" });
  }

  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { username, password };
  users.push(newUser);
  return res.status(201).json({ message: "Added new user" });
});

// "Task 10"
async function getBookList() {
  return new Promise((resolve) => {
    resolve(books);
  });
}

public_users.get("/", async function (req, res) {
  try {
    const book = await getBookList();
    res.send(JSON.stringify(book, null, 4));
  } catch (error) {
    res.send("Access denied! Try again.");
  }
});

// Task 11
function getFromISBN(isbn) {
  let book = books[isbn];
  return new Promise((resolve, reject) => {
    if (book) {
      resolve(book);
    } else {
      reject("Book not found! Try again");
    }
  });
}

public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  getFromISBN(isbn).then(
    (book) => res.send(JSON.stringify(book, null, 4)),
    (error) => res.send(error)
  );
});

// Task 12
function getFromAuthor(author){
  let output = [];
  return new Promise((resolve,reject)=>{
    for (var isbn in books) {
      let book = books[isbn];
      if (book.author === author){
        output.push(book);
      }
    }
    resolve(output);  
  })
}

public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  getFromAuthor(author)
  .then(
    result =>res.send(JSON.stringify(result, null, 4))
  );
});

// Task 13
function getFromTitle(title){
  let output = [];
  return new Promise((resolve,reject)=>{
    for (var isbn in books) {
      let book = books[isbn];
      if (book.title === title){
        output.push(book);
      }
    }
    resolve(output);  
  })
}

public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  getFromTitle(title)
  .then(
    result =>res.send(JSON.stringify(result, null, 4))
  );
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
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
