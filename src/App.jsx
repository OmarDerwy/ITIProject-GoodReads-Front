//mantine styles
import '@mantine/core/styles.css';
//mantine core
import { createTheme, MantineProvider } from '@mantine/core';
//R
import { useState } from 'react'
//CSS
import './App.css'
//react-router
import { Routes, Route, BrowserRouter} from 'react-router-dom';
//Pages
import LandingPage from './pages/LandingPage';

const theme = createTheme({

});
function App() {
  const excludedRoutes = ['/login', '/register' , '/']; //use this when navbar is finished
  return (
    <>
      <BrowserRouter>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          {/* Navbar */}
          <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </>
  )
}

export default App
