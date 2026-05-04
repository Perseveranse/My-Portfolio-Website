import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';
import Admin from './pages/Admin';
import { PortfolioProvider } from './context/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="site-bg fixed inset-0 z-[-1]" />

        <div className="min-h-screen px-3 py-3 font-sans text-[#e7f9ff] md:px-6 md:py-6">
          <div className="tech-grid mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1500px] flex-col overflow-hidden rounded-xl border border-cyan-200/10 bg-[#08131b]/92 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
