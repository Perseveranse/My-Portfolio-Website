import { ArrowUpRight, Mail, MapPin, ServerCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';

const Footer = () => {
  const year = new Date().getFullYear();
  const { content } = usePortfolio();
  const { profile, stack } = content;

  return (
    <footer className="border-t border-cyan-200/10 bg-[#071116]">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="border-b border-cyan-200/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300 text-[#071116]">
              <ServerCog size={21} />
            </span>
            <div>
              <p className="font-black tracking-[0.14em] text-cyan-50">{profile.name}</p>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-100/45">{profile.role}</p>
            </div>
          </div>
          <p className="max-w-md text-sm font-medium leading-7 text-cyan-50/58">{profile.summary}</p>
        </div>

        <div className="border-b border-cyan-200/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Navigation</p>
          <div className="grid gap-2 text-sm font-black text-cyan-50/58">
            <Link className="hover:text-cyan-50" to="/">Overview</Link>
            <Link className="hover:text-cyan-50" to="/projects">Projects</Link>
            <Link className="hover:text-cyan-50" to="/about">Stack</Link>
            <Link className="hover:text-cyan-50" to="/contact">Contact</Link>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-lime-300">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {stack.slice(0, 8).map((item) => (
              <span key={item} className="rounded-lg border border-cyan-200/10 bg-cyan-100/5 px-3 py-1.5 text-xs font-black text-cyan-50/58">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-cyan-200/10 px-6 py-5 text-sm font-bold text-cyan-50/45 md:flex-row md:items-center md:px-8">
        <p>&copy; {year} Cornelius. Tech portfolio built with React, Vite, and Vercel.</p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/10 px-3 py-2">
            <MapPin size={15} /> {profile.location}
          </span>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/10 px-3 py-2 hover:text-cyan-50">
            <Mail size={15} /> Email <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
