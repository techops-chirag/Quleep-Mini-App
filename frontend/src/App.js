// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Gallery from './pages/Gallery';
import Viewer from './pages/Viewer';
import './styles.css';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/product/:id" element={<Viewer />} />
      </Routes>
    </div>
  );
};

export default App;
