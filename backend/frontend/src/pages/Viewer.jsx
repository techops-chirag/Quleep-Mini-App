import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';
import ModelCanvas from '../components/ModelCanvas';

const Viewer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetchProductById(id).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <ModelCanvas url={item.model_url} />
    </div>
  );
};

export default Viewer;