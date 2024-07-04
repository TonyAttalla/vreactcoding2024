import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteBookModal from "./DeleteBookModal";
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState();

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
    } catch (err) {
      setError("An error occurred while fetching the book");
    }
    fetchBooks();
  };
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
      <SimpleGrid columns={[1, 2]} width={800} spacing={6} padding={2}>
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
              <Flex justifyContent={"space-between"} width={"100%"}>
                <Link to={`/edit/${book.id}`}>
                  <Button colorScheme="teal" size="sm">
                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={() => {
                    setBookIdToDelete(book.id);
                    setDeleteModalOpen(true);
                  }}
                  colorScheme="red"
                  size="sm"
                >
                  Delete
                </Button>
              </Flex>
            </VStack>
          </Box>
        ))}
        <Link to={`/add`}>
          <Button colorScheme="teal" size="sm">
            Add a Book
          </Button>
        </Link>
      </SimpleGrid>

      <DeleteBookModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
        }}
        onConfirm={() => {
          deleteBook(bookIdToDelete);
          setDeleteModalOpen(false);
        }}
      ></DeleteBookModal>
    </Center>
  );
}

export default BookList;
