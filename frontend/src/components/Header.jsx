import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => (
  <header>
    <div className="header-inner">
      <Link to="/" className="logo">Quleep 3D</Link>
      <nav className="nav">
        {user && (
          <>
            <span>Welcome, {user.name || user.email || 'User'} </span>
            <button 
              onClick={onLogout}
              style={{ 
                background: 'none', 
                border: '1px solid #2a3b57', 
                color: 'inherit',
                padding: '4px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  </header>
);

export default Header;
