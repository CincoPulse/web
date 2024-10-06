import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import { ControlPanel } from './ControlPanel';
import { QuakeInfo } from './QuakeInfo';

export default function App() {
  return (
    <div className="relative h-full bg-black">
      <QuakeInfo />

      <ControlPanel />

      <Canvas className="bg-black">
        <Experience />
      </Canvas>
    </div>
  );
}
