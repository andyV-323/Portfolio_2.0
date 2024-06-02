import React from 'react';
import { RigidBody, BallCollider } from '@react-three/rapier';
import { usePuffycloud } from '../hooks/usePuffycloud';
import { Cloud } from '@react-three/drei';

const Puffycloud = React.memo(({ seed, isDarkMode, ...props }) => {
  const { api, light, flash } = usePuffycloud({ seed, isDarkMode });

  return (
    <RigidBody
      castShadow
      ref={api}
      userData={{ cloud: true }}
      onContactForce={(payload) =>
        payload.other.rigidBodyObject.userData?.cloud &&
        payload.totalForceMagnitude / 1000 > 100 &&
        flash.burst()
      }
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      {...props}
      colliders={false}
    >
      <BallCollider args={[4]} />
      <Cloud
        castShadow
        seed={seed}
        fade={30}
        speed={0.1}
        growth={4}
        segments={40}
        volume={6}
        opacity={0.6}
        bounds={[4, 3, 1]}
      />
      <Cloud
        castShadow
        seed={seed + 1}
        fade={30}
        position={[0, 1, 0]}
        speed={0.5}
        growth={4}
        volume={10}
        opacity={1}
        bounds={[6, 2, 1]}
      />
      <pointLight position={[0, 0, 0.5]} ref={light} color="blue" />
    </RigidBody>
  );
});

export default Puffycloud;
