// components/Pointer.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, BallCollider } from '@react-three/rapier';
import * as THREE from 'three';

const Pointer = ({ vec = new THREE.Vector3(), dir = new THREE.Vector3() }) => {
  const ref = useRef();

  useFrame(({ pointer, viewport, camera }) => {
    vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
    dir.copy(vec).sub(camera.position).normalize();
    vec.add(dir.multiplyScalar(camera.position.length()));
    ref.current?.setNextKinematicTranslation(vec);
  });

  return (
    <RigidBody
      castShadow
      userData={{ cloud: true }}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider castShadow args={[4]} />
    </RigidBody>
  );
};

export default Pointer;
