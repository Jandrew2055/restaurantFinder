import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  //redirects to signup component
  const signUp = () => {
    navigate('/signup');
  };

  //after successful login, goes to home page
  const goHome = (e) => {
    e.preventDefault();

    console.log('testing');
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to Jose Eats</h1>
      <h3>
        If it is your first time here, sign up <br />
        <button onClick={signUp}>HERE</button>
      </h3>
      <h3>Otherwise, sign in below!</h3>
      <form onSubmit={goHome}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' required></input>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password'></input>
        <button type='submit'>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
