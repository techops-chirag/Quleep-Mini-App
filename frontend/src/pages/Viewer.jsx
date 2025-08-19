import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api';
import ModelCanvas from '../components/ModelCanvas';

const isGlbLike = (name = '') => /(\.glb|\.gltf)$/i.test(name);

const Viewer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [modelUrl, setModelUrl] = useState(null); // active URL (product.model_url or user override)
  const [localObjectUrl, setLocalObjectUrl] = useState(null); // for cleanup

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchProductById(id);
        if (!alive) return;
        setItem(res.data);
        setModelUrl(res.data.model_url);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  // Drag & drop local .glb/.gltf
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    if (!isGlbLike(f.name)) {
      alert('Please drop a .glb or .gltf file');
      return;
    }
    const url = URL.createObjectURL(f);
    if (localObjectUrl) URL.revokeObjectURL(localObjectUrl);
    setLocalObjectUrl(url);
    setModelUrl(url);
  }, [localObjectUrl]);

  const onUrlSubmit = (e) => {
    e.preventDefault();
    const url = new FormData(e.currentTarget).get('modelurl');
    if (!url || !isGlbLike(String(url))) {
      alert('Enter a valid .glb/.gltf URL');
      return;
    }
    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
    }
    setModelUrl(String(url));
  };

  const resetToProduct = () => {
    if (localObjectUrl) {
      URL.revokeObjectURL(localObjectUrl);
      setLocalObjectUrl(null);
    }
    if (item) setModelUrl(item.model_url);
  };

  if (!item) return <div className="container"><p>Loading…</p></div>;

  return (
    <div className="container">
      <div className="viewer-wrap">
        <ModelCanvas url={modelUrl} />
        <div className="details">
          <div className="badge">{item.category}</div>
          <h2>{item.name}</h2>
          <p className="price">₹{Number(item.price).toLocaleString('en-IN')}</p>
          <p style={{opacity:.8}}>{item.description}</p>

          <div
            className="dropwrap"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <span>Drag &amp; drop .glb/.gltf here to preview</span>
          </div>
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
