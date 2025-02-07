import {
  Avatar,
  Button,
  Paper,
  Text,
  Grid,
  Select,
  Rating,
  Title,
  Image
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";

export default function AuthorDetails() {
  const [author, setAuthor] = useState({});
  const navigate = useNavigate();
  const authorId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axiosInstance.get(`/api/authors/${authorId}`);
        setAuthor(response.data);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchAuthor();
  }, []);
  return (
    <>
      <Paper radius="md" p="lg" bg="var(--mantine-color-body)" m={10}>
        <Grid>
          <Grid.Col span="auto">
            {" "}
            <Avatar
              src={author.imageUrl}
              size={210}
              radius={210}
            />
          </Grid.Col>
          <Grid.Col span={10}>
            <Title ta="left"  mb={5} order={2}>
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

      {/*map here*/}
      <Paper
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
              src="dagdadgas"
            />
          </Grid.Col>
          <Grid.Col span={8}>
            <Text ta="left" fz="lg" fw={500} mb={5}>
              Book Name
            </Text>
            <Text ta="left" fz="md" fw={500} mb={20} span>
              <Rating value={2.5} fractions={2} readOnly /> 2.5 stars - 2 ratings
            </Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Select
              placeholder="Read status"
              data={["Currently read", "Want to read", "Read"]}
              defaultValue=""
            />
            <Rating defaultValue={0} fractions={2} mt={20} />
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
