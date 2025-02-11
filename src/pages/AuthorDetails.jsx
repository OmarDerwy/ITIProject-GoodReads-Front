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

export default function AuthorDetails({ userData, setUserData }) {
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState("");
  const [ratings, setRatings] = useState("");


  const navigate = useNavigate();
  const authorId = location.pathname.split("/")[2];

  useEffect(() => {
    if (userData) {
      setUser(userData.id);
    }
  }, [userData]);
  console.log(user);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axiosInstance.get("/api/auth");
  //       setUser(response.data.id);
  //     } catch (err) {
  //       console.log("Error: " + err.message);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axiosInstance.get(`/api/authors/${authorId}`);
        setAuthor(response.data);
        setBooks(response.data.books);
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
            const response =
              book.bookId == null
                ? ""
                : await axiosInstance.get(`/api/books/${book.bookId._id}`);
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

  const handleRatingChange = (newRating, bookId) => {
    axiosInstance.post("/api/ratings", {
      bookId: bookId,
      userId: user,
      rating: newRating,
    });
  };

  const handleStatusChange = (newStatus, bookId) => {
    axiosInstance
      .post("/api/shelves", {
        bookId: bookId,
        userId: user,
        shelve: newStatus,
      })
      .catch(() => {
        axiosInstance.put("/api/shelves", {
          bookId: bookId,
          userId: user,
          shelve: newStatus,
        });
      });
  };

  return (
    <>
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
            <Text ta="left" fz="lg" fw={500} mb={20}>
              Date of birth:{" "}
              {author.dateOfBirth == undefined
                ? ""
                : author.dateOfBirth.substring(0, 10)}
            </Text>
            <Text c="dimmed" fz="lg">
              {author.bio}
            </Text>
          </Grid.Col>
        </Grid>
      </Paper>

      <Title ml={30} order={2}>
        Books released:
      </Title>

      {books?.map((book, index) =>
        book == undefined ? (
          ""
        ) : (
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
                  {book.averageRating == 1 ? " star average" : " stars average"}
                </Text>
              </Grid.Col>
              <Grid.Col span="auto">
                {localStorage.getItem("userToken") ? (
                  <>
                    <Select
                      placeholder="Read status"
                      data={["Currently Reading", "Want To Read", "Read"]}
                      defaultValue=""
                      onChange={(_value) =>
                        handleStatusChange(_value, book._id)
                      }
                    />
                    <Rating
                      defaultValue={0}
                      fractions={1}
                      mt={20}
                      onChange={(_value) =>
                        handleRatingChange(_value, book._id)
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
              </Grid.Col>
            </Grid>
          </Paper>
        )
      )}
    </>
  );
}
