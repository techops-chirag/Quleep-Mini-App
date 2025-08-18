import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Gallery from './pages/Gallery';
import Viewer from './pages/Viewer';

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/viewer/:id" element={<Viewer />} />
    </Routes>
  </>
);

export default App;