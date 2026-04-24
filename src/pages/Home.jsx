import { Star, CheckCircle, ArrowRight, GitBranch, ExternalLink, Database, Code, Layers, Terminal, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

// Data generated outside the component to keep React's render pure!
const contributionData = Array.from({ length: 364 }).map(() => Math.floor(Math.random() * 5));

const Home = () => {
  const techStack = [
    "JavaScript (ES6+)", "React.js", "Node.js", "PostgreSQL", "Tailwind CSS", 
    "React Native", "Git Architecture", "RESTful APIs", "MongoDB", "Oracle DB"
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-700 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="grid lg:grid-cols-2 gap-12 p-10 lg:p-16 items-center">
        
        {/* Left Side: Typography (NOW DARK) */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase mb-8 text-blue-600">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span> 
            AVAILABLE FOR ENGINEERING ROLES
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
            Turning complex logic into seamless applications.
          </h1>
          
          <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md mb-10">
            I architect and build performant web and mobile apps that feel intentional, fast-paced, and impossible to ignore.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/projects" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20 flex items-center gap-2">
              Transform my stack <ArrowRight size={18} />
            </Link>
            <a href="/Cornelius_Resume.pdf" download className="bg-white/60 backdrop-blur border border-white px-8 py-4 rounded-2xl font-bold text-slate-900 flex items-center gap-3 hover:bg-white transition-colors shadow-sm">
              Download CV
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Terminal (KEPT DARK FOR CONTRAST) */}
        <div className="w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-[#0a0c10] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-800 p-6 flex flex-col font-mono text-sm lg:text-base group hover:border-blue-500/50 transition-colors duration-500 relative">
          <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          
          <div className="flex-1 flex flex-col gap-2 relative z-10">
          <div className="text-blue-400">~ cornelius % <span className="text-white">./init_architecture.sh</span></div>
            <div className="text-slate-500 mt-2">Loading core modules...</div>
            <div className="text-emerald-400 flex items-center gap-2 animate-in fade-in delay-150"><span className="text-emerald-500">✔</span> PostgreSQL Database Connected</div>
            <div className="text-emerald-400 flex items-center gap-2 animate-in fade-in delay-300"><span className="text-emerald-500">✔</span> React Client Compiled</div>
            <div className="text-emerald-400 flex items-center gap-2 animate-in fade-in delay-500"><span className="text-emerald-500">✔</span> Node.js API Gateway Active</div>
            <div className="text-violet-400 mt-4 font-bold">System optimal. Ready for deployment. <span className="animate-pulse text-white">_</span></div>
          </div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-900/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-900/40 transition-colors duration-500"></div>
        </div>
      </div>

      {/* 2. INFINITE TECH MARQUEE (LIGHT MODE) */}
      <div className="w-full border-y border-white bg-white/20 py-6 overflow-hidden flex relative mb-20">
        <div className="flex whitespace-nowrap animate-scroll items-center gap-12 px-6">
          {[...techStack, ...techStack].map((tech, index) => (
            <span key={index} className="text-slate-500 font-black uppercase tracking-widest text-sm flex items-center gap-3">
              <span className="text-blue-500/50">✦</span> {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 3. ENGINEERING WORKFLOW (LIGHT GLASS) */}
      <div className="px-10 lg:px-16 mb-28">
        <h2 className="text-3xl font-black text-slate-900 mb-10 text-center tracking-tight">The Engineering Process</h2>
        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-1/2 left-10 right-10 h-px bg-white -z-10"></div>
          
          <div className="bg-white/60 backdrop-blur border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <span className="text-[100px] font-black absolute -top-8 -right-2 text-slate-900/[0.03] select-none pointer-events-none">01</span>
            <Layers className="text-blue-500 mb-6 relative z-10" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">System Design</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">Mapping out scalable database schemas, planning API routes, and drafting component architecture before writing a single line of code.</p>
          </div>
          
          <div className="bg-white/60 backdrop-blur border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
             <span className="text-[100px] font-black absolute -top-8 -right-2 text-slate-900/[0.03] select-none pointer-events-none">02</span>
            <Terminal className="text-violet-500 mb-6 relative z-10" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">Core Development</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">Writing clean, modular logic. Focusing on performant state management in React and secure data handling in the backend.</p>
          </div>

          <div className="bg-white/60 backdrop-blur border border-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
             <span className="text-[100px] font-black absolute -top-8 -right-2 text-slate-900/[0.03] select-none pointer-events-none">03</span>
            <Zap className="text-rose-500 mb-6 relative z-10" size={32} />
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">CI/CD Deployment</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed relative z-10">Automating build pipelines, optimizing bundle sizes, and pushing zero-downtime updates to live production servers.</p>
          </div>
        </div>
      </div>

      {/* 4. FEATURED DEPLOYMENTS (LIGHT GLASS) */}
      <div className="px-10 lg:px-16 mb-28">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Featured Deployments</h2>
            <p className="text-slate-600 font-medium">Recent architecture and application builds.</p>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-500 transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-white/60 backdrop-blur border border-white rounded-[2rem] p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm"><Database size={24} className="text-blue-500" /></div>
              <div className="flex gap-2">
                <a href="#" className="p-2 text-slate-400 hover:text-slate-900 bg-white/50 rounded-full hover:bg-white transition-all"><GitBranch size={18} /></a>
                <a href="#" className="p-2 text-slate-400 hover:text-slate-900 bg-white/50 rounded-full hover:bg-white transition-all"><ExternalLink size={18} /></a>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Enterprise API Gateway</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">A high-frequency REST API handling thousands of requests, built with Node.js and backed by a heavily optimized PostgreSQL schema.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-bold px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-slate-200/60 shadow-sm">Node.js</span>
              <span className="text-[11px] font-bold px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-slate-200/60 shadow-sm">PostgreSQL</span>
            </div>
          </div>

          <div className="group bg-white/60 backdrop-blur border border-white rounded-[2rem] p-8 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm"><Code size={24} className="text-violet-500" /></div>
              <div className="flex gap-2">
                <a href="#" className="p-2 text-slate-400 hover:text-slate-900 bg-white/50 rounded-full hover:bg-white transition-all"><GitBranch size={18} /></a>
                <a href="#" className="p-2 text-slate-400 hover:text-slate-900 bg-white/50 rounded-full hover:bg-white transition-all"><ExternalLink size={18} /></a>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">FinTech Dashboard</h3>
            <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">A responsive React application processing real-time economic data streams with complex state management and interactive charts.</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] font-bold px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-slate-200/60 shadow-sm">React.js</span>
              <span className="text-[11px] font-bold px-3 py-1.5 bg-white text-slate-700 rounded-lg border border-slate-200/60 shadow-sm">Tailwind</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SIMULATED CONTRIBUTION GRAPH (LIGHT MODE) */}
      <div className="px-10 lg:px-16 mb-24">
        <div className="bg-white/60 backdrop-blur border border-white rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-blue-500" size={24} />
            <h3 className="text-xl font-bold text-slate-900">System Activity Tracking</h3>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="w-[800px] md:w-full flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {contributionData.slice(rowIndex * 52, (rowIndex + 1) * 52).map((level, colIndex) => {
                    let colorClass = "bg-slate-200/50";
                    if (level === 1) colorClass = "bg-blue-200";
                    if (level === 2) colorClass = "bg-blue-300";
                    if (level === 3) colorClass = "bg-blue-500";
                    if (level === 4) colorClass = "bg-blue-600";
                    
                    return (
                      <div 
                        key={colIndex} 
                        className={`w-3 h-3 rounded-sm ${colorClass} hover:ring-2 hover:ring-slate-900 transition-all cursor-crosshair`}
                        title={`${level * 3} commits on this day`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 text-xs text-slate-500 font-bold">
            <p>1,248 Contributions in the last year</p>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="w-3 h-3 rounded-sm bg-slate-200/50"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-200"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-300"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
              <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. BOTTOM REVIEW BAND (LIGHT GLASS) */}
      <div className="bg-white/40 backdrop-blur-xl border-t border-white p-8 px-10 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 items-center mt-auto">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200 shadow-sm">
             <CheckCircle size={20} className="text-blue-500" />
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-400 tracking-wider">RATED</p>
             <p className="text-xs font-bold text-slate-900 uppercase">Excellent 5/5</p>
           </div>
        </div>
        <div className="col-span-1">
          <div className="flex gap-1 text-orange-400 mb-2">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}</div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"Their architecture doubled our query speeds in weeks flat!"</p>
        </div>
        <div className="col-span-1">
          <div className="flex gap-1 text-orange-400 mb-2">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}</div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"Best technical partner we have worked with today!"</p>
        </div>
        <div className="col-span-1">
          <div className="flex gap-1 text-orange-400 mb-2">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}</div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed italic">"They understand performance better than any team!"</p>
        </div>
      </div>

    </div>
  );
};

export default Home;