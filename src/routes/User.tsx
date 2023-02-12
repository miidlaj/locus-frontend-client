import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import HomePage from '../pages/home/HomePage';
import OAuthRedirectHandler from '../component/login/OAuthRedirectHandler';


const User = () => {
  return (
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/oauth2/redirect' element={<OAuthRedirectHandler/>}/>
        </Routes>

  )
}

export default User;