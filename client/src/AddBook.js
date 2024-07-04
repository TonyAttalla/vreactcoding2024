// AddBook.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Flex, Center } from "@chakra-ui/react";
import BookForm from "./BookForm";

function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", year: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/books", book);
      navigate("/");
    } catch (err) {
      setError("An error occurred while adding the book");
    }
  };

  if (error) return <Box color="red">{error}</Box>;

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Center>
        <Box width="500px" margin="auto" mt={8}>
          <Heading mb={4}>Add New Book</Heading>
          <BookForm
            book={book}
            onSubmit={handleSubmit}
            onChange={handleChange}
          />
        </Box>
      </Center>
    </Flex>
  );
}

export default AddBook;
