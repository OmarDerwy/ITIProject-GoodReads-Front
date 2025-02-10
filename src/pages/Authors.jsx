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

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get("/api/authors");
        setAuthors(response.data.array);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchAuthors();
  }, []);
  return (
    <>
      <Title ml={30} mb={30} order={2}>
        Authors:
      </Title>

      <Grid>
        {authors?.map((author, index) => (
          <Paper
            key={index}
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m={authors.length >= 5? "auto" : 30 }
            onClick={() => navigate(`/authors/${author._id}`)}
            style={{ cursor: "pointer" }}
          >
            <Grid.Col span="auto">
              <Avatar
                radius="md"
                h="200"
                w="180"
                fit="fill"
                src={author.avatar}
              />{" "}
              {/*image or icon for author*/}
            </Grid.Col>
            <Grid.Col span="auto">
              <Text ta="center" fz="lg" fw={600} mb={5}>
                {author.authorName}
              </Text>
            </Grid.Col>
          </Paper>
        ))}
      </Grid>
    </>
  );
}
