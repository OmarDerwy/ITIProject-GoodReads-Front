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
import axiosInstance from "../apis/config";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/categories");
        setCategories(response.data.categories);
      } catch (err) {
        console.log("Error: " + err.message);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Title ml={30} order={2}>
        Categories:
      </Title>

      <Grid>
        {categories?.map((category) => (
          <Paper
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m={50}
            onClick={()=>navigate(`/categories/${category._id}`)}
            style={{cursor:"pointer"}}
          >
            <Grid.Col span="auto">
              <Image radius="md" h="200" w="180" fit="fill" src={category.coverImage} />{" "}
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
