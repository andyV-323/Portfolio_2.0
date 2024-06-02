import React from 'react';
import { Html } from '@react-three/drei';
import { useDarkMode } from './DarkModeContext';

const Overlay = () => {
  const { isDarkMode } = useDarkMode();
  return (
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
  );
};
export default Overlay;
