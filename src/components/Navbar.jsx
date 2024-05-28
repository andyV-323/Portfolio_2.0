import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../components/DarkModeContext';
import { experiences } from '../constants';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const handleToggle = () => {
    toggleDarkMode(); // This toggles the dark mode state
  };
  return (
    <header className="header">
      <NavLink
        to="/"
        className="w-10 h-10 rounded-lg bg-gray-300 items-center justify-center flex font-bold shadow-md"
      >
        <img src="/src/assets/icons/mbs.svg" alt="MidnightByte Solutions" />
      </NavLink>
      <nav className="flex text-lg gap-7 font-medium">
        <NavLink
          to="/about"
          className={`${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 bg-clip-text text-transparent'
          }`}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={`${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 bg-clip-text text-transparent'
          }`}
        >
          Projects
        </NavLink>
        <NavLink className="switch">
          <button
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
            onClick={handleToggle}
            className="h-12 w-12 rounded-lg p-2 hover:bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500"
          >
            {isDarkMode ? (
              <svg
                className="fill-yellow-500  "
                fill="currentColor"
                viewBox="0 0 17 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
              </svg>
            ) : (
              <svg
                className="fill-violet-700 block"
                fill="currentColor"
                viewBox="0 0 17 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
