import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const goHome = () => {
    console.log('testing');
    navigate('/home');
  };

  return (
    <div>
      <h1>Login Below</h1>
      <button onClick={goHome}>Go to Home Page</button>
    </div>
  );
};

export default Login;
