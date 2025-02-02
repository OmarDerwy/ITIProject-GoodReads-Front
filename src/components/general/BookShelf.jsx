import { Container, Group, Paper, Title } from '@mantine/core'
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
        <Title className='text-white' order={2}>Bookshelf</Title>
        <Carousel
        withIndicators
        slideSize={{base:'20%', xs:'33.333%' ,sm:'25%', md:'20%', lg:'20%'}}
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
