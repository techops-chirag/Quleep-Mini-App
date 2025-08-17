import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchProducts({ q, category }).then((res) => setItems(res.data));
  }, [q, category]);

  return (
    <div className="container">
      <SearchBar q={q} setQ={setQ} category={category} setCategory={setCategory} />
      <div className="grid">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default Gallery;