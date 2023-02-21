import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import HomePage from '../pages/home/HomePage';
import OAuthRedirectHandler from '../component/login/OAuthRedirectHandler';
import NotFoundPage from '../pages/error/NotFoundPage';
import UnauthorizedPage from '../pages/error/UnauthorizedPage';
import Owner from './Owner';


const User = () => {
  return (
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/oauth2/redirect' element={<OAuthRedirectHandler/>}/>

            <Route path='/dashboard/*' element={<Owner/>} />

            <Route path='/404'element={<NotFoundPage/>} />
            <Route path='/401'element={<UnauthorizedPage/>} />
            <Route path='/*'element={<NotFoundPage/>} />
        </Routes>

  )
}

export default User;