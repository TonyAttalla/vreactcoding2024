import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function EditBook() {
  const [book, setBook] = useState({ title: "", author: "", year: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("IN USEFFECT");
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching the book");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/books/${id}`, book);
      navigate("/");
    } catch (err) {
      setError("An error occurred while updating the book");
    }
  };

  if (loading) return <Box>Loading</Box>;
  else if (error) return <Box color="red.500">{error}</Box>;

  return (
    <Box maxWidth="500px" margin="auto" mt={8}>
      <VStack spacing={4} align="stretch">
        <Heading>Edit Book</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={book.title} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Author</FormLabel>
            <Input name="author" value={book.author} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Year</FormLabel>
            <Input name="year" value={book.year} onChange={handleChange} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Update Book
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default EditBook;
