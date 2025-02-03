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
  
  export default function Authors() {
    return (
      <>
        
        <Title ml={30} order={2}>
          Authors:
        </Title>
  
        <Grid>
          {/*map authors here*/}
          <Paper
            radius="md"
            withBorder
            p="lg"
            bg="var(--mantine-color-body)"
            m={50}
          >
            <Grid.Col span="auto">
              <Avatar radius="md" h="200" w="180" fit="fill" src="dagdadgas" /> {/*image or icon for author*/}
            </Grid.Col>
            <Grid.Col span="auto">
              <Text ta="center" fz="lg" fw={500} mb={5}>
                Author 1
              </Text>
            </Grid.Col>
          </Paper>
        </Grid>
      </>
    );
  }
  