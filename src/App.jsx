//mantine styles
import '@mantine/core/styles.css';
//mantine core
import { createTheme, MantineProvider } from '@mantine/core';
//R
// import { useState } from 'react'
//CSS
import './App.css'
//react-router
import { Routes, Route, BrowserRouter} from 'react-router-dom';
//Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
//components
import Navbar from './components/general/Navbar';



const theme = createTheme({

});
function App() {
  const excludedRoutes = ['/login', '/register' , '/']; //use this when navbar is finished
  return (
    <>
      <BrowserRouter>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          {!excludedRoutes.includes(location.pathname) && <Navbar />}
          <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            {/* <Route path='/register' element={<Login/>}></Route> */}
            <Route path='/profile' element={<UserProfile/>}></Route>
            {/* <Route path='/home' element={<Login/>}></Route> */}
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </>
  )
}

export default App
