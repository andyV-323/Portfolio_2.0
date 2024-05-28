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
  PerspectiveCamera,
  Html,
  Sky,
  Environment,
} from '@react-three/drei';
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
} from '@react-three/rapier';
import { random } from 'maath';
import { useControls } from 'leva';

import { Werewolf, Me, Macbook } from '../models';
import { Moon } from '../models/Moon';

const context = createContext();
const sunPosition = [-200, 50, -100];

export default function Home() {
  const shake = useRef();

  const { isDarkMode, toggleDarkMode } = useDarkMode();
  console.log({ isDarkMode, toggleDarkMode });

  const adjustWerewolfForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [4.9, 4.9, 4.9];
      screenPosition = [0, -10, -25];
    } else {
      screenScale = [5, 5, 5];
      screenPosition = [0, -11, -25];
    }

    return [screenScale, screenPosition];
  };
  const adjustMoonForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [499, 499, 499];
      screenPosition = [-300, 400, -800];
    } else {
      screenScale = [500, 500, 500];
      screenPosition = [-300, 400, -800];
    }

    return [screenScale, screenPosition];
  };

  const adjustMacbookForScreenSize = () => {
    let screenScale, screenPosition, screenRotation;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -10.5, 6.5];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -10.5, 6.5];
    }

    return [screenScale, screenPosition, screenRotation];
  };

  const adjustMeForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [5.9, 5.9, 5.9];
      screenPosition = [0, -10, 0];
    } else {
      screenScale = [6, 6, 6];
      screenPosition = [0, -10, 0];
    }

    return [screenScale, screenPosition];
  };
  const [macAnimation, setMacAnimation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [moonScale, moonPosition] = adjustMoonForScreenSize();
  const [werewolfScale, werewolfPosition] = adjustWerewolfForScreenSize();
  const [macbookScale, macbookPosition] = adjustMacbookForScreenSize();
  const [meScale, mePosition] = adjustMeForScreenSize();
  const [meAnimIndex, setMeAnimIndex] = useState(0);

  const fenrirAnim = ['thriller', 'waving'];
  const meAnim = ['stand', 'waving1', 'kneeling'];
  const meAnimDurations = {
    stand: 6000,
    waving1: 5000,
    kneeling: 3000,
  };

  const handleFenrirClick = () => {
    const randomIndex = Math.floor(Math.random() * fenrirAnim.length);
    const randAnim = fenrirAnim[randomIndex];
    setCurrentAnimation(randAnim);
    setTimeout(() => {
      setCurrentAnimation('Idle');
    }, 28000);
  };
  const handleMeClick = () => {
    let index = 0;

    function playNextAnimation() {
      if (index < meAnim.length) {
        setCurrentAnimation(meAnim[index]);

        const duration = meAnimDurations[meAnim[index]] || 3000;
        setTimeout(playNextAnimation, duration);
        index++;
      } else {
        setCurrentAnimation('sitting');
        setMeAnimIndex(0);
      }
    }

    playNextAnimation();
  };

  const handleMacClick = () => {
    setMacAnimation((prev) => (prev ? '' : 'Animation'));
  };

  return (
    <section className="w-full h-screen relative">
      <Canvas shadows>
        <ambientLight intensity={Math.PI / 2} />
        <PerspectiveCamera
          makeDefault
          position={[0, -4, 18]}
          fov={90}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        >
          <spotLight
            position={[0, 40, 2]}
            angle={0.5}
            decay={1}
            distance={45}
            penumbra={1}
            intensity={200}
          />
          <spotLight
            position={[-19, 0, -8]}
            color={isDarkMode ? 'blue' : 'orange'}
            angle={0.25}
            decay={0.75}
            distance={185}
            penumbra={-1}
            intensity={100}
          />
          <Sky
            distance={4500}
            receiveShadow={true}
            castShadow={true}
            sunPosition={isDarkMode ? [-100, -100, -100] : [-200, 50, -100]}
            inclination={isDarkMode ? 0 : 0.6}
            azimuth={isDarkMode ? 0.25 : 0.75}
          />
          <directionalLight
            position={sunPosition}
            intensity={15}
            castShadow={true}
            shadow-mapSize-width={2048} // Adjust based on needed resolution
            shadow-mapSize-height={2048} // Adjust based on needed resolution
            shadow-camera-far={3500}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={500}
            shadow-camera-bottom={-500}
          />
        </PerspectiveCamera>
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
          </context.Provider>
        ) : (
          <context.Provider value={{}}>
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
          </context.Provider>
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
              <Werewolf
                position={werewolfPosition}
                scale={werewolfScale}
                onClick={handleFenrirClick}
                currentAnimation={currentAnimation}
              />
              <Moon position={moonPosition} scale={moonScale} />
              <Macbook
                position={macbookPosition}
                scale={macbookScale}
                macAnimation={'Animation'}
                castShadow={true}
                receiveShadow={true}
              />
              <Environment files="./images/kloppenheim_02_4k.hdr" background />
            </>
          ) : (
            <>
              <Me
                position={mePosition}
                scale={meScale}
                onClick={handleMeClick}
                currentAnimation={currentAnimation}
                receiveShadow={true}
                castShadow={true}
              />
              <Macbook
                position={macbookPosition}
                scale={macbookScale}
                macAnimation={setCurrentAnimation}
                onClick={handleMacClick}
                castShadow={true}
                receiveShadow={true}
              />
              <Environment
                files="./images/kloofendal_48d_partly_cloudy_puresky_4k.hdr"
                background
              />
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

        <ContactShadows
          opacity={0.25}
          color="black"
          position={[0, -10, 0]}
          scale={50}
          blur={2.5}
          far={40}
        />
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
