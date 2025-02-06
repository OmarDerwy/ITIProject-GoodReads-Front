import React, { useState, useEffect } from 'react';
import { Grid, Container, Loader, Text, Center } from '@mantine/core';
import BookCard from '../components/BookCard/BookCardAlt'; 
import classes from '../styles/BrowseBooks/BrowseBooks.module.css';
import axiosInstance from '../apis/config';

const BookList = () => {
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
const fetchBooks = async () => {
    try {
    const res = await axiosInstance.get("/api/books");
    setBooks(res.data);
    } catch (err) {
    console.error("Error fetching books:", err);
    setError(err.message || "Failed to fetch books.");
    } finally {
    setLoading(false);
    }
};

fetchBooks();
}, []);

if (loading) {
return ( 
    <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "200px"
    }}>
        <Loader type="bars" color="lightgreen" size={200}/>
    </div>
);
}

if (error) {
return (
    <div style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "200px"
    }}>
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
</Container>
);
};

export default BookList;
