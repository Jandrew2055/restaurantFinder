import React, { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';

const HeroSection = (props) => {
  const { addToFavorites } = props; //function to add restaurant that is in the form to database
  const { pending } = useFormStatus(); //keeps track of form status, pending true or false for submission
  const { register, reset } = useForm(); //allows to use the reset() for fields, requires to register inputs
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [favoriteRestaurant, setFavoriteRestaurant] = useState('');

  //handles submitting of form and sending favorite restaurant
  const handleSubmit = (event) => {
    event.preventDefault(); //if form submision does not act, then this prevents default action from occurring (page reloading)
    // setPending(true);
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const favoriteRestaurant = event.target.favoriteRestaurant.value;
    console.log('firstName: ', firstName);
    console.log('lastName: ', lastName);
    console.log('favorite restaurant: ', favoriteRestaurant);

    reset();

    // addToFavorites();
  };

  return (
    <div>
      <h1>Jose EATS</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name </label>
        <input
          type='text'
          id='firstName'
          name='firstName'
          {...register('firstName')}
          placeholder='required'
          required
        ></input>
        <label htmlFor='lastName'>Last Name </label>
        <input
          type='text'
          id='lastName'
          name='lastName'
          {...register('lastName')}
          placeholder='optional'
        ></input>
        <label htmlFor='favoriteRestaurant'>Favorite Restaurant </label>
        <input
          type='text'
          id='favoriteRestaurant'
          name='favoriteRestaurant'
          {...register('favoriteRestaurant')}
          placeholder='required'
          required
        ></input>
        <button type='submit' disabled={pending}>
          {pending ? 'adding to favorites' : 'Add to favorites'}
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
