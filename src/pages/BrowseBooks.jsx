// BookList.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Container, Loader, Text, Flex, Center } from '@mantine/core';
import BookCard from '../components/BookCard/BookCardAlt'; 
import classes from '../styles/BrowseBooks/BrowseBooks.module.css'
import axios from 'axios';


const BookList = () => {
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Just for testing, To be replaced with our API
useEffect(() => {
    const fetchBooks = async () => {
        try {
            const isbns = [
                "9780142424179",
                "9780451524935",
                "9780061120084",
                "9780743273565",
                "9781501173219",
                "9780141439600",
                "9780307474278",
                "9780374533557",
                "9780385472579",
                "9780140283297",
                "9780439139601",
                "9780316769488",
                "9781250767089",
                "9781982137274",
                "9780062315007",
                "9780307949486",
                "9780345803481",
                "9780812981605",
                "9780385533225",
                "9780553380163",
                "9781400032716"
            ];

            const bookPromises = isbns.map(async isbn => {
                const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
                const data = await response.json();
                const bookData = data[`ISBN:${isbn}`];
                if (bookData) {
                    const coverUrl = `http://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`; // Medium size cover
                    return {
                        id: isbn, // Use ISBN as ID for simplicity (for testing)
                        title: bookData.title,
                        author: bookData.authors ? bookData.authors[0].name : 'Unknown Author',
                        category: bookData.subjects ? bookData.subjects[0].name : 'Unknown Category', // Basic category
                        image_url: coverUrl
                    };
                }
                return null; // Handle cases where book data is not found
            });
    
            const books = await Promise.all(bookPromises);
            setBooks(books.filter(book => book !== null)); // Filter out null results
    
            setLoading(false);
        } catch (err) {
    console.error("Error fetching books:", err);
    setError(err.message || "Failed to fetch books."); // Set error message
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
        <Loader type="bars" color="lightgreen" size={200} />
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
        <Text fw="900" fz="3rem" color="red">Error Loading Content.</Text>
        <Text fz="3rem" color="red">{error} Data</Text>
    </div>
) 
}

return (
    
<Container 
    px="md"
    
    className={classes.browseBooksContainer}
>
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
            <Grid.Col key={book.id} span="auto">
                <BookCard book={book} />
            </Grid.Col>
        ))}
    </Grid>
    </Center>
</Container>
);
};

export default BookList;
