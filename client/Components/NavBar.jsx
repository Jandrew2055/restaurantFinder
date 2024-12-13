import React from 'react';

const NavBar = (props) => {
  const { getUserLocation } = props;
  return (
    <div className='navigationBar'>
      <ul>
        <li>Home</li>
        <li onClick={getUserLocation}>Near Me</li>
        <li>About</li>
      </ul>
    </div>
  );
};
export default NavBar;
