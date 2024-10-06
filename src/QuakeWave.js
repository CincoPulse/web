import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import quakeData from './data/QuakeDB.json';

import useStore from './Store';

export const Model = ({ camRef }) => {
  const props = {};

  const selectedYear = useStore(state => state.year);
  const selectedDay = useStore(state => state.day);

  const quake = quakeData.find(item => item.year === selectedYear && item.day === selectedDay);

  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/assets/wave.glb');
  const { actions } = useAnimations(animations, group);

  let r = quake.magnitude < 1 ? 1.99 : 1.97;
  r = r * 0.5;
  const degToRad = deg => (deg * Math.PI) / 180.0;

  useEffect(() => {
    actions.KeyAction?.play();
  });

  useEffect(() => {
    group.current?.lookAt(0, 0, 0);

    if (quake) {
      const start = { ...camRef.current.position };
      const end = {
        x:
          3.0 *
          r *
          Math.sin(Math.PI / 2 - degToRad(quake.latitude)) *
          Math.sin(degToRad(quake.longitude)),
        y: 3.0 * r * Math.cos(Math.PI / 2 - degToRad(quake.latitude)),
        z:
          3.0 *
          r *
          Math.sin(Math.PI / 2 - degToRad(quake.latitude)) *
          Math.cos(degToRad(quake.longitude)),
      };
      const duration = 600;
      const startTime = performance.now();

      const animate = time => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);

        camRef.current.position.set(
          start.x + (end.x - start.x) * t,
          start.y + (end.y - start.y) * t,
          start.z + (end.z - start.z) * t
        );

        if (t < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [quake, camRef, r]);

  if (!quake) {
    return null;
  }

  return (
    <group {...props} dispose={null}>
      <group
        name="Scene"
        ref={group}
        position={[
          /*  Calculate the x, y, z - coordinates of the position based on latitude and longitude considering
              Spherical coordinates
          */
          r *
            Math.sin(Math.PI / 2 - degToRad(quake.latitude)) *
            Math.sin(degToRad(quake.longitude)),
          r * Math.cos(Math.PI / 2 - degToRad(quake.latitude)),
          r *
            Math.sin(Math.PI / 2 - degToRad(quake.latitude)) *
            Math.cos(degToRad(quake.longitude)),
        ]}
      >
        <mesh
          name="Icosphere"
          geometry={nodes.Icosphere.geometry}
          material={materials['Material.003']}
          morphTargetDictionary={nodes.Icosphere.morphTargetDictionary}
          morphTargetInfluences={nodes.Icosphere.morphTargetInfluences}
          scale={(quake.magnitude < 1.5 ? 0.15 : 0.1) * quake.magnitude * 0.5}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
};

// Preload the wave glTF model
useGLTF.preload('/assets/wave.glb');
