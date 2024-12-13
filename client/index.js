import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import Forum from './Components/Forum.jsx';
import NavBar from './Components/NavBar.jsx';
import Chatbot from './Components/chatBot.jsx';
import './styles/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/aiChatBot' element={<Chatbot />} />
      <Route path='/favoriteForum' element={<Forum />} />
      <Route path='*' element={<Error />} />
    </Routes>
  </BrowserRouter>
);
