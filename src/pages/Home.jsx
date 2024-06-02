// Home.js
import * as THREE from 'three';
import { useDarkMode } from '../components/DarkModeContext';
import { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Clouds,
  Cloud,
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import { CuboidCollider, Physics } from '@react-three/rapier';
import {
  Fenrir,
  Andy,
  Laptop,
  Luna,
  PerspectiveCam,
  Lighting,
  Overlay,
  Puffycloud,
  Pointer,
} from '../components';
import { Context } from '../components/Context';

export default function Home() {
  const { isDarkMode } = useDarkMode();
  const shakeRef = useRef();
  const contextValue = useMemo(() => ({ shakeRef }), [isDarkMode]);

  return (
    <section className="w-full h-screen relative">
      <Canvas shadows>
        <ambientLight intensity={Math.PI / 2} />
        <PerspectiveCam />
        <Lighting />
        <Context.Provider value={contextValue}>
          <Clouds
            limit={400}
            material={THREE.MeshLambertMaterial}
            castShadow={true}
            receiveShadow
          >
            <Physics gravity={[0, 0, 0]}>
              <Pointer />
              <Puffycloud
                seed={10}
                position={[50, 0, 0]}
                castShadow
                isDarkMode={isDarkMode}
              />
              <Puffycloud
                seed={20}
                position={[0, 50, 0]}
                castShadow
                isDarkMode={isDarkMode}
              />
              <Puffycloud
                seed={30}
                position={[50, 0, 50]}
                castShadow
                isDarkMode={isDarkMode}
              />
              <Puffycloud
                seed={40}
                position={[0, 0, -50]}
                castShadow
                isDarkMode={isDarkMode}
              />
              <CuboidCollider
                position={[0, -5, 0]}
                args={[400, 10, 400]}
                castShadow
              />
            </Physics>
          </Clouds>
        </Context.Provider>

        <OrbitControls
          makeDefault
          autoRotate={false}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 1.7}
          maxPolarAngle={Math.PI / 1.7}
        />

        <mesh receiveShadow={true} castShadow={true}>
          {isDarkMode ? (
            <>
              <Fenrir />
            </>
          ) : (
            <>
              <Andy />
            </>
          )}
        </mesh>

        <mesh
          receiveShadow={true}
          position={[0, -10.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial color={isDarkMode ? 'black' : 'white'} />
        </mesh>

        <ContactShadows
          opacity={0.25}
          color="black"
          position={[0, -10, 0]}
          scale={50}
          blur={2.5}
          far={40}
        />
        <Overlay />
      </Canvas>
    </section>
  );
}
