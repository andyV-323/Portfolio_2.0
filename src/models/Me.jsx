/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import meScene from '../assets/3D/meAvaturn2.glb';

export function Me({
  currentAnimation,
  position,
  scale,
  onClick,
  onPointerOver,
  onPointerOut,
}) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(meScene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    } else if (actions['sitting']) {
      actions['sitting'].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOut={onPointerOut}
      onPointerOver={onPointerOver}
    >
      <group name="Scene">
        <group name="Avatar">
          <skinnedMesh
            name="avaturn_body"
            geometry={nodes.avaturn_body.geometry}
            material={materials.avaturn_body_material}
            skeleton={nodes.avaturn_body.skeleton}
          />
          <skinnedMesh
            name="avaturn_glasses_0"
            geometry={nodes.avaturn_glasses_0.geometry}
            material={materials.avaturn_glasses_0_material}
            skeleton={nodes.avaturn_glasses_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_glasses_1"
            geometry={nodes.avaturn_glasses_1.geometry}
            material={materials.avaturn_glasses_1_material}
            skeleton={nodes.avaturn_glasses_1.skeleton}
          />
          <skinnedMesh
            name="avaturn_hair_0"
            geometry={nodes.avaturn_hair_0.geometry}
            material={materials.avaturn_hair_0_material}
            skeleton={nodes.avaturn_hair_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_look_0"
            geometry={nodes.avaturn_look_0.geometry}
            material={materials.avaturn_look_0_material}
            skeleton={nodes.avaturn_look_0.skeleton}
          />
          <skinnedMesh
            name="avaturn_shoes_0"
            geometry={nodes.avaturn_shoes_0.geometry}
            material={materials.avaturn_shoes_0_material}
            skeleton={nodes.avaturn_shoes_0.skeleton}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/meAvaturn.glb');
