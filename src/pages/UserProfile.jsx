import React from 'react'
import { UserInfo } from '../components/userprofile/UserInfo'
import { BookShelf } from '../components/general/BookShelf'
import { Divider } from '@mantine/core'
import { useLocation } from 'react-router-dom'
import { notifications } from '@mantine/notifications'

export default function UserProfile() {
  const location = useLocation()
  if(location.state){
    location.state.loginSuccess && notifications.show({
      title: 'Login Success',
      message: location.state.message,
      color: 'green',
      autoClose: 5000
    })
  }
  return (
    <>
      <UserInfo/>
      <Divider my="md"/>
      <BookShelf/>
      
    </>
  )
}
