import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const Model = ({ url }) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();

  // Use Google's hosted Draco decoder
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  loader.setDRACOLoader(dracoLoader);

  const [gltf, setGltf] = React.useState(null);

  React.useEffect(() => {
    loader.load(
      url,
      (loadedGltf) => setGltf(loadedGltf),
      undefined,
      (error) => console.error('Error loading model:', error)
    );
  }, [url]);

  if (!gltf) return null;

  return <primitive object={gltf.scene} />;
};

const ModelCanvas = ({ url }) => (
  <div className="viewer">
    <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <Suspense fallback={null}>
        <Model url={url} />
        <Environment preset="warehouse" />
      </Suspense>
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  </div>
);

export default ModelCanvas;
