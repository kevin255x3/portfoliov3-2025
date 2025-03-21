// App.jsx IM READY TO DEPLOY
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import PortfolioPage from './PortfolioPage';
import ProjectDetailsPage from './ProjectDetailsPage';
import Navbar from './Navbar';
import About from './About';
import Contact from './Contact';
import './PortfolioStyles.css';
import ScrollToTop from './ScrollToTop';


// Component to handle body overflow based on route
function BodyStyleHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      // Portfolio page - keep overflow hidden
      document.body.style.overflow = 'hidden';
    } else if (location.pathname.includes('/project/') ||
      location.pathname === '/about' ||
      location.pathname === '/contact') {
      // Project detail page, About page, Contact page - allow scrolling
      document.body.style.overflow = 'auto';
    }

    // Cleanup function
    return () => {
      // No need to reset here as each component will handle its own state
    };
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BodyStyleHandler />
      <div className="App">
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;