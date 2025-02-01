//mantine styles
import '@mantine/core/styles.css';
//mantine core
import { createTheme, MantineProvider } from '@mantine/core';
//R
// import { useState } from 'react'
//CSS
import './App.css'
//components
import LandingPage from './pages/LandingPage';


const theme = createTheme({

});
function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme='dark'>
        <LandingPage/>
      </MantineProvider>
    </>
  )
}

export default App
