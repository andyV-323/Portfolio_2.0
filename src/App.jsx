import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, About, Contact } from "./pages";
import { Projects } from "./pages/Projects";
import { DarkModeProvider } from "./components/DarkModeContext";
import ConditionalFooter from "./components/ConditionalFooter"; // Import the new component
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-5LGWK5MS", // Replace with your GTM ID
    };
    TagManager.initialize(tagManagerArgs);
  }, []);

  useEffect(() => {
    window.dataLayer.push({
      event: "pageview",
      page: location.pathname,
    });
  }, [location]);

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
