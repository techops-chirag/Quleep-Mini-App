import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="header-inner">
      <Link to="/" className="logo">Quleep 3D Gallery</Link>
    </div>
  </header>
);

export default Header;
