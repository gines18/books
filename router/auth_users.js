const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const crypto = require('crypto');

let users = [
  {
    "username": "John",
    "password": "John1"
  }
];

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
}
const secretKey = generateSecretKey();

//only registered users can login
const isValid = (username) => {
  return users.some(user => user.username === username);
}

const authenticatedUser = (username, password)=>{ //returns boolean
  return users.some(user => user.username === username && user.password === password);
}

regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!isValid(username, password)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, secretKey);

  return res.status(200).json({ token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
