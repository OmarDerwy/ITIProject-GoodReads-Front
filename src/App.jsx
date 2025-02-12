import './App.css'
import { Routes, Route, useLocation, Navigate} from 'react-router-dom';
import React , {Suspense} from 'react';
import Navbar from './components/general/NavBar';
import { Loader } from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';
import {ProtectedRoutes, UserAuthRoutes, AdminOnlyRoutes} from './utils/protected-routes';
import {useEffect, useState} from 'react';
import axiosInstance from './apis/config';



const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const UserProfile = React.lazy(() => import('./pages/UserProfile'));
const BookList = React.lazy(() => import('./pages/BrowseBooks'));
const Categories = React.lazy(() => import('./pages/Categories'));
const NotFoundImage = React.lazy(() => import('./pages/PageNotFound'));
const Authors = React.lazy(() => import('./pages/Authors'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy( ()  => import('./pages/ResetPassword'))
const Bookshelves = React.lazy(() => import('./pages/Bookshelves'));
const AuthorDetails = React.lazy(() => import('./pages/AuthorDetails'));
const CategoryDetails = React.lazy(() => import('./pages/CategoryDetails'));
const General = React.lazy(() => import('./pages/General'));
const BookDetails = React.lazy(() => import('./pages/BookDetails'));
const ContactUs = React.lazy( () => import('./pages/ContactUs'));
const Admin = React.lazy(() => import('./pages/Admin'));
const Bookmarks = React.lazy(() => import('./pages/Bookmarks'));
const PremiumSubscription = React.lazy( () => import('./pages/PremiumSubscription'));

function App() {
  const location = useLocation();
  const excludedRoutes = ['/login', '/sign-up' , '/', '/admin']; //use this when navbar is finished
  const [userData, setUserData] = useState(null);
  const fetchUserData = async () =>{
    try {
      const response = await axiosInstance.get(`/api/auth`);
      setUserData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
      setUserData(null);
      } else {
      console.error("An error occurred while fetching user data:", error);
      }
    }
    // console.log(response.data)
  } 
  // console.log('dklfjsldjkf')
  useEffect(() => {
    fetchUserData()
  }, [])
  if(sessionStorage.getItem('justLoggedIn')){
    notifications.show({
      title:'Login successful!',
      message:"User has been logged in successfuly.",
      color: 'green',
      autoClose:5000
    })
    fetchUserData();
    sessionStorage.removeItem('justLoggedIn');
  }
  return (
    <>
    <Notifications/>
      {!excludedRoutes.includes(location.pathname) && <Navbar userData={userData} setUserData={setUserData}/>}
      <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px"}}> <Loader type="bars" color="lightgreen" size={200}/> </div>}>
        <Routes>
          <Route element={<AdminOnlyRoutes/>}>
            <Route path='/admin' element={<Admin/>}></Route>
          </Route>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/profile/:id' element={<UserProfile loggedUser={userData}/>}></Route>
            <Route path='/profile' element={<Navigate to={`/profile/${userData?.id}`} replace/>}></Route>
            <Route path='/bookmarks' element={<Bookmarks userData={userData}/>}></Route>
          </Route>
          <Route element={<UserAuthRoutes/>}>
            <Route path='/' element={<LandingPage setUserData={setUserData}/>}></Route> 
            <Route path='/login' element={<Login userData={userData}/>}></Route>
            <Route path='/sign-up' element={<SignUp/>}></Route>
          </Route>
          <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
          <Route path='/reset-password' element={<ResetPassword/>}></Route>
          <Route path='/books' element={<BookList/>}></Route> 
          <Route path="/books/:bookId" element={<BookDetails userData={userData} setUserData={setUserData}/>} />
          <Route path='/authors' element={<Authors/>}></Route>
          <Route path='/authors/:authorId' element={<AuthorDetails userData={userData}/>}></Route>
          <Route path='/categories' element={<Categories/>}></Route>
          <Route path='/categories/:categoryId' element={<CategoryDetails/>}></Route>
          <Route path='/bookshelves' element={<Bookshelves/>}></Route>
          <Route path='/general' element={<General/>}></Route>
          <Route path='/contact-us' element={<ContactUs/>}></Route>
          <Route path='/subscribe-to-premium' element={<PremiumSubscription userData={userData} />}></Route>  
          <Route path='*' element={<NotFoundImage/>}></Route>
        </Routes>
      </Suspense>
      </>
  )
}

export default App
