// BookForm.js
import React from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

function BookForm({ book, onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={book.title} onChange={onChange} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Author</FormLabel>
        <Input name="author" value={book.author} onChange={onChange} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Year</FormLabel>
        <Input name="year" value={book.year} onChange={onChange} />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit">
        {book.id ? "Update Book" : "Add new Book"}
      </Button>
    </form>
  );
}

export default BookForm;
