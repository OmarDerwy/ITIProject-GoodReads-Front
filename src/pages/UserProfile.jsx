import React from 'react'
import { UserInfo } from '../components/userprofile/UserInfo'
import { BookShelf } from '../components/general/BookShelf'

export default function UserProfile() {
  return (
    <>
      <UserInfo/>
      <hr/>
      <BookShelf/>
      
    </>
  )
}
