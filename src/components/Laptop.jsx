import React, { useState } from 'react';
import { Macbook } from '../models';

const Laptop = () => {
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [macAnimation, setMacAnimation] = useState(false);

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
  const [macbookScale, macbookPosition] = adjustMacbookForScreenSize();

  const handleMacClick = () => {
    setMacAnimation((prev) => (prev ? '' : 'Animation'));
  };
  return (
    <Macbook
      position={macbookPosition}
      scale={macbookScale}
      macAnimation={currentAnimation}
      onClick={handleMacClick}
    />
  );
};

export default Laptop;
