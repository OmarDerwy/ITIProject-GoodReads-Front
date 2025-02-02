import React from 'react'
import { UserInfo } from '../components/userprofile/UserInfo'
import { BookShelf } from '../components/general/BookShelf'
import { Divider } from '@mantine/core'

export default function UserProfile() {
  return (
    <>
      <UserInfo/>
      <Divider my="md"/>
      <BookShelf/>
      
    </>
  )
}
