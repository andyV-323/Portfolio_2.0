import { Link } from 'react-router-dom';
import { useDarkMode } from './DarkModeContext';

const CTA = () => {
  const isDarkMode = useDarkMode();
  return (
    <section className="cta">
      <p
        className={
          'cta-text bg-gradient-to-r from-stone-400 via-neutral-500 to-zinc-600 bg-clip-text text-transparent'
        }
      >
        Have a project in mind? <br className="sm:block hidden" />
        Let’s build something together!
      </p>
      <Link to="/contact" className="btn ">
        Contact
      </Link>
    </section>
  );
};

export default CTA;
