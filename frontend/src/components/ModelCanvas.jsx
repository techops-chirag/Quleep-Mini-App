import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} />;
};

const ModelCanvas = ({ url }) => (
  <div className="viewer">
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Suspense fallback={null}>
        <Model url={url} />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  </div>
);

export default ModelCanvas;
