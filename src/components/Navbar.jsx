import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // REMOVED the bad location useEffect!

  // Prevent scrolling when mobile menu is open (This effect is still good because it talks to the external DOM)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="w-full px-6 md:px-10 h-24 flex justify-between items-center z-50 relative bg-white/40 backdrop-blur-md rounded-t-[2.5rem] border-b border-white">
        <Link to="/" className="flex items-center gap-3 group z-50">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            <Terminal size={20} className="text-blue-600" />
          </div>
          <span className="text-slate-900 font-black text-xl tracking-tight">CORNELIUS_</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-bold tracking-wide text-slate-500">
          <Link to="/" className={`transition-colors hover:text-blue-600 ${isActive('/') && 'text-blue-600'}`}>Home</Link>
          <Link to="/projects" className={`transition-colors hover:text-blue-600 ${isActive('/projects') && 'text-blue-600'}`}>Projects</Link>
          <Link to="/about" className={`transition-colors hover:text-blue-600 ${isActive('/about') && 'text-blue-600'}`}>About</Link>
          <Link to="/contact" className="px-6 py-3 bg-slate-900 text-white font-bold text-sm rounded-2xl hover:bg-slate-800 transition-colors shadow-lg">
            Book a call
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-50 p-2 bg-white rounded-full shadow-sm text-slate-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#fff0eb]/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300 md:hidden">
          <div className="flex flex-col items-center gap-8 text-2xl font-black text-slate-900">
            {/* Added onClick={() => setIsOpen(false)} to every single link! */}
            <Link to="/" onClick={() => setIsOpen(false)} className={isActive('/') ? 'text-blue-600' : ''}>Home</Link>
            <Link to="/projects" onClick={() => setIsOpen(false)} className={isActive('/projects') ? 'text-blue-600' : ''}>Projects</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className={isActive('/about') ? 'text-blue-600' : ''}>About</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-4 px-8 py-4 bg-blue-600 text-white rounded-full shadow-xl">
              Book a call
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;