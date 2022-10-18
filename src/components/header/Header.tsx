import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import './header.css';

function Header() {
  const onHomePage = useLocation().pathname === '/';
  const onCheckOut = useLocation().pathname === '/checkout';

  return (
    <header
      className="header"
      style={{
        boxShadow: `${onHomePage ? 'none' : ''}`,
        backgroundColor: `${onHomePage ? 'transparent' : ''}`,
        color: `${onHomePage ? 'white' : ''}`,
      }}
    >
      <div className="title">
        <h1 className="store-name">The Plant Shop</h1>
        <span
          className="location"
          style={{
            display: `${onCheckOut ? 'none' : ''}`,
          }}
        >
          Malmö | Sweden
        </span>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
