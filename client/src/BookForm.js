import { React, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

function BookForm({ book, onSubmit, onChange }) {
  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    const errors = {};
    if (!book.title.trim()) {
      errors.title = "Title is required";
    }
    if (!book.author.trim()) {
      errors.author = "Author is required";
    }
    if (book.year && !/^\d{4}$/.test(book.year)) {
      errors.year = "Year must be a 4-digit number";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isInvalid={!!errors.title}>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={book.title} onChange={onChange} />
        <FormErrorMessage>{errors.title}</FormErrorMessage>
      </FormControl>
      <FormControl mt={4} isInvalid={!!errors.author}>
        <FormLabel>Author</FormLabel>
        <Input name="author" value={book.author} onChange={onChange} />
        <FormErrorMessage>{errors.author}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.year} mt={4}>
        <FormLabel>Year</FormLabel>
        <Input name="year" value={book.year} onChange={onChange} />
        <FormErrorMessage>{errors.year}</FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        {book.id ? "Update Book" : "Add new Book"}
      </Button>
    </form>
  );
}

export default BookForm;
