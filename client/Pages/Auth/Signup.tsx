import React, { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../../Models/supabaseClient';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //handle changes to form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //update form data accordingly
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handling submission of form
  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // //will go inside the fetch request below
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // };
    try {
      //signs up user using Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      //if error is encountered, notify the user
      if (error) {
        console.log('error signing up user Supabase:', error);
      }

      //DELETE BELOW, JUST TESTING if user is signed up
      console.log('testing user data:', data.user);
    } catch (error) {
      console.log('error:', error);
    }

    navigate('/');
  };

  return (
    <div>
      <h1>Sign up to start favoriting restaurants!</h1>
      <form
        className='signup-form'
        aria-label='sign up form'
        onSubmit={handleSignup}
      >
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          required
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          required
        ></input>
        <button type='submit'>Go to Home Page</button>
      </form>
    </div>
  );
};

export default Signup;
