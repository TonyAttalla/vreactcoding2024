import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import BookList from "./Books";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditBook from "./EditBook";
import AddBook from "./AddBook";
import theme from "./theme";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<AddBook />} />
          <Route path="/" element={<BookList />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
