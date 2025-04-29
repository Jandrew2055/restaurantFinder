import React, { FormEvent, JSX } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (): JSX.Element => {
//   const navigate = useNavigate();

  //   const goHome = (e: FormEvent) => {
  //     e.preventDefault();

  //     console.log('testing');
  //     navigate('/home');
  //   };
  //add below to form when ready
  //onSubmit={goHome}
  return (
    <div>
      <form className='signup-form' aria-label='sign up form'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name'></input>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' required></input>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required></input>
        <button type='submit'>Go to Home Page</button>
      </form>
    </div>
  );
};

export default Signup;
