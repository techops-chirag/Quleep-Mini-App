import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Link to={`/viewer/${product.id}`} className="card">
    <img src={product.image_url} alt={product.name} loading="lazy" />
    <div className="card-body">
      <div className="badge">{product.category}</div>
      <h3>{product.name}</h3>
      <p className="price">₹{Number(product.price).toLocaleString('en-IN')}</p>
    </div>
  </Link>
);

export default ProductCard;
