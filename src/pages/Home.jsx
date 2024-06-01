import * as THREE from 'three';
import { useDarkMode } from '../components/DarkModeContext';
import { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import {
  Clouds,
  Cloud,
  CameraShake,
  OrbitControls,
  ContactShadows,
  Html,
  Environment,
} from '@react-three/drei';
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
} from '@react-three/rapier';
import { random } from 'maath';

import {
  Fenrir,
  Andy,
  Laptop,
  Luna,
  PerspectiveCam,
  Lighting,
} from '../components';

const context = createContext();

export default function Home() {
  const shake = useRef();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <section className="w-full h-screen relative">
      <Canvas shadows>
        <ambientLight intensity={Math.PI / 2} />
        <PerspectiveCam />

        <Lighting />

        {isDarkMode ? (
          <context.Provider value={shake}>
            <CameraShake
              ref={shake}
              decay
              decayRate={0.55}
              maxYaw={0.05}
              maxPitch={0.01}
              yawFrequency={4}
              pitchFrequency={2}
              rollFrequency={2}
              intensity={0}
            />
          </context.Provider>
        ) : (
          <context.Provider value={{}}></context.Provider>
        )}

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
              <Luna />
              <Laptop />
            </>
          ) : (
            <>
              <Andy />
              <Laptop />
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

        <Html castShadow className="w-full h-screen relative">
          <div className="overlay">
            <h1
              style={{
                fontSize: '4em', // Custom font size, could also use Tailwind's text size utilities if they match.
                lineHeight: 0.8, // Custom line height
                padding: '0.7em 0', // Custom padding
                display: 'inline-block', // Ensure the element respects the gradient background properly
              }}
              className={`bg-clip-text text-transparent ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-500 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent'
              }`}
            >
              Hi, <span style={{ fontSize: '.5em' }}> i'm</span>
              <br />
              <span>Andy</span>
              <br />
            </h1>
            <h4
              style={{
                fontSize: '1.5em', // Adjusted for <h4>
                lineHeight: 0.8,
                padding: '0.4em 0',
                display: 'inline-block',
              }}
              className={`bg-clip-text text-transparent ${
                isDarkMode
                  ? 'bg-gradient-to-r from-slate-50 via-indigo-200 to-slate-200 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-slate-500 via-cyan-700 to-zinc-600 bg-clip-text text-transparent'
              }`}
            >
              Software Engineer
              <br />
              Web Developer
              <br />
              Cloud Engineer
              <br />
            </h4>

            <a
              id="contact-btn"
              href="/contact"
              className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500  text-white font-bold py-2 px-4 rounded"
            >
              Contact
            </a>
          </div>
        </Html>
      </Canvas>
    </section>
  );
}

function Puffycloud({ seed, vec = new THREE.Vector3(), isDarkMode, ...props }) {
  const api = useRef();
  const light = useRef();
  const rig = useContext(context);
  const [flash] = useState(
    () => new random.FlashGen({ count: 10, minDuration: 40, maxDuration: 200 })
  );
  const contact = (payload) =>
    payload.other.rigidBodyObject.userData?.cloud &&
    payload.totalForceMagnitude / 1000 > 100 &&
    flash.burst();

  useFrame((state, delta) => {
    // Always apply impulse for movement
    api.current?.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(10)
    );

    // Flash logic only in dark mode
    if (isDarkMode) {
      const impulse = flash.update(state.clock.elapsedTime, delta);
      light.current.intensity = impulse * 15000;
      if (impulse === 1) rig?.current?.setIntensity(1);
    }
  });

  return (
    <RigidBody
      castShadow
      ref={api}
      userData={{ cloud: true }}
      onContactForce={contact}
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
}

function Pointer({ vec = new THREE.Vector3(), dir = new THREE.Vector3() }) {
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
}
