import { Container, Group, Paper } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { Link } from 'react-router-dom'
// import { BookCard } from './BookCard'
// import 
import React from 'react'
import BookCard from './BookCard'

export function BookShelf() {
  return (
    <Container>
      <Paper bg={'#1C1E21'} m={20} p={20}>
        <Carousel
        withIndicators
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        >
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          <Carousel.Slide><BookCard/></Carousel.Slide>
          {/* ...other slides */}
        </Carousel>
        {/* <Group justify='flex-starts' m={20} p={20}>
          <BookCard/>
          <BookCard/>
          <BookCard/>
          <BookCard/>
        </Group> */}
      </Paper>
    </Container>
  )
}
