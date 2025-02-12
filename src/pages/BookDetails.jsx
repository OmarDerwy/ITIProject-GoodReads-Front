    import React, { useState, useEffect } from "react";
    import { useNavigate, useParams } from "react-router-dom";
    import {
    Container,
    Image,
    Text,
    Title,
    Loader,
    Group,
    Rating,
    Avatar,
    Center,
    Button,
    Card,
    Paper,
    Box,
    Grid,
    Divider,
    Textarea,
    Select
    } from "@mantine/core";
    import { AiOutlineBook } from "react-icons/ai";
    import axiosInstance from "../apis/config";
    import image from "../assets/bookCoverNotFound.webp";
    import { Link } from "react-router-dom";
    import { Anchor } from "@mantine/core";

function BookDetails( {userData, setUserData} ) {
    const { bookId } = useParams();
    const [book, setBook] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [authorId, setAuthorId] = useState(null);

    const [user, setUser] = useState(null);

    const [reviewText, setReviewText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [category, setCategory] = useState([]);

    const [shelf, setShelf] = useState("");
    const [shelfId, setShelfId] = useState(null); // Store shelf ID if it exists
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUser = async () => {
    //     try {
    //         const userrRes = await axiosInstance.get("/api/auth");
    //         setUser(userrRes.data._id);
    //         console.log(userrRes);
    //     } catch (err) {
    //         console.log("Error: " + err.message);
    //     }
    //     };
    //     fetchUser();
    // }, []);

    // Get userId
    useEffect(() => {
        if (userData) {
            setUser(userData.id);
            console.log("User: ", user);
        }
    }, [userData]);

    
    // To get book Details
    useEffect(() => {
    const fetchBookDetails = async () => {
    try {
        if (!bookId) throw new Error("Invalid book ID.");

        console.log("BookID: ", bookId);
        const bookRes = await axiosInstance.get(`/api/books/${bookId}`);
        setBook(bookRes.data);
        // console.log("BookRes.data",book);

        const reviewsRes = await axiosInstance.get(`/api/reviews/${bookId}`);
        setReviews(reviewsRes.data);
        console.log("Book reviews: ",reviewsRes.data);

        const categoryRes = await axiosInstance.get(`/api/categories/${bookRes.data.book.categoryId}`);
        setCategory(categoryRes.data);
        console.log("Category: ", categoryRes.data);
        

    } catch (error) {
        console.error("Error fetching book details:", error);
        setError(error.message || "Failed to fetch book details.");
    } finally {
        setLoading(false);
    }
    };

    fetchBookDetails();
}, [bookId]);

useEffect(() => {
    console.log("BookRes.data",book);
}, [book]);

    useEffect(() => {
        const fetchShelf = async () => {
            try {
                if (!user) return;
    
                const response = await axiosInstance.get(`/api/shelves/${user}`);
                console.log(response);
                const userShelf = response.data.shelves.find(s => s.bookId === bookId);
    
                if (userShelf) {
                    setShelf(userShelf.shelve);
                    setShelfId(userShelf._id);
                }
            } catch (error) {
                console.error("Error fetching shelf data:", error);
            }
        };
    
        fetchShelf();
    }, [bookId, user]);
    
    // Handle shelf selection change
    const handleShelfChange = async (newShelf) => {
        setShelf(newShelf); // Update UI immediately
    
        try {
            if (shelfId) {
                // Update existing shelf
                await axiosInstance.put(`/api/shelves/`, {
                    bookId,
                    userId: user,
                    shelve: newShelf,
                });
            } else {
                // Add to shelf if not exists
                const response = await axiosInstance.post("/api/shelves", {
                    bookId,
                    userId: user,
                    shelve: newShelf,
                });
    
                setShelfId(response.data._id); // Store new shelf ID
            }
        } catch (error) {
            console.error("Error updating shelf:", error);
        }
    };

    

    

    const handleReviewSubmit = async (event) => {
        event.preventDefault(); // ✅ Prevents the page from reloading
    
        if (!reviewText.trim()) {
            alert("Please enter a review.");
            return;
        }
    
        setSubmitting(true);
    
        try {
            console.log("Submitting review..."); // Debugging
    
            const response = await axiosInstance.post("/api/reviews", {
                bookId,
                userId: user, 
                reviewText,
            });
    
            console.log("Review Submitted:", response.data);
    
            console.log("Book reviews before update:", reviews);
            setReviews((prevReviews) =>
                Array.isArray(prevReviews)
                    ? [...prevReviews, {
                        _id: Date.now(), 
                        userId: { name: "You" }, 
                        reviewText, 
                        date: new Date(),
                    }]
                    : [{
                        _id: Date.now(), 
                        userId: { name: "You" }, 
                        reviewText, 
                        date: new Date(),
                    }]
            );
            console.log("Book reviews after update:", reviews);
            
    
            setReviewText(""); // ✅ Clear input field
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review.");
        } finally {
            setSubmitting(false);
        }
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
    if ([400,404].includes(error.status)) {
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
    }

    if (!book) {
        return <Text>Book not found.</Text>;
    }

    return (
        <Box
        style={{
            minHeight: "100vh",
            padding: "50px 0",
            background: "#252524",
        }}
        >
        <Title mt="xl" mb="xl" order={1} align="center" color="#E7FFDB">
            📖 Book Details
        </Title>
        <Container size="lg">
        <Divider my="lg" color="rgba(255, 255, 255, 0.2)" />
            <Card
            shadow="lg"
            radius="md"
            p="xl"
            withBorder
            style={{ background: "#0B141A", color: "#E7FFDB" }}
            >
            <Grid gutter="xl" align="center">
                <Grid.Col span={{ base: 12, md: 5 }}>
                <Image
                    src={book.book.coverImage || image}
                    alt={book.book.bookName}
                    height={450}
                    radius="md"
                    withBorder
                />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 7 }}>
                <Title order={1} align="left" color="#E7FFDB">
                    {book.book.bookName}
                </Title>
                <Text size="lg" align="left" mt="sm">
                    <strong>By: </strong>
                    <Anchor
                    component={Link}
                    to={`/authors/${book.book.authorId._id}`}
                    style={{
                        color: "#21C063",
                        fontWeight: "bold",
                        marginLeft: "5px",
                        textDecoration: "none",
                    }}
                    >
                    {book.book.authorId.authorName}
                    </Anchor>
                </Text>

                <Divider my="md" color="rgba(255, 255, 255, 0.2)" />

                <Text mt="md">
                    <strong style= {{fontSize: "18px"}}>Description:</strong>{" "}
                    {book.book.description || "No description available"}
                </Text>

                
                <Text mt="md">
    <strong style={{ fontSize: "18px" }}>Category:</strong>{" "}
    {category ? ( // Check if category exists
        <Anchor
        component={Link}
        to={`/categories/${book.book.categoryId}`}
        style={{
            color: "#21C063",
            fontWeight: "bold",
            marginLeft: "5px",
            textDecoration: "none",
        }}
        >
        {category.categoryName}
        </Anchor>
    ) : (
        <span style={{ marginLeft: "5px" }}>No category available</span> 
    )}
</Text>
                <Text mt="md" >
                    <strong style={{ fontSize: "18px" }}>Average Rating:</strong>
                    <Rating 
                        readOnly 
                        fractions={10} 
                        value={book.book.averageRating} 
                        color="#21C063" 
                    />
                </Text>
                
                
                { (book.book.bookFile )? (
                    <Button
                    component="a"
                    href={book.book.bookFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="green"
                    size="lg"
                    radius="xl"
                    leftSection={<AiOutlineBook size={20} />}
                    mt="lg"
                    style={{
                        backgroundColor: "#21C063",
                        color: "#111B21",
                        fontWeight: "bold",
                        transition: "0.3s",
                    }}
                    variant="filled"
                    >
                    Open Book
                    </Button>
                ):<Button
                component="a"
                onClick={()=>{navigate(`/subscribe-to-premium`)}}
                variant="gradient"
                gradient={{from: 'gold', to: 'white'}}
                size="lg"
                radius="xl"
                mt="lg"
                style={{
                    backgroundColor: "#21C063",
                    color: "#111B21",
                    fontWeight: "bold",
                    transition: "0.3s",
                }}
                >
                    Subscribe to premium to view file
                    </Button>}

                {user && (
                    <Select
                    label="Add to Shelf"
                    data={["Want To Read", "Currently Reading", "Read"]}
                    value={shelf}
                    onChange={handleShelfChange}
                    styles={{
                        label: {
                            fontSize: "18px", 
                            fontWeight: "bold",
                            color: "#E7FFDB",
                            marginBottom: "10px",
                        },
                        root: {
                            maxWidth: "350px", 
                            width: "100%",
                            marginTop: "20px",
                        },
                        input: {
                            backgroundColor: "#0A151A",
                            color: "#E7FFDB",
                            height: "50px", 
                            borderRadius: "8px",
                            border: "2px solid #21C063", 
                            padding: "10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "0.3s",
                        },
                        dropdown: {
                            backgroundColor: "#111A20"
                        },
                        item: {
                            color: "#E7FFDB",
                            "&:hover": {
                                backgroundColor: "#0D1C22",
                            },
                        },
                    }}
                />
                
                )}
                </Grid.Col>
            </Grid>
            </Card>

            <Title mt="xl" order={1} align="center" color="#E7FFDB">
                📖 Reviews
            </Title>
            <Divider my="lg" color="rgba(255, 255, 255, 0.2)" />

            {reviews.reviews.length > 0 ? (
                reviews.reviews.map((review) => (
                <Paper
                key={review._id}
                shadow="sm"
                p="md"
                mt="lg"
                radius="md"
                withBorder
                style={{ backgroundColor: "#0B141A", color: "#E7FFDB" }}
                >
                <Group align="flex-start">
                    <Avatar
                    radius="xl"
                    size="lg"
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                    />
                    <div>
                    <Text fw={600} color="#21C063">
                        {review.userId.name || "Anonymous"}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {new Date(review.date).toLocaleString()}
                    </Text>
                    <Text mt="xs" size="sm">
                        {review.reviewText}
                    </Text>
                    </div>
                </Group>
                </Paper>
            ))
            ) : (
            <Center>
                <Text mt="md" color="dimmed">
                No reviews available for this book.
                </Text>
            </Center>
            )}
            {user && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#0A151A",
                        color: "#E7FFDB",
                    }}
                >
                    <Title order={3} mb="md">Write a Review</Title>
            <form onSubmit={handleReviewSubmit}>
                <Textarea
                    placeholder="Write your review here..."
                    minRows={3}
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                />
                <Button
                    mt="md"
                    fullWidth
                    type="submit"
                    variant="gradient"
                    gradient={{ from: "green", to: "lightgreen" }}
                    disabled={submitting}
                    
                >
                    {submitting ? "Submitting..." : "Submit Review"}
                </Button>
            </form>

                </div>
            )}

            
        </Container>
        </Box>
    );
    };

export default BookDetails;
