import { Button, Container, Group, Text, Grid } from '@mantine/core';
// import { GithubIcon } from '@mantinex/dev-icons';
import classes from './../../styles/landingpage/HeroSection.module.css';
import EtherealBook from '/EtherealBook.png'

//react
import { useState, useEffect } from 'react';

//react-router
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  function ImageWithHueShift({ src, alt, className }) {
    const [hue, setHue] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setHue((hue + 1) % 360);
      }, 10);
  
      return () => clearInterval(interval);
    }, [hue]);
  
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          filter: `hue-rotate(${hue}deg)`,
        }}
      />
    );
  }
  return (
    <div className={classes.wrapper}>
      <Container size={900} className={classes.inner}>
        <Grid>
          <Grid.Col span={{base: 12, md: 6, lg: 6, xl: 6}} order={{base: 1, md: 2, lg: 2}} className={classes.imageContainer}>
            <ImageWithHueShift src={EtherealBook} alt="hero" className={classes.image} />
          </Grid.Col>
          <Grid.Col span={{base: 12, md: 6, lg: 6, xl: 6}} order={{base: 2, md: 1, lg: 1}}>
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
                onClick={() => navigate('/Login')}
                size="xl"
                variant="default"
                className={classes.control}
              >
                Login
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}