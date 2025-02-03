// import React from 'react'
import MinimalNavbar from '../components/landingpage/MinimalNavbar'
import HeroSection from '../components/landingpage/HeroSection'
import Footer from '../components/general/Footer'
import { FaqWithImage } from '../components/landingpage/FAQ'
import { EmailBanner } from '../components/landingpage/SubscribeToNews'
// import NotFoundImage from '../pages/PageNotFound'
import { useLocation } from 'react-router-dom'
import { notifications } from '@mantine/notifications'

export default function LandingPage() {
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
      <MinimalNavbar/>
      <HeroSection/>
      <FaqWithImage/>
      <EmailBanner/>
      <Footer/>
    </>
  )
}
