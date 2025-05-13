import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Favorites from './Pages/Favorites.jsx';
import Forum from './Pages/Forum.jsx';
import Chatbot from './Components/chatBot.jsx';
import Error from './Components/Error.jsx';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login.jsx';
import Layout from './Navigation/Layout.jsx';
import Signup from './Pages/Auth/Signup.tsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<App />} />
        <Route path='/aiChatBot' element={<Chatbot />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/favoriteForum' element={<Favorites />} />
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
