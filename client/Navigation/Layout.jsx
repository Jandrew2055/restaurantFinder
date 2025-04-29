import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavigationBar = location.pathname === '/';

  return (
    <>
      {!hideNavigationBar && <NavBar />}
      {children}
    </>
  );
};

export default Layout;
