import { AiOutlineArrowRight } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react'
import { UserInfo } from '../components/userprofile/UserInfo'
import { BookShelf } from '../components/general/BookShelf'
import { Container, Divider, Flex, Text, Title, Card, Center } from '@mantine/core'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import axiosInstance from '../apis/config'

export default function UserProfile() {
  let params = useParams();
  const [userData, setUserData] = useState(null);
  const [bookshelf, setBookshelf] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const navigate = useNavigate();



  const fetchUserData = async (id) =>{
    try {
      const response = await axiosInstance.get(`/api/users/${id}`);
      setUserData(response.data);
      // console.log(response.data)
    } catch (error) {
      if (error.response.status === 404) {
        notifications.show({
          title: 'User not found',
          message: 'This user does not exist',
          color: 'red',
          autoClose: 5000
        });
        navigate('/*');
      }
    }
  }
  const fetchShelves = async (id) =>{
   try {
     const response = await axiosInstance.get(`/api/shelves/2/${id}`);
     setBookshelf(response.data);
   } catch (error) {
     console.error("An error occurred while fetching shelves:", error);
    
     notifications.show({
       title: 'Error Fetching Shelves',
       message: 'There was an issue retrieving the bookshelves, please try again later.',
       color: 'red',
       autoClose: 5000
     });
     navigate('/*');
   }
  }
  // console.log('sedkfjhsdkf')
  useEffect(() => {
    fetchUserData(params.id);
    fetchShelves(params.id);
    if(sessionStorage.getItem('justLoggedIn')){
      notifications.show({
        title: 'Login Success',
        message: 'Successfully logged in',
        color: 'green',
        autoClose: 5000
      })
      sessionStorage.removeItem('justLoggedIn');
    }
    axiosInstance.get(`/api/subscription/${params.id}`)
      .then((response) => {
        setSubscription(response.data.status);
      })
  }, [params.id]);



  return (
    <>
      {userData ? <UserInfo userData={userData} subscription={subscription}/> : <div>loading</div>}
      <Divider my="md" />
      <Container>
        <Flex justify={'start'} align={'center'}>
          <Title order={2}>Bookshelf</Title>
          <Divider mx="md"></Divider>
        </Flex>
      </Container>
      {bookshelf ? (
        bookshelf.length > 0 ? (
          <BookShelf key={shelf.id} shelf={bookshelf} />
        ) : (
          <Container>
            <Card h={200}>
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Text >This user has no books in their bookshelf</Text>
              </Flex>
            </Card>
          </Container>
        )
      ) : (
        <div>loading</div>
      )}
    </>
  )
}
