
// import { useState } from 'react'
//CSS
import './App.css'
//react-router
import { Routes, Route, useLocation} from 'react-router-dom';
//Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
//components
import Navbar from './components/general/NavBar';
import SignUp from './pages/SignUp';
import NotFoundImage from './pages/PageNotFound';
import { ForgotPassword } from './pages/ResetPassword';
import { GetInTouchSimple } from './pages/GetInTouch';
import Bookshelves from './pages/Bookshelves';
import AuthorDetails from './pages/AuthorDetails';

function App() {
  const location = useLocation();
  const excludedRoutes = ['/login', '/register' , '/']; //use this when navbar is finished
  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<UserProfile/>}></Route>
        <Route path='/bookshelves' element={<Bookshelves/>}></Route>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/reset-password' element={<ForgotPassword/>}></Route>
        <Route path='/contact-us' element={<GetInTouchSimple/>}></Route>
        <Route path='/author-details' element={<AuthorDetails/>}></Route>
        <Route path='*' element={<NotFoundImage/>}></Route>
      </Routes>
    </>
  )
}

export default App
