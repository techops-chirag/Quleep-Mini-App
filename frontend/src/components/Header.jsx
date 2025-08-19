import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="header-inner">
      <Link to="/" className="logo">Quleep 3D Gallery</Link>
      <nav className="nav">
        <a href="https://threejs.org/" target="_blank" rel="noreferrer">ThreeJS</a>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a>
      </nav>
    </div>
  </header>
);

export default Header;
