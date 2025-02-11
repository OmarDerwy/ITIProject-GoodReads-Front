import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Loader,
  Text,
  Center,
  Pagination,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import BookCard from "../components/BookCard/BookCardAlt";
import classes from "../styles/BrowseBooks/BrowseBooks.module.css";
import axiosInstance from "../apis/config";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const res = await axiosInstance.get(
          `/api/books?page=${page}&limit=5&search=${searchTerm}`
        );
        setBooks(res.data.array);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to fetch books."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setPage(1); // Reset page to 1 on search
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <Loader type="bars" color="lightgreen" size={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <Text fw={900} fz="3rem" color="red">
          Error Loading Content.
        </Text>
        <Text fz="3rem" color="red">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <Container px="md" className={classes.browseBooksContainer}>
      <Center style={{ display: "flex", gap: "10px", marginTop: "50px" }}>
        <TextInput
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearch();
          }}
          mr={10}
          styles={{
            input: {
              height: "60px",
              width: "800px",
              minWidth: "50%",
              borderRadius: "35px",
              border: "1px solid lightgrey",
              padding: "20px",
              backgroundColor: "lightgrey",
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "900",
              borderRadius: "5px",
            },
          }}
        />

        <ActionIcon
          h={60}
          w={60}
          variant="gradient"
          gradient={{ from: "green", to: "lightgreen" }}
          onClick={handleSearch}
          title="Search"
        >
          <CiSearch size="1.5rem" />
        </ActionIcon>
      </Center>

      <Center>
        <Grid
          cols={5}
          spacing="lg"
          mt="xl"
          breakpoints={[
            { maxWidth: 1200, cols: 3 },
            { maxWidth: 992, cols: 2 },
            { maxWidth: 768, cols: 1 },
          ]}
        >
          {books.length > 0 ? (
            books.map((book) => (
              <Grid.Col key={book._id} span="auto">
                <BookCard
                  book={{
                    id: book._id,
                    title: book.bookName,
                    author: book.authorName,
                    rating: book.averageRating,
                    views: book.ratings,
                    coverImage: book.coverImage,
                    category: book.categoryName,
                  }}
                />
              </Grid.Col>
            ))
          ) : (
            <Text fz="xl" mt="lg">
              No books found.
            </Text>
          )}
        </Grid>
      </Center>

      <Center mt={50} mb={40}>
        {totalPages > 1 && (
          <Pagination
            color="#25D366"
            withEdges
            total={totalPages}
            value={page}
            onChange={setPage}
            styles={(theme) => ({
              control: {
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                fontSize: "20px",
                border: "1px solid lightgrey",
                transition: "background-color 0.3s ease",
              },
            })}
          />
        )}
      </Center>
    </Container>
  );
};

export default BookList;
