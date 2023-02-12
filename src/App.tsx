import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './routes/User';

function App() {
  return (
    <BrowserRouter>
      
        <div className="">
          <Routes>
            <Route path='/*'element={<User/>} />
            {/* <Route path='/home'element={<HomePage/>} />
            <Route path='/login'element={<LoginPage/>} />
            <Route path='/register'element={<RegisterPage/>} />

            <Route path='/404'element={<NotFoundPage/>} />
            <Route path='/401'element={<UnauthorizedPage/>} />
            <Route path='/*'element={<NotFoundPage/>} /> */}
          </Routes>

        </div>
    </BrowserRouter>
  );
}

export default App;
