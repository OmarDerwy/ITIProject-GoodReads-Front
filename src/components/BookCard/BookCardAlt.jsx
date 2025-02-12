// BookCard.jsx
import { Card, Text, Image, Badge, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../../styles/general/BookCard.module.css';
import image from "../../assets/bookCoverNotFound.webp"

const BookCard = ({ book }) => {
    return (
    <Card
        shadow="md"
        m={10}
        radius="md"
        className={classes.card}
    >
        <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
            <Center m="xs">
                {book.coverImage ? <Image src={book.coverImage} height={400} alt={book.title}/>
                                :  <Image src={image} height={400} alt={book.title}/>}
            </Center>
        </Link>

        <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
            <Text mt={4} c="primary-1" className={classes.title}>
                {book.title}
            </Text>
        </Link>
        <Link to={`/authors/${book.authorId}`} style={{ textDecoration: 'none', color: 'inherit'}}>
            <Text mb={2} size="md" align="center" color="lightgreen">
                {book.author}
            </Text>
        </Link>
        
        <Center mt="xs">
            <Badge variant="light" className={classes.badge}>
                {book.categoryName}
            </Badge>
        </Center>
    </Card>
);
};

export default BookCard;