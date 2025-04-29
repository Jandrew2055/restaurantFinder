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
          <Link className='navLink' to='/aiChatBot' title='AI Chat Bot'>
            Ask AI
          </Link>
        </li>
        <li>
          <Link className='navLink' to='/forum' title='Forum page'>
            Forum
          </Link>
        </li>
        <li>
          <Link className='navLink' to='/login' title='LoginPage'>
            Sign in
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default NavBar;
