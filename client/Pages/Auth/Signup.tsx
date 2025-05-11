import React, { FormEvent, JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: 'test',
    password: 'test',
  });

  return (
    <div>
      <form className='signup-form' aria-label='sign up form'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          required
        ></input>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          required
        ></input>
        <button type='submit'>Go to Home Page</button>
      </form>
    </div>
  );
};

export default Signup;
