import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Menu } from '../../assets/icons/menu-outline.svg';
import { ReactComponent as Close } from '../../assets/icons/close-outline.svg';
import CartLink from '../cartLink/CartLink';
import './navBar.css';

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`nav-bar ${open ? 'open' : ''}`}
      onClick={() => {
        if (open) setOpen(false);
      }}
    >
      <button className="burger" onClick={() => setOpen(!open)}>
        {open ? <Close width="30px" color="white" /> : <Menu width="30px" color="inherit" />}
      </button>
      <CartLink />
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Store</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Location</Link>
          </li>
        </ul>
      </nav>

      <div className="nav-store-title" aria-hidden="true">
        <div className="store-name">The Plant Shop</div>
        <span className="location">Malmö | Sweden</span>
      </div>
    </div>
  );
}

export default NavBar;
