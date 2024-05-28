import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useCursor,
  MeshReflectorMaterial,
  Image,
  Text,
  Environment,
  Sky,
} from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { projects } from '../constants';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext';

const GOLDENRATIO = 1;

export const Projects = () => {
  const { isDarkMode } = useDarkMode();
  const BackgroundSetter = () => {
    const { gl } = useThree();
    useEffect(() => {
      gl.setClearColor(isDarkMode ? '#353b48' : '#dcdde1');
    }, [isDarkMode, gl]);

    return null;
  };
  const [cameraProps, setCameraProps] = useState({
    fov: 70,
    position: [0, 2, 15],
  });

  const adjustCamera = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setCameraProps({
        fov: 3000,
        position: [0, 2, 15],
      });
    } else {
      setCameraProps({
        fov: 70,
        position: [0, 2, 15],
      });
    }
  };

  useEffect(() => {
    adjustCamera();
    window.addEventListener('resize', adjustCamera);

    return () => {
      window.removeEventListener('resize', adjustCamera);
    };
  }, []);

  return (
    <section className="w-full h-screen relative">
      <Canvas dpr={[1, 1.5]} camera={cameraProps}>
        <Sky
          distance={4500}
          receiveShadow={true}
          castShadow={true}
          sunPosition={isDarkMode ? [-100, -100, -100] : [-200, 50, -100]}
          inclination={isDarkMode ? 0 : 0.6}
          azimuth={isDarkMode ? 0.25 : 0.75}
        />

        <fog attach="fog" args={['#191920', 0, 15]} />
        <group position={[0, -0.5, 0]}>
          <Frames images={projects.images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
            />
          </mesh>
        </group>

        {isDarkMode ? (
          <Environment files="./images/moonlit_golf_4k.hdr" background />
        ) : (
          <Environment
            files="./images/kloofendal_48d_partly_cloudy_puresky_4k.hdr"
            background
          />
        )}
      </Canvas>
    </section>
  );
};

function Frames({
  images,

  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt);
    easing.dampQ(state.camera.quaternion, q, 0.4, dt);
  });
  return (
    <group
      ref={ref}
      onClick={(e) => (
        e.stopPropagation(),
        setLocation(
          clicked.current === e.object ? '/' : '/item/' + e.object.name
        )
      )}
      onPointerMissed={() => setLocation('/')}
    >
      {images.map(
        (props) => <Frame key={props.url} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({ url, text, c = new THREE.Color(), ...props }) {
  const image = useRef();
  const frame = useRef();
  const textMesh = useRef();
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);
  const [textHovered, setTextHovered] = useState(false);
  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  const navigate = useNavigate();

  useCursor(hovered);
  useFrame((state, dt) => {
    easing.damp3(
      image.current.scale,
      [
        0.85 * (!isActive && hovered ? 0.85 : 1),
        0.9 * (!isActive && hovered ? 0.905 : 1),
        1,
      ],
      0.1,
      dt
    );
    easing.dampC(
      frame.current.material.color,
      hovered ? '#48dbfb' : 'white',
      0.1,
      dt
    );
  });

  const handleClick = (e, link) => {
    e.stopPropagation();
    window.open(link, '_blank'); // Opens the link in a new tab
  };

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#dfe6e9"
          metalness={1}
          roughness={0}
          envMapIntensity={1}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <Text
        ref={textMesh}
        text={text}
        color={textHovered ? '#48dbfb' : 'white'} // Highlight color
        maxWidth={0.1}
        position={[0, 0.1, 0.5]} // Adjust z to bring in front of image
        fontSize={0.03}
        onPointerOver={(e) => (
          e.stopPropagation(), setTextHovered(true), hover(true)
        )}
        onPointerOut={() => {
          setTextHovered(false);
          hover(false);
        }}
        onClick={(e) => handleClick(e, text)} // Using text as a URL here
      >
        {name.split('-').join(' ')}
      </Text>
    </group>
  );
}
