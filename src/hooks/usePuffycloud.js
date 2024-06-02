import { useRef, useState, useContext, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { random } from 'maath';

export const usePuffycloud = ({ seed, isDarkMode }) => {
  const context = createContext();
  const api = useRef();
  const light = useRef();
  const rig = useContext(context);
  const [flash] = useState(
    () => new random.FlashGen({ count: 10, minDuration: 40, maxDuration: 200 })
  );

  useFrame((state, delta) => {
    const vec = new THREE.Vector3();
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(10)
    );

    if (isDarkMode) {
      const impulse = flash.update(state.clock.elapsedTime, delta);
      light.current.intensity = impulse * 15000;
      if (impulse === 1) rig?.current?.setIntensity(1);
    }
  });

  return { api, light, flash };
};
