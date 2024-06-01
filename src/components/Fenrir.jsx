import React, { useState } from 'react';
import { Werewolf } from '../models';

const Fenrir = () => {
  const [currentAnimation, setCurrentAnimation] = useState('Idle');

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
  const [werewolfScale, werewolfPosition] = adjustWerewolfForScreenSize();

  const handleWerewolfClick = () => {
    const animations = ['thriller', 'waving'];
    const randomAnimation =
      animations[Math.floor(Math.random() * animations.length)];
    setCurrentAnimation(randomAnimation);
    setTimeout(() => {
      setCurrentAnimation('Idle');
    }, 28000);
  };

  return (
    <Werewolf
      position={werewolfPosition}
      scale={werewolfScale}
      onClick={handleWerewolfClick}
      currentAnimation={currentAnimation}
    />
  );
};

export default Fenrir;
