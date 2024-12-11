import React from 'react';

const NavBar = (props) => {
  const { getUserLocation } = props;
  return (
    <div>
      <ul>
        <li>Home</li>
        <button onClick={getUserLocation}>Near Me</button>
        <li>About</li>
      </ul>
    </div>
  );
};
export default NavBar;
