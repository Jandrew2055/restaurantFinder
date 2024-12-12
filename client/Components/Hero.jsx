import React, { useEffect } from 'react';

const HeroSection = (props) => {
  const { addToFavorites } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    addToFavorites();
  };

  return (
    <div>
      <h1>Jose EATS</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' id='firstName' name='firstName' required></input>
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' id='lastName' name='lastName'></input>
        <label htmlFor='favoriteRestaurant'>Favorite Restaurant</label>
        <input
          type='text'
          id='favoriteRestaurant'
          name='favoriteRestaurant'
          required
        ></input>
        <button type='submit'>Add to favorites</button>
      </form>
    </div>
  );
};

export default HeroSection;
