import { GitBranch, Briefcase, MessageSquare } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-white/40 backdrop-blur-xl border-t border-white p-6 px-10 flex flex-col md:flex-row justify-between items-center gap-4 z-10 relative">
      <p className="text-slate-500 text-sm font-medium">
        © {year} Cornelius. All rights reserved.
      </p>
      
      <div className="flex gap-3">
        {/* Replace the '#' with your actual social links! */}
        <a href="#" target="_blank" rel="noreferrer" className="p-2 bg-white/50 rounded-full text-slate-500 hover:text-blue-600 hover:bg-white transition-all border border-slate-100 shadow-sm" title="GitHub">
          <GitBranch size={18} />
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="p-2 bg-white/50 rounded-full text-slate-500 hover:text-blue-600 hover:bg-white transition-all border border-slate-100 shadow-sm" title="LinkedIn">
          <Briefcase size={18} />
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="p-2 bg-white/50 rounded-full text-slate-500 hover:text-blue-600 hover:bg-white transition-all border border-slate-100 shadow-sm" title="Twitter/X">
          <MessageSquare size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;