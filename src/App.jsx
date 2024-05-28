import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, About, Contact } from './pages';
import { Projects } from './pages/Projects';
import { DarkModeProvider } from './components/DarkModeContext';
import ConditionalFooter from './components/ConditionalFooter'; // Import the new component

const App = () => {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <DarkModeProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <ConditionalFooter />
        </DarkModeProvider>
      </Router>
    </main>
  );
};

export default App;
