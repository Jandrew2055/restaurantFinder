import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navigationBar'>
      <ul className='nav-links'>
        <li>
          <Link className='navLink' to='/' title='HomePage'>
            Home
          </Link>
        </li>
        <li>
          <Link
            className='navLink'
            to='/favoriteForum'
            title='Favorite Restaurants'
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link className='navLink' to='/aiChatBot' title='ai chat bot'>
            Ask AI
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
