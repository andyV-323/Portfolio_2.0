import { useLocation } from 'react-router-dom';
import { Footer } from '../components';

const ConditionalFooter = () => {
  const location = useLocation(); // This is now safe to use here

  // Hide the footer on the '/about' page
  if (location.pathname === '/about') {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;
