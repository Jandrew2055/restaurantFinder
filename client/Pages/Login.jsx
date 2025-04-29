import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();

    console.log('testing');
    navigate('/home');
  };

  return (
    <div>
      <h1>Welcome to Jose Eats</h1>
      <h3>If it is your first time here, sign up HERE</h3>
      <h3>Otherwise, sign in below!</h3>
      <form onSubmit={goHome}>
        <button type='submit'>Go to Home Page</button>
      </form>
    </div>
  );
};

export default Login;
