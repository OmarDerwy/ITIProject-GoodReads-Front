import {
  Avatar,
  Button,
  Paper,
  Text,
  Grid,
  Select,
  Rating,
  Title,
  Image,
} from "@mantine/core";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryDetails() {
  const categoryId = location.pathname.split("/")[2];
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/categories/${categoryId}`
        );
        setBooks(response.data.books);
        setCategoryName(response.data.categoryName);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchBooks();
  }, [categoryId]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get(`/api/authors`);
        setAuthors(response.data.array);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchAuthors();
  }, []);

  return (
    <>
      {/*get category name by id from params*/}
      <Title ml={30} mb={30} order={2}>
        {categoryName}
      </Title>

      <Grid>
        {books?.map((book, index) => {
          const author = authors.find(
            (author) => author._id === book.bookId.authorId
          );
          return (
            <Paper
              radius="md"
              withBorder
              p="lg"
              bg="var(--mantine-color-body)"
              m="auto"
              key={index}
              onClick={() => navigate(`/books/${book._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Grid.Col span="auto">
                <Image
                  radius="md"
                  h="200"
                  w="180"
                  fit="fill"
                  src={book.bookId.coverImage}
                />
              </Grid.Col>
              <Grid.Col span="auto">
                <Text ta="left" fz="lg" fw={700} mb={5}>
                  {book.bookId.bookName}
                </Text>
                <Text ta="left" fz="md" fw={500} mb={20}>
                  By {author ? author.authorName : "Unknown Author"}{" "}
                  {/* Check if author is found */}
                </Text>
                <Text ta="left" fz="md" fw={500} mb={20} span>
                  <Rating
                    value={book.bookId.averageRating}
                    fractions={2}
                    readOnly
                  />{" "}
                  {book.bookId.averageRating} stars - {book.bookId.ratings}
                  {book.bookId.ratings > 1 || book.bookId.ratings === 0
                    ? " ratings"
                    : " rating"}
                </Text>
              </Grid.Col>
            </Paper>
          );
        })}
      </Grid>
    </>
  );
}
