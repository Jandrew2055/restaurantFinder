import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  const location = useLocation();
  const hideNavigationBar =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavigationBar && <NavBar />}
      <Outlet />
    </>
  );
};

export default Layout;
