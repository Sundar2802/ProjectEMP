import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ClassroomApp</div>
      <nav>
        <ul className="nav-links">
          <li>Home</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
