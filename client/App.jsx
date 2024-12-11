import React from 'react';
import DisplayRestaurants from './Components/DisplayRestaurants.jsx';
import NavBar from './Components/NavBar.jsx';
import FooterBar from './Components/Footer.jsx';
import HeroSection from './Components/Hero.jsx';

const App = () => {
  return (
    <div>
      <NavBar></NavBar>
      <HeroSection></HeroSection>
      <DisplayRestaurants></DisplayRestaurants>
      <FooterBar></FooterBar>
    </div>
  );
};

export default App;
