import React from 'react'
import { Card, Image, Text, Rating } from '@mantine/core';


export default function BookCard(props) {
  const {title, author, rating, views} = props;
  return (
    <Card
      shadow="sm"
      padding="xs"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      w={150}
    >
      <Card.Section>
        <Image
          src="https://placehold.co/150x225"
          alt="No way!"
        />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {title == undefined? "" : title }
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        {author == undefined? "" : author}
      </Text>
      <Text mt="xs" c="dimmed" size="sm">
      {rating == undefined? "" : <Rating value={rating} fractions={2} readOnly />}
      </Text>
      <Text mt="xs" c="dimmed" size="sm">
      {views == undefined? "" : views+" views"}

      </Text>
    </Card>
  )
}
