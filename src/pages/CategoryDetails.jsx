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

export default function CategoryDetails() {
  return (
    <>
      {/*get category name by id from params*/}
      <Title ml={30} order={2}>
        Category Name:
      </Title>

      <Grid>
        {/*map here*/}
        <Paper
          radius="md"
          withBorder
          p="lg"
          bg="var(--mantine-color-body)"
          m={50}
        >
          <Grid.Col span="auto">
            <Image radius="md" h="200" w="180" fit="fill" src="dagdadgas" />
          </Grid.Col>
          <Grid.Col span="auto">
            <Text ta="left" fz="lg" fw={500} mb={5}>
              Book Name
            </Text>
            <Text ta="left" fz="lg" fw={500} mb={20}>
              Author Name
            </Text>
            <Text ta="left" fz="md" fw={500} mb={20} span>
              <Rating value={2.5} fractions={2} readOnly /> 2.5 stars - 2
              ratings
            </Text>
          </Grid.Col>
        </Paper>
      </Grid>
    </>
  );
}
