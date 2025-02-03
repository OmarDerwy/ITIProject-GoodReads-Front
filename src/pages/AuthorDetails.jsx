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

export default function AuthorDetails() {
  return (
    <>
      <Paper radius="md" p="lg" bg="var(--mantine-color-body)" m={10}>
        <Grid>
          <Grid.Col span="auto">
            {" "}
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png"
              size={210}
              radius={210}
            />
          </Grid.Col>
          <Grid.Col span={10}>
            <Title ta="left"  mb={5} order={2}>
              Author Name
            </Title>
            <Text ta="left" fz="md" fw={500} mb={20}>
              01/01/1970
            </Text>
            <Text c="dimmed" fz="sm">
              Small Bio: Martin Kesici's band, and Tobias Schultka. The band was
              originally meant as a joke, but progressed into being a more
              serious musical duo. The name for the band has no particular
              meaning, although its origins were suggested from when the two
              original members were driving in a car operated by Marcel Neumann
              and an accident almost occurred. Neumann found Schultka "so funny
              that he briefly lost control of the vehicle." Many of their songs
              from this point were covers of German folk tales and nursery
              rhymes.
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
