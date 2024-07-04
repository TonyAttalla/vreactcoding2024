import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BookForm from "./BookForm";
import { Box, VStack, Heading, Center, Flex } from "@chakra-ui/react";

function EditBook() {
  const [book, setBook] = useState({ title: "", author: "", year: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Center>
        <Box width="500px">
          <VStack spacing={4} align="stretch">
            <Heading>Edit Book</Heading>
            <BookForm
              book={book}
              onSubmit={handleSubmit}
              onChange={handleChange}
            />
          </VStack>
        </Box>
      </Center>
    </Flex>
  );
}

export default EditBook;
