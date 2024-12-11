import React from 'react';
import { useState, useEffect } from 'react';
import DisplayRestaurants from './Components/DisplayRestaurants.jsx';
import NavBar from './Components/NavBar.jsx';
import FooterBar from './Components/Footer.jsx';
import HeroSection from './Components/Hero.jsx';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);

  //grabs the user's location to then utilize the coordinates to get the restaurants near them
  const getUserLocation = () => {
    if (navigator.geolocation) {
      console.log(
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position);
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log('Latitude: ', latitude);
          console.log('Longitude: ', longitude);
        }),

        (err) => {
          console.warn({ code: err.code, log: `ERROR: ${err}` });
        }
      );
    } else {
      alert('Your browser does not support location');
    }
  };

  console.log(userLocation);
  // console.log(userLocation.latitude);
  // console.log(userLocation.longitude);

  return (
    <div>
      <NavBar getUserLocation={getUserLocation}></NavBar>
      <HeroSection></HeroSection>
      <DisplayRestaurants userLocation={userLocation}></DisplayRestaurants>
      <FooterBar></FooterBar>
    </div>
  );
};

export default App;
