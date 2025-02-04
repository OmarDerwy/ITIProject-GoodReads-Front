// BookCard.jsx
import React from 'react';
import { Card, Text, Image, Badge, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from '../../styles/general/BookCard.module.css';

const BookCard = ({ book }) => {
    return (
    <Card
        shadow="md"
        m={10}
        radius="md"
        className={classes.card}
    >
        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> {/* Updated Link */}
            <Text weight={500} size="lg" mt="sm" c="primary-1" className={classes.title}>
                {book.title}
            </Text>
        </Link>

        <Center m="xs">
            {book.image_url && <Image src={book.image_url} height={400} alt={book.title} />}
        </Center>
        <Link to={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text mt={4} c="primary-1" className={classes.title}>
            {book.title}
            </Text>
        </Link>
        <Text mb={2} size="md" align="center" color="dimmed">
            {book.author}
        </Text>
        <Center mt="xs">
            <Badge variant="light" className={classes.badge}>
            {book.category}
            </Badge>
        </Center>
        </Card>
);
};

export default BookCard;