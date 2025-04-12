import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Favorites from './Pages/Favorites.jsx';
import Forum from './Pages/Forum.jsx';
import NavBar from './Navigation/NavBar.jsx';
import Chatbot from './Components/chatBot.jsx';
import Error from './Components/Error.jsx';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/aiChatBot' element={<Chatbot />} />
      <Route path='/forum' element={<Forum />} />
      <Route path='/favoriteForum' element={<Favorites />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </BrowserRouter>
);
