import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- 1. Add this import
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#fff0eb]">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-300/40 blur-[100px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/30 blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-rose-300/40 blur-[120px] mix-blend-multiply"></div>
      </div>

      <div className="min-h-screen p-4 md:p-8 font-sans flex flex-col">
        <div className="flex-1 w-full max-w-[1400px] mx-auto bg-white/40 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-white/60 flex flex-col overflow-hidden relative">
          <Navbar />
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer /> {/* <-- 2. Add the Footer here! */}
        </div>
      </div>
    </Router>
  );
}

export default App;