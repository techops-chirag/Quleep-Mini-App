import React from 'react';

const SearchBar = ({ q, setQ, category, setCategory }) => (
  <div className="toolbar">
    <input
      className="input"
      placeholder="Search products..."
      value={q}
      onChange={(e) => setQ(e.target.value)}
    />
    <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
      <option value="">All Categories</option>
      <option value="Decor">Decor</option>
      <option value="Accessories">Accessories</option>
      <option value="Electronics">Electronics</option>
      <option value="Kitchen">Kitchen</option>
    </select>
  </div>
);

export default SearchBar;