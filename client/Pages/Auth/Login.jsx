import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //redirects to signup component
  const signUp = () => {
    console.log('Navigating to signup...');
    navigate('/signup');
    return;
  };

  //handle inputChanges
  const handleInput = (e) => {
    const { name, value } = e.target;

    //update form data
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //after successful login, goes to home page
  const handleLogin = async (e) => {
    e.preventDefault();

    //will go inside the fetch request below
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    try {
      //make a request to the signup endpoint, send formdata
      const response = await fetch('/api/auth/login', options);
      const data = await response.json();

      //DELETE BELOW, JUST TESTING
      console.log('testing data received from server:', data);
    } catch (error) {
      console.log('error:', error);
    }

    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to Jose Eats</h1>
      <h2>Sign in</h2>
      <form aria-label='login form' onSubmit={handleLogin}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={handleInput}
          value={formData.email}
          required
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleInput}
          value={formData.password}
          required
        ></input>
        <button type='submit'>Sign in</button>
      </form>
      <h4>
        If it is your first time here, sign up <br />
        <button onClick={signUp}>HERE</button>
      </h4>
    </div>
  );
};

export default Login;
