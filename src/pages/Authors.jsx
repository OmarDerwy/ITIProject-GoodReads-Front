import {
  Avatar,
  Button,
  Paper,
  Text,
  Grid,
  Select,
  Rating,
  Title,
  Center,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";
import { CiSearch } from "react-icons/ci";

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axiosInstance.get("/api/authors");
        setAuthors(response.data.array);
        setFilteredAuthors(response.data.array);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchAuthors();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredAuthors(authors);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setFilteredAuthors(authors);
    } else {
      const filtered = authors.filter((author) =>
        author.authorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAuthors(filtered);
    }
  };

  return (
    <>
      <Center
        mb={30}
        style={{ display: "flex", gap: "10px", marginTop: "50px" }}
      >
        <TextInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for authors..."
          onKeyDown={(event) => {
            if (event.key === "Enter") handleSearchClick();
          }}
          styles={{
            input: {
              height: "60px",
              width: "800px",
              minWidth: "50%",
              borderRadius: "35px",
              border: "1px solid lightgrey",
              padding: "20px",
              backgroundColor: "lightgrey",
              color: "black",
              fontSize: "1.5rem",
              fontWeight: "900",
              borderRadius: "5px",
            },
          }}
        />

        <ActionIcon
          h={60}
          w={60}
          variant="gradient"
          gradient={{ from: "green", to: "lightgreen" }}
          title="Search"
          onClick={handleSearchClick}
        >
          <CiSearch size="1.5rem" />
        </ActionIcon>
      </Center>

      <Grid ml={20}>
        {filteredAuthors?.map((author, index) => (
          <Paper
            display={"inline-block"}
            key={index}
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m={10}
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
