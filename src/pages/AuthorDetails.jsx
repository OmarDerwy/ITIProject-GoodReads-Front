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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";

export default function AuthorDetails() {
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const authorId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axiosInstance.get(`/api/authors/${authorId}`);
        setAuthor(response.data);
        setBooks(response.data.books);
        console.log(books);
    
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchAuthor();
  }, [authorId]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await Promise.all(
          books.map(async (book) => {
            const response = await axiosInstance.get(
              `/api/books/${book.bookId._id}`
            );
            return response.data;
          })
        );
        setBooks(booksData);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    if (author.books && author.books.length > 0) {
      fetchBooks();
    }
  }, [author]);
  return (
    <>
      {console.log(books)}
      <Paper radius="md" p="lg" bg="var(--mantine-color-body)" m={10}>
        <Grid>
          <Grid.Col span="auto">
            {" "}
            <Avatar src={author.avatar} size={210} radius={210} />
          </Grid.Col>
          <Grid.Col span={10}>
            <Title ta="left" mb={5} order={2}>
              {author.authorName}
            </Title>
            <Text ta="left" fz="md" fw={500} mb={20}>
              {author.dateOfBirth}
            </Text>
            <Text c="dimmed" fz="md">
              {author.bio}
            </Text>
          </Grid.Col>
        </Grid>
      </Paper>

      <Title ml={30} order={2}>
        Books released:
      </Title>

      {books.map((book, index) => (
        <Paper
          key={index}
          radius="md"
          withBorder
          p="lg"
          bg="var(--mantine-color-body)"
          m={50}
        >
          <Grid>
            <Grid.Col span="auto">
              <Image
                radius="md"
                h="200"
                w="180"
                fit="fill"
                src={book.coverImage}
                onClick={() => navigate(`/books/${book._id}`)}
                style={{ cursor: "pointer" }}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Text
                ta="left"
                fz="lg"
                fw={700}
                mb={5}
                onClick={() => navigate(`/books/${book._id}`)}
                style={{ cursor: "pointer" }}
              >
                {book.bookName}
              </Text>
              <Text ta="left" fz="md" fw={500} mb={20} span>
                <Rating value={book.averageRating} fractions={4} readOnly />{" "}
                {book.averageRating}
                {book.averageRating == 1 ? " star" : " stars"} - {book.ratings}
                {book.ratings == 1 ? " rating" : " ratings"}
              </Text>
            </Grid.Col>
            <Grid.Col span="auto">
              <Select
                placeholder="Read status"
                data={["Currently read", "Want to read", "Read"]}
                defaultValue=""
              />
              <Rating defaultValue={0} fractions={4} mt={20} />
            </Grid.Col>
          </Grid>
        </Paper>
      ))}
    </>
  );
}
