import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import image from '../assets/animated404.svg';
import classes from '../styles/landingpage/NotFoundImage.module.css';


export default function NotFoundImage() {
return (
<Container className={classes.root}>
    <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image} className={classes.mobileImage}/>
        <div>
            <Title className={classes.title}>Something is not right...</Title>
            <Text c="dimmed" size="lg">
                Page you are trying to open does not exist. You may have mistyped the address, or the
                page has been moved to another URL. If you think this is an error contact support.
            </Text>
            <Button variant="gradient"
                    gradient={{ from: 'green', to: 'lightgreen' }}
                    size="md" 
                    mt="xl" 
                    className={classes.control}>
                Get back to home page
            </Button>
        </div>
        <Image src={image} className={classes.desktopImage}/>
    </SimpleGrid>
</Container>
);
}   