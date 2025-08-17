import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = ({ url }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} scale={2} />;
};

const ModelCanvas = ({ url }) => (
  <Canvas style={{ height: '80vh', background: '#111' }} camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 2]} intensity={1} />
    <Suspense fallback={null}>
      <Model url={url} />
      <Environment preset="city" />
    </Suspense>
    <OrbitControls enablePan enableZoom enableRotate />
  </Canvas>
);

export default ModelCanvas;