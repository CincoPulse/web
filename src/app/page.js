'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { QuakeInfo } from '../moonquake/QuakeInfo';
import { Experience } from '../moonquake/Experience';
import { ControlPanel } from '../moonquake/ControlPanel';

export default function Home() {
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
