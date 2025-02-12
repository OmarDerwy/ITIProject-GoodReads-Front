import { Container, Group, Paper, Title } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import { Link } from 'react-router-dom'
// import { BookCard } from './BookCard'
// import 
import React from 'react'
import BookCard from './BookCard'

export function BookShelf(props) {
  const {title, popular} = props;
  return (
    <Container>
      <Paper bg={'#1C1E21'} m={20} p={20}>
        <Title className='text-white' mb={20} order={2}>{title}</Title>
        <Carousel
        withIndicators
        slideSize={{base:'20%', xs:'33.333%' ,sm:'25%', md:'20%', lg:'20%'}}
        slideGap="md"
        loop
        align="start"
        >
          {popular.map((pop, i)=>(
          <Carousel.Slide key={i}><BookCard title={pop.title} rating={pop.rating} views={pop.views}/></Carousel.Slide>
          ))}
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
