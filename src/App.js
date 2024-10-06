import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import { ControlPanel } from './ControlPanel';
import { QuakeInfo } from './QuakeInfo';

export default function App() {
  return (
    <>
      <div style={{ backgroundColor: 'black', display: 'flex' }}>
        <ControlPanel />

        <QuakeInfo />
      </div>
      <Canvas style={{ backgroundColor: 'black' }}>
        <Experience />
      </Canvas>
    </>
  );
}
