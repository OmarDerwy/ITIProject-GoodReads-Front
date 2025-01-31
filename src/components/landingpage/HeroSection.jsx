import { Button, Container, Group, Text } from '@mantine/core';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './../../styles/landingpage/HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="span" variant="gradient" gradient={{ from: 'green', to: 'lightgreen' }} inherit>
            Discover
          </Text>{' '}
            a vast number of books to read
        </h1>

        <Text className={classes.description} color="dimmed">
          create your own libaray of books and discover more that fit your tastes from our database!
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'green', to: 'lightgreen' }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="#"
            size="xl"
            variant="default"
            className={classes.control}
          >
            Login
          </Button>
        </Group>
      </Container>
    </div>
  );
}