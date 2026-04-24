import { useState } from 'react';
import { ExternalLink, Database, Smartphone, LayoutTemplate, GitBranch, Globe } from 'lucide-react';

const portfolioData = [
  {
    id: 1,
    title: 'High-Frequency Trading API',
    category: 'Backend',
    description: 'A robust Node.js REST API built for processing high-volume financial transactions. Features strict rate limiting and PostgreSQL caching.',
    tech: ['Node.js', 'Express', 'PostgreSQL'],
    icon: Database,
  },
  {
    id: 2,
    title: 'Enterprise Analytics Dashboard',
    category: 'Web',
    description: 'A React-based dashboard processing real-time data streams. Features advanced state management and optimized re-rendering.',
    tech: ['React', 'Tailwind v4', 'Redux'],
    icon: LayoutTemplate,
  },
  {
    id: 3,
    title: 'Secure Vault Mobile App',
    category: 'Mobile',
    description: 'Cross-platform mobile application featuring biometric authentication and encrypted local storage.',
    tech: ['React Native', 'SQLite'],
    icon: Smartphone,
  },
  // NEW TEST PROJECT ADDED BELOW:
  {
    id: 4,
    title: 'DeFi Smart Contract Interface',
    category: 'Web',
    description: 'A decentralized finance dashboard allowing users to swap tokens and monitor liquidity pools. Built with Next.js and integrated with Web3.js.',
    tech: ['Next.js', 'Web3.js', 'Tailwind'],
    icon: Globe,
  },
];

const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(project => project.category === filter);

  return (
    <div className="py-16 px-10 lg:px-16 animate-in fade-in duration-700">
      <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tight">
        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Architecture</span> & Apps.
      </h2>
      
      {/* Interactive Filter Buttons */}
      <div className="flex flex-wrap gap-4 mb-12">
        {['All', 'Web', 'Backend', 'Mobile'].map(category => (
          <button 
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${
              filter === category 
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                : 'bg-white/50 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {filteredProjects.map(project => {
          const Icon = project.icon;
          return (
            <div key={project.id} className="group bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden border border-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1">
              <div className="p-8 border-b border-slate-200/50 flex justify-between items-start bg-white/40">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                  <Icon size={28} className="text-blue-600" />
                </div>
                <div className="flex gap-2">
                  <a href="#" className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-white/50 rounded-full hover:bg-white"><GitBranch size={18} /></a>
                  <a href="#" className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-white/50 rounded-full hover:bg-white"><ExternalLink size={18} /></a>
                </div>
              </div>
              
              <div className="p-8">
                <span className="text-xs font-black text-violet-600 tracking-widest uppercase mb-3 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h3>
                <p className="text-slate-600 mb-8 text-sm leading-relaxed font-medium">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-[11px] font-bold px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-slate-200/60 shadow-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;