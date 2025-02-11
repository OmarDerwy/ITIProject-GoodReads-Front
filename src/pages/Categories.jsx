import {
  Avatar,
  Button,
  Paper,
  Text,
  Grid,
  Select,
  Rating,
  Image,
  Title,
  Center,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response.data.array);
        setFilteredCategories(response.data.array);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === "") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((category) =>
        category.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };
  return (
    <>
      <Title ml={30} mb={30} order={2}>
        Categories:
      </Title>
      <Center mb={30}>
        <TextInput
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for categories..."
          mr={10}
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
              borderRadius: "0",
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
        {filteredCategories?.map((category, index) => (
          <Paper
            key={index}
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m={10}
            onClick={() => navigate(`/categories/${category._id}`)}
            style={{ cursor: "pointer" }}
          >
            <Grid.Col span="auto">
              <Image
                radius="md"
                h="200"
                w="180"
                fit="fill"
                src={category.coverImage}
              />{" "}
              {/*image or icon for category*/}
            </Grid.Col>
            <Grid.Col span="auto">
              <Text ta="center" fz="lg" fw={500} mb={5}>
                {category.categoryName}
              </Text>
            </Grid.Col>
          </Paper>
        ))}
      </Grid>
    </>
  );
}
