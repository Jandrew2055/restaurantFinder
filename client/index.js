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
import AuthProvider from './Contexts/authContext.tsx';
import ProtectedRoute from './Components/ProtectedRoute.tsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<App />} />
          <Route
            path='/aiChatBot'
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forum'
            element={
              <ProtectedRoute>
                <Forum />
              </ProtectedRoute>
            }
          />
          <Route
            path='/favorites'
            element={
              // <Favorites />
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
