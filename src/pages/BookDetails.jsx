import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Text, Title, Loader, Group, Rating, Avatar, Center } from '@mantine/core';
import axiosInstance from '../apis/config';
import image from "../assets/bookCoverNotFound.webp";

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]); // Fixed: Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                if (!bookId) throw new Error("Invalid book ID.");

                const response1 = await axiosInstance.get(`/api/books/${bookId}`);
                setBook(response1.data);

                const response2 = await axiosInstance.get(`/api/reviews/${bookId}`);
                setReviews(response2.data.reviews); // Fixed: Ensure response is an array

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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px" }}>
                <Loader type="bars" color="lightgreen" size={200} />
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "200px" }}>
                <Text fw="900" fz="3rem" color="red">Error Loading Content.</Text>
                <Text fz="3rem" color="red">{error}</Text>
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
                    <Image src={image} height={800} alt={book.title} />
                )}
            </Group>
            <Title align="center" mt="xl">{book.bookName}</Title>
            <Text size="lg" align="center" mt="sm">By: {book.authorName}</Text>
            <Text mt="md">Description: {book.description || "No description available"}</Text>
            <Text mt="md">Category: {book.categoryName || "No Category available"}</Text>
            <Text mt="md">Average Rating: <Rating readOnly fractions={10} value={book.averageRating} /></Text>
            
            {/* Reviews Section */}
            <Title mt="xl" order={2}>Reviews</Title>

            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div
                        key={review._id}
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                            maxWidth: "600px",
                        }}
                    >
                        <Group>
                            <Avatar
                                radius="xl"
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                            />
                            <div>
                                <Text size="sm" weight={500}>{review.userId.name || "Anonymous"}</Text>
                                <Text size="xs" color="dimmed">{new Date(review.date).toLocaleString()}</Text>
                            </div>
                        </Group>
                        <Text pl={54} pt="sm" size="sm">{review.reviewText}</Text>
                    </div>
                ))
            ) : (
                <Center>
                    <Text mt="md" color="dimmed">No reviews available for this book.</Text>
                </Center>
            )}
        </Container>
    );
};

export default BookDetails;
