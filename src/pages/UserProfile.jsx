import React, { useEffect, useState } from 'react'
import { UserInfo } from '../components/userprofile/UserInfo'
import { BookShelf } from '../components/general/BookShelf'
import { Divider } from '@mantine/core'
import { useLocation, useParams } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import axiosInstance from '../apis/config'

export default function UserProfile() {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const fetchUserData = async (id) =>{
    const response = await axiosInstance.get(`/api/users/${id}`);
    setUserData(response.data);
    // console.log(response.data)
  }
  // console.log('sedkfjhsdkf')
  useEffect(() => {
    fetchUserData(params.id)
    if(sessionStorage.getItem('justLoggedIn')){
      notifications.show({
        title: 'Login Success',
        message: 'Successfully logged in',
        color: 'green',
        autoClose: 5000
      })
      sessionStorage.removeItem('justLoggedIn');
    }
  }, [params.id])
  const popular =[
    { title: "book1", rating: 2.5, views: 100 },
    { title: "book2", rating: 3, views: 200 },
    { title: "book3", rating: 3.5, views: 300 },
    { title: "book4", rating: 2.5, views: 100 },
    { title: "book5", rating: 3, views: 200 },
    { title: "book6", rating: 3.5, views: 300 },
    { title: "book7", rating: 2.5, views: 100 },
  ]
  return (
    <>
      {userData?<UserInfo userData={userData}/>: <div>loading</div>}
      <Divider my="md"/>
      <BookShelf title="Your Books" popular={popular} />
    </>
  )
}
