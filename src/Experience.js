// Importing necessary React components and hooks from external libraries (drei)
import { useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React, { useRef } from 'react';
import * as three from 'three';

// Import quake wave model
import Model from './QuakeWave';

// Import the custom store
import useStore from './Store';

// Define Experience component
export default function Experience({ hasStarted }) {
  const groupRef = useRef();

  const view = useStore(state => state.view);
  const year = useStore(state => state.year);
  const day = useStore(state => state.day);

  const isPlaying = useStore(state => state.isPlaying);
  const cameraRef = useRef();

  const moonTexture = useLoader(three.TextureLoader, '/assets/moonTexture.jpg');
  const heightMapTexture = useLoader(three.TextureLoader, '/assets/height.jpg');

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} ref={cameraRef} />

      <OrbitControls
        enableZoom={true}
        minDistance={1.2}
        maxDistance={7}
        enablePan={true}
        autoRotate={false}
      />

      <group ref={groupRef}>
        <mesh>
          <ambientLight intensity={0.2} />
          <directionalLight />

          <sphereGeometry args={[1, 32, 32]} />

          <meshStandardMaterial map={view ? moonTexture : heightMapTexture} />
          {isPlaying && <Model camRef={cameraRef} />}
        </mesh>
      </group>
    </>
  );
}
