import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

import fenrirScene from '../assets/3D/Fenrir4.glb';

export function Werewolf({ currentAnimation, position, scale, onClick }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(fenrirScene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    } else if (actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} position={position} scale={scale} onClick={onClick}>
      <group name="Scene">
        <group name="Fenrir" rotation={[Math.PI / 2, 0, 0]}>
          <skinnedMesh
            name="0000_SKL_GOD_Fenrir_Skin4"
            geometry={nodes['0000_SKL_GOD_Fenrir_Skin4'].geometry}
            material={materials.MIC_Fenrir_Skin4}
            skeleton={nodes['0000_SKL_GOD_Fenrir_Skin4'].skeleton}
          />
          <skinnedMesh
            name="0001_SKL_GOD_Fenrir_Skin4"
            geometry={nodes['0001_SKL_GOD_Fenrir_Skin4'].geometry}
            material={materials.MAT_Fenrir_Skin4_Attire}
            skeleton={nodes['0001_SKL_GOD_Fenrir_Skin4'].skeleton}
          />
          <skinnedMesh
            name="0002_SKL_GOD_Fenrir_Skin4"
            geometry={nodes['0002_SKL_GOD_Fenrir_Skin4'].geometry}
            material={materials['MAT_Fenrir04_Glass.001']}
            skeleton={nodes['0002_SKL_GOD_Fenrir_Skin4'].skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/Fenrir2.glb');
