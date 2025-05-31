import React, { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import supabase from '../../Models/supabaseClient';
import { useAuth } from '../../Contexts/authContext';

const Signup = () => {
  // const navigate = useNavigate();
  const { signup } = useAuth();
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

    const { error, data } = await signup(formData.email, formData.password);

    if (error) {
      alert('Sign up failed' + error.message);
    }
    console.log('testing data:', data);

    // navigate('/');
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
