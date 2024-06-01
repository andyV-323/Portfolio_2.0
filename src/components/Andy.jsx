import React, { useState } from 'react';
import { Me } from '../models';

const Andy = () => {
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  const [meAnimIndex, setMeAnimIndex] = useState(0);

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
  const [meScale, mePosition] = adjustMeForScreenSize();
  const meAnim = ['stand', 'waving1', 'kneeling'];
  const meAnimDurations = {
    stand: 6000,
    waving1: 5000,
    kneeling: 3000,
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

  return (
    <Me
      position={mePosition}
      scale={meScale}
      onClick={handleMeClick}
      currentAnimation={currentAnimation}
    />
  );
};
export default Andy;
