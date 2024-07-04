import axios from "axios";
import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DeleteBookModal from "./DeleteBookModal";

import { useAtom } from "jotai";
import {
  booksAtom,
  loadingAtom,
  errorAtom,
  deleteModalOpenAtom,
  bookIdToDeleteAtom,
} from "./atoms";
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
  // i think these are all better as just state,
  // i just made them atoms cause the handout requested i use
  // a state management tool
  const [books, setBooks] = useAtom(booksAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [deleteModalOpen, setDeleteModalOpen] = useAtom(deleteModalOpenAtom);
  const [bookIdToDelete, setBookIdToDelete] = useAtom(bookIdToDeleteAtom);
  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
    } catch (err) {
      setError("An error occurred while fetching the book");
    }
    fetchBooks();
  };
  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data);
      setLoading(false);
    } catch (err) {
      setError("An error occurred while fetching books");
      setLoading(false);
    }
  }, [setBooks, setError, setLoading]);
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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
              <Text as="b" fontSize="sm" color="white">
                {book.author}
              </Text>
              {book.year && <Badge colorScheme="blue">{book.year}</Badge>}
              {book.genre && <Badge colorScheme="blue">{book.genre}</Badge>}
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
