import React, { useState, useEffect } from "react";
import { Grid, Container, Loader, Text, Center, Pagination } from "@mantine/core";
import BookCard from "../components/BookCard/BookCardAlt";
import classes from "../styles/BrowseBooks/BrowseBooks.module.css";
import axiosInstance from "../apis/config";

const BookList = () => {
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [page, setPage] = useState(1); // Current page
const [totalPages, setTotalPages] = useState(1); // Total pages

useEffect(() => {
const fetchBooks = async () => {
    setLoading(true);
    try {
    const res = await axiosInstance.get(`/api/books?page=${page}&limit=10`);
    setBooks(res.data.books);
    setTotalPages(res.data.totalPages || 1); 
    } catch (err) {
    console.error("Error fetching books:", err);
    setError(err.message || "Failed to fetch books.");
    } finally {
    setLoading(false);
    }
};

fetchBooks();
}, [page]);    

if (loading) {
return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px" }}>
    <Loader type="bars" color="lightgreen" size={200} />
    </div>
);
}

if (error) {
return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "200px" }}>
    <Text fw={900} fz="3rem" color="red">Error Loading Content.</Text>
    <Text fz="3rem" color="red">{error}</Text>
    </div>
);
}

return (
<Container px="md" className={classes.browseBooksContainer}>
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
        {books.map((book) => (
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
        ))}
    </Grid>
    </Center>
    <Center mt={50} mb={40}>
        {totalPages > 1 && (
            <Pagination
            color="#25D366" 
            withEdges
            total={totalPages}
            value={page}
            onChange={(newPage) => setPage(newPage)}
            styles={{
                control: {
                width: "50px", 
                height: "50px",
                borderRadius: "50%", 
                fontSize: "20px", 
                border: "1px solid lightgrey", 
                },
            }}
    />
    )}
    </Center>

</Container>
);
};

export default BookList;
