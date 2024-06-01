import React from 'react';
import { Moon } from '../models/Moon';

const Luna = () => {
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

  const [moonScale, moonPosition] = adjustMoonForScreenSize();
  return <Moon position={moonPosition} scale={moonScale} />;
};
export default Luna;
