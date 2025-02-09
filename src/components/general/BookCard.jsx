import React from 'react'
import { Card, Image, Text, Rating } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


export default function BookCard(props) {
  const {title, author, rating, views, image, id, type} = props;
  const navigate = useNavigate();
  return (
    <Card
      shadow="sm"
      padding="xs"
      component="a"
      target="_blank"
      w={150}
      onClick={()=>{navigate(`/${type === "b"? "books": type === "a"? "authors": "categories"}/${id}`)}}
      style={{cursor: "pointer"}}
    >
      <Card.Section>
        <Image
          src={image}
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
