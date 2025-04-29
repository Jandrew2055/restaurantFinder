import React, { JSX } from 'react';

const Signup = (): JSX.Element => {
  //add below to form when ready
  //onSubmit={goHome}
  return (
    <div>
      <form aria-label='sign up form'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name'></input>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email'></input>
        <button type='submit'>Go to Home Page</button>
      </form>
    </div>
  );
};

export default Signup;
