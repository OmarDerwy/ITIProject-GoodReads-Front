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
  
  export default function Categories() {
    return (
      <>
        
        <Title ml={30} order={2}>
          Categories:
        </Title>
  
        <Grid>
          {/*map categoeies here*/}
          <Paper
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m={50}
          >
            <Grid.Col span="auto">
              <Image radius="md" h="200" w="180" fit="fill" src="dagdadgas" /> {/*image or icon for category*/}
            </Grid.Col>
            <Grid.Col span="auto">
              <Text ta="center" fz="lg" fw={500} mb={5}>
                Category 1
              </Text>
            </Grid.Col>
          </Paper>
        </Grid>
      </>
    );
  }
  