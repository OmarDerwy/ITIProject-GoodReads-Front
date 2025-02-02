import React from 'react'
import { Card, Image, Text } from '@mantine/core';


export default function BookCard() {
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
        Book Title
      </Text>

      <Text mt="xs" c="dimmed" size="sm">
        Author Name
      </Text>
      <Text mt="xs" c="dimmed" size="sm">
        rating
      </Text>
      <Text mt="xs" c="dimmed" size="sm">
        Views
      </Text>
    </Card>
  )
}
