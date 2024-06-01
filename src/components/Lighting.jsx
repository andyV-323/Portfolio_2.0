import React from 'react';
import { useDarkMode } from '../components/DarkModeContext';

const Lighting = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const sunPosition = [-200, 50, -100];
  return (
    <>
      <ambientLight intensity={Math.PI / 2} />
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
      {children}
    </>
  );
};

export default Lighting;
