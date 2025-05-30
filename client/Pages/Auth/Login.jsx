import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import supabase from './../../Models/supabaseClient';
import { useAuth } from '../../Contexts/authContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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

    //use the login from custom hook
    const { error, data } = await login(formData.email, formData.password);
    if (error) {
      alert('Login failed: ' + error.message);
    }

    console.log('testing data:', data);
    //DELETE  below, not needee
    // //will go inside the fetch request below
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // };
    // try {
    //   const { data, error } = await supabase.auth.signInWithPassword({
    //     email: formData.email,
    //     password: formData.password,
    //   });

    //   if (error) {
    //     console.log('error signing in with Supabase:', error);
    //     return;
    //   }
    //   console.log('testing data received:', data);
    // } catch (error) {
    //   console.log('error:', error);
    // }

    // navigate('/');
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
