import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/authContext';
import Guest from './Guest';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!user) {
  //       navigate('/login');
  //     }
  //   }, [user]);

  return <>{!user ? <Guest /> : children}</>;
};

export default ProtectedRoute;
