import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, TerminalSquare, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';

const navItems = [
  { path: '/', label: 'Overview' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'Stack' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { content } = usePortfolio();
  const { profile } = content;
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-[#08131b]/86 backdrop-blur-xl">
        <nav className="grid h-20 grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]">
          <Link to="/" className="flex h-full items-center gap-3 border-r border-cyan-200/10 px-5 md:px-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300 text-[#071116]">
              <TerminalSquare size={21} />
            </span>
            <span>
              <span className="block text-sm font-black tracking-[0.18em] text-cyan-50">CORNELIUS</span>
              <span className="block text-xs font-bold uppercase tracking-[0.12em] text-cyan-100/45">{profile.role}</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 px-4 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-4 py-2 text-sm font-black transition-colors ${
                  isActive(item.path)
                    ? 'bg-cyan-300 text-[#071116]'
                    : 'text-cyan-100/55 hover:bg-cyan-100/8 hover:text-cyan-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden h-full items-center justify-end border-l border-cyan-200/10 px-5 md:px-8 lg:flex">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-black text-[#071116] transition-transform hover:-translate-y-0.5"
            >
              Hire / Contact <ArrowUpRight size={16} />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mr-4 justify-self-end rounded-lg border border-cyan-200/14 bg-cyan-100/6 p-2 text-cyan-50 lg:hidden"
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#071116]/98 px-5 pt-28 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-3">
            {[...navItems, { path: '/contact', label: 'Contact' }].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg border px-5 py-5 text-3xl font-black ${
                  isActive(item.path)
                    ? 'border-cyan-300 bg-cyan-300 text-[#071116]'
                    : 'border-cyan-200/14 bg-cyan-100/6 text-cyan-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
