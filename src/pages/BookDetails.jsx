import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Text, Title, Loader, Group } from '@mantine/core';
import axiosInstance from '../apis/config';
import image from "../assets/bookCoverNotFound.webp"

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching book details for ID:", bookId);
        const fetchBookDetails = async () => {
            try {
                if (!bookId) {
                    throw new Error("Invalid book ID.");
                }

                const response = await axiosInstance.get(`/api/books/${bookId}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setError(error.message || "Failed to fetch book details.");
            } finally {
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
        ); 
    }

    if (!book) {
        return <Text>Book not found.</Text>;
    }

    return (
        <Container>
            <Group position="center" mt="xl">
                {book.coverImage ? (
                    <Image src={book.coverImage} alt={book.bookName} height={800} radius="md" />
                ) : (
                    <Image src={image} height={800} alt={book.title}/>
                )}
            </Group>
            <Title align="center" mt="xl">{book.bookName}</Title>
            <Text size="lg" align="center" mt="sm">{book.authorName}</Text>
            <Text mt="md">{book.description || "No description available"}</Text>
        </Container>
    );
};
