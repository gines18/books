# Library App with Local User Authentication

This project is a Library App with user authentication, built using Express.js for the server and Postman for API testing. It allows users to manage and interact with a library of books after authenticating with local user credentials.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Registration and Authentication with local credentials (username and password)
- Get the book list available in the shop
- Get book details based on isbn
- Get all books based on author
- Get all books based on title
- Get book review

## Prerequisites

Before you start, make sure you have the following:

- Node.js and npm installed on your system.

## Getting Started

1. Clone the repository to your local machine:

   - git clone <repository-url>
   - cd books
   - open .
     
  Open IDE (VScode) press (Control + ` ) to open Terminal then enter: 
   npm install, prees Enter, wait for all depemdemcies to be installed.
Enter npm start  -  to start the server 
The server should now be running at http://localhost:5008

API Endpoints
Testing with Postman
Get all books: GET http://localhost:5008

List of users: GET http://localhost:5008/users

Add new user POST http://localhost:5008/register

User login: POST http://localhost:5008/customer/login

Get a book based on isbn number GET http://localhost:5008/isbn/2

Get a book based on author name GET http://localhost:5008/author/Unknown

Get a book based on title name GET http://localhost:5008/title/The Book Of Job

Get a book review based on isbn number GET http://localhost:5008/review/isbn

## Contributing
Feel free to contribute to this project by submitting issues or pull requests. Please adhere to the code of conduct.

## License
This project is licensed under the MIT License
