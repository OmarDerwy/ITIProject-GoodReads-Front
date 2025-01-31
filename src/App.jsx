//mantine styles
import '@mantine/core/styles.css';
//mantine core
import { createTheme, MantineProvider } from '@mantine/core';
//R
import { useState } from 'react'
import Navbar from './components/general/navbar';
//CSS
import './App.css'
//components
import LandingPage from './pages/LandingPage';
import MinimalNavBar from './components/landingpage/MinimalNavBar';

const theme = createTheme({

});
function App() {

  return (
    <>
      
       
      <MantineProvider theme={theme} defaultColorScheme='dark'>
        <Navbar />
        <LandingPage/>
        
      </MantineProvider>
    </>
  )
}

export default App
