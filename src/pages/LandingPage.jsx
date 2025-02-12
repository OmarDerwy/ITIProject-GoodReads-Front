// import React from 'react'
import MinimalNavbar from '../components/landingpage/MinimalNavbar'
import HeroSection from '../components/landingpage/HeroSection'
import Footer from '../components/general/Footer'
import { FaqWithImage } from '../components/landingpage/FAQ'
import { EmailBanner } from '../components/landingpage/SubscribeToNews'

export default function LandingPage({userData}) {
  return (
    <>
      <MinimalNavbar/>
      <HeroSection userData={userData}/>
      <FaqWithImage/>
      <EmailBanner/>
      <Footer/>
    </>
  )
}
