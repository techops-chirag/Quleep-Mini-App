import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Gallery from './pages/Gallery';
import Viewer from './pages/Viewer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './styles.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignup = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuthMode('login'); // Reset to login page after logout
  };

  const switchToLogin = () => setAuthMode('login');
  const switchToSignup = () => setAuthMode('signup');

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  // Show authentication pages if user is not logged in
  if (!user) {
    if (authMode === 'signup') {
      return <Signup onSignup={handleSignup} onSwitchToLogin={switchToLogin} />;
    }
    return <Login onLogin={handleLogin} onSwitchToSignup={switchToSignup} />;
  }

  // Main app routes for authenticated users
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/viewer/:id" element={<Viewer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
