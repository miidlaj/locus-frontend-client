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
          </Routes>

        </div>
    </BrowserRouter>
  );
}

export default App;
