// PerspectiveCam.js
import React from 'react';
import { PerspectiveCamera, Sky } from '@react-three/drei';
import { useDarkMode } from '../components/DarkModeContext';

const PerspectiveCam = () => {
  const { isDarkMode } = useDarkMode();
  const sunPosition = [-200, 50, -100];

  return (
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
      <Sky
        distance={4500}
        receiveShadow={true}
        castShadow={true}
        sunPosition={isDarkMode ? [-100, -100, -100] : sunPosition}
        inclination={isDarkMode ? 0 : 0.6}
        azimuth={isDarkMode ? 0.25 : 0.75}
      />
    </PerspectiveCamera>
  );
};

export default PerspectiveCam;
