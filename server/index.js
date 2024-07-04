const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const port = 8080;

let books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genre: "Classic",
    id: 1,
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brone",
    year: 1847,
    genre: "Classic",
    id: 2,
  },
  {
    title: "The Great Gatsby",
    author: "Scott Fitzgerald",
    year: 1925,
    genre: "Classic",
    id: 3,
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: "Classic",
    id: 4,
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    genre: "Classic",
    id: 5,
  },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = { ...books[index], ...req.body, id };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.delete("/books/:id", (req, res) => {
  console.log(" IN SERVER");
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

app.post("/books", (req, res) => {
  const newBook = {
    id: nextId++,
    ...req.body,
  };
  books.push(newBook);
  res.status(200).json(newBook);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
