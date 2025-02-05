import './App.css'
import { Routes, Route, useLocation} from 'react-router-dom';
import React , {Suspense} from 'react';

import Navbar from './components/general/NavBar';
import { Loader } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const BookList = React.lazy(() => import('./pages/BrowseBooks'));
const Categories = React.lazy(() => import('./pages/Categories'));
const NotFoundImage = React.lazy(() => import('./pages/PageNotFound'));
const Authors = React.lazy(() => import('./pages/Authors'));
const ForgotPassword = React.lazy(() => import('./pages/ResetPassword'));
const Bookshelves = React.lazy(() => import('./pages/Bookshelves'));
const AuthorDetails = React.lazy(() => import('./pages/AuthorDetails'));
const CategoryDetails = React.lazy(() => import('./pages/CategoryDetails'));
const General = React.lazy(() => import('./pages/General'));
const BookDetails = React.lazy(() => import('./pages/BookDetails'));
const ContactUs = React.lazy( () => import('./pages/ContactUs'));

function App() {
  const location = useLocation();
  const excludedRoutes = ['/login', '/sign-up' , '/']; //use this when navbar is finished
  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Notifications/>
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px"}}> <Loader type="bars" color="lightgreen" size={200}/> </div>}>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/sign-up' element={<SignUp/>}></Route>
          <Route path='/reset-password' element={<ForgotPassword/>}></Route>
          <Route path='/books' element={<BookList/>}></Route> 
          <Route path="/books/:bookId" element={<BookDetails/>} />
          <Route path='/authors' element={<Authors/>}></Route>
          <Route path='/author-details' element={<AuthorDetails/>}></Route>
          <Route path='/categories' element={<Categories/>}></Route>
          <Route path='/category-details' element={<CategoryDetails/>}></Route>
          <Route path='/profile' element={<UserProfile/>}></Route>
          <Route path='/bookshelves' element={<Bookshelves/>}></Route>
          <Route path='/general' element={<General/>}></Route>
          <Route path='/contact-us' element={<ContactUs/>}></Route>  
          <Route path='*' element={<NotFoundImage/>}></Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
