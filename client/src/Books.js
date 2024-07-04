import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Heading,
  Badge,
  Button,
  Center,
  Flex,
} from "@chakra-ui/react";

import "./App.css";
function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      setError("An error occurred while fetching books");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Center>
      <SimpleGrid width={500} spacing={6} padding={2}>
        {books.map((book) => (
          <Box
            key={book.id}
            borderWidth="2px"
            borderColor={"teal"}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            padding={4}
          >
            <VStack align="start" spacing={2}>
              <Heading size="md">{book.title}</Heading>
              <Text fontSize="sm" color="gray">
                {book.author}
              </Text>
              {book.year && <Badge colorScheme="blue">{book.year}</Badge>}

              <Link to={`/edit/${book.id}`}>
                <Button colorScheme="teal" size="sm">
                  Edit
                </Button>
              </Link>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
}

export default BookList;
