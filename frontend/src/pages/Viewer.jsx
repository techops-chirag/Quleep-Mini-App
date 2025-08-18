import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';
import ModelCanvas from '../components/ModelCanvas';

const isGlbLike = (name = '') => /\.(glb|gltf)$/i.test(name);

const Viewer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [modelUrl, setModelUrl] = useState(null); // active URL (product.model_url or user override)
  const [localObjectUrl, setLocalObjectUrl] = useState(null); // for cleanup

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await fetchProductById(id);
      if (!alive) return;
      setItem(res.data);
      setModelUrl(res.data?.model_url || null);
    })();
    return () => { alive = false; };
  }, [id]);

  // Drag & drop handler for .glb/.gltf file
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!isGlbLike(file.name)) {
      alert('Please drop a .glb or .gltf file');
      return;
    }
    if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);
    const url = URL.createObjectURL(file);
    setLocalObjectUrl(url);
    setModelUrl(url);
  }, [localObjectUrl]);

  const prevent = (e) => e.preventDefault();

  const onUrlSubmit = (e) => {
    e.preventDefault();
    const url = new FormData(e.currentTarget).get('modelurl');
    if (!url) return;
    if (!isGlbLike(String(url))) {
      alert('URL must end with .glb or .gltf');
      return;
    }
    setModelUrl(String(url));
  };

  const resetToProduct = () => {
    if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);
    setLocalObjectUrl(null);
    if (item?.model_url) setModelUrl(item.model_url);
  };

  if (!item) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <h2>{item.name}</h2>
      <p className="desc">{item.description}</p>

      <div
        className="dropwrap"
        onDragOver={prevent}
        onDragEnter={prevent}
        onDrop={onDrop}
        title="Drag & drop a .glb/.gltf file to temporarily replace the model"
      >
        {modelUrl && <ModelCanvas url={modelUrl} />}
        <div className="dropzone">
          <span>Drag & drop .glb/.gltf here to preview</span>
        </div>
      </div>

      <form className="urlbar" onSubmit={onUrlSubmit}>
        <input name="modelurl" placeholder="…or paste a .glb/.gltf URL and press Enter" />
        <button type="submit">Load URL</button>
        <button type="button" onClick={resetToProduct}>Reset to Product Model</button>
      </form>
    </div>
  );
};

export default Viewer;
