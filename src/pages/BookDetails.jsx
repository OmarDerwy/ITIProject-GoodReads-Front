import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Text, Title, Loader, Group } from '@mantine/core';

const BookDetails = () => {
    const { bookId } = useParams(); // Get bookId from URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching book details for ID:", bookId); // Debugging
        const fetchBookDetails = async () => {
            try {
                // Ensure bookId is valid before making the request
                if (!bookId) {
                    throw new Error("Invalid book ID.");
                }

                // Fetch book details
                const response = await fetch(`https://openlibrary.org/isbn/${bookId}.json`);
                
                if (!response.ok) {
                    throw new Error(`Book not found (Error ${response.status})`);
                }

                const data = await response.json();
                console.log("Fetched data:", data); // Debugging

                // Extract cover image
                let coverUrl = null;
                if (data.covers && data.covers.length > 0) {
                    coverUrl = `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`; 
                }

                // Fetch author details
                let authorName = "Unknown Author";
                if (data.authors && data.authors.length > 0) {
                    const authorId = data.authors[0].key.replace("/authors/", ""); // Extract author ID
                    const authorResponse = await fetch(`https://openlibrary.org/authors/${authorId}.json`);
                    if (authorResponse.ok) {
                        const authorData = await authorResponse.json();
                        authorName = authorData.name || "Unknown Author";
                    }
                }

                // Extract description
                let description = "No description available";
                if (data.description) {
                    description = typeof data.description === "string" ? data.description : data.description.value;
                }

                setBook({
                    title: data.title || "No Title",
                    author: authorName,
                    description: description,
                    image_url: coverUrl,
                });

                setLoading(false);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError(error.message || "Failed to fetch book details.");
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

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

    if (!book) {
        return <Text>Book not found.</Text>;
    }

    return (
        <Container>
            <Group position="center" mt="xl">
                {book.image_url ? (
                    <Image src={book.image_url} alt={book.title} height={800} radius="md" />
                ) : (
                    <Text>No cover image available</Text>
                )}
            </Group>
            <Title align="center" mt="xl">{book.title}</Title>
            <Text size="lg" align="center" mt="sm">{book.author}</Text>
            <Text mt="md">{book.description}</Text>
        </Container>
    );
};

export default BookDetails;
