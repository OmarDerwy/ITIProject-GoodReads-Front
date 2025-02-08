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
  const [bookIds, setBookIds] = useState([]);
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  useEffect(() => {
    const fetchBookIds = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/categories/${categoryId}`
        );
        setBookIds(response.data.books);
        setCategoryName(response.data.categoryName);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchBookIds();
  }, [categoryId]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await Promise.all(
          bookIds.map(async (book) => {
            const response = await axiosInstance.get(
              `/api/books/${book.bookId}`
            );
            return response.data;
          })
        );
        setBooks(booksData);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };

    if (bookIds.length > 0) {
      fetchBooks();
    }
  }, [bookIds]);

  return (
    <>
      {/*get category name by id from params*/ console.log(books)}
      <Title ml={30} mb={30} order={2}>
        {categoryName}
      </Title>

      <Grid>
        {books?.map((book, index) => (
          <Paper
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m="auto"
            key={index}
            onClick={()=>navigate(`/books/${book._id}`)}
            style={{cursor:"pointer"}}
          >
            <Grid.Col span="auto">
              <Image radius="md" h="200" w="180" fit="fill" src={book.coverImage} />
            </Grid.Col>
            <Grid.Col span="auto">
              <Text ta="left" fz="lg" fw={700} mb={5}>
                {book.bookName}
              </Text>
              <Text ta="left" fz="md" fw={500} mb={20}>
                By {book.authorName}
              </Text>
              <Text ta="left" fz="md" fw={500} mb={20} span>
                <Rating value={book.averageRating} fractions={2} readOnly />{" "}
                {book.averageRating} stars - {book.ratings}
                {book.ratings > 1 || book.ratings == 0 ? " ratings" : " rating"}
              </Text>
            </Grid.Col>
          </Paper>
        ))}
      </Grid>
    </>
  );
}
