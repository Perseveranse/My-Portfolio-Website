import { Code, Cpu, Briefcase, GraduationCap } from 'lucide-react';

const About = () => (
  <div className="py-16 px-10 lg:px-16 max-w-5xl animate-in fade-in duration-700">
    
    <div className="max-w-3xl mb-20">
      <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
        Writing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">clean code</span> <br/>
        and scalable systems.
      </h2>
      
      <div className="bg-white/60 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[2rem] shadow-sm">
        <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
          I am a dedicated Software Engineer passionate about solving complex logical problems. 
          My focus is on the entire software development lifecycle—from conceptualizing system architecture 
          to deploying production-ready code.
        </p>
        <p className="text-slate-600 text-lg leading-relaxed font-medium">
          Whether I am optimizing a slow database query, building a responsive web interface, 
          or structuring a mobile app, I write code that is built to last and scale.
        </p>
      </div>
    </div>
    
    <div className="grid md:grid-cols-2 gap-16">
      {/* Experience Timeline */}
      <div>
        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Briefcase size={20} /></div>
          Professional Experience
        </h3>
        
        <div className="space-y-12 border-l-2 border-slate-200 ml-4 pl-8 relative">
          
          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-[#fff0eb] bg-blue-600 shadow-sm"></span>
            <p className="text-xs font-black tracking-widest text-blue-600 uppercase mb-2">2024 - Present</p>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Freelance Software Engineer</h4>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">Architecting and deploying full-stack web applications and databases for diverse clientele, focusing on performance and modern UI/UX.</p>
          </div>

          <div className="relative">
            <span className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-[#fff0eb] bg-slate-300"></span>
            <p className="text-xs font-black tracking-widest text-slate-500 uppercase mb-2">2023 - 2024</p>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Database Administrator (Contract)</h4>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">Managed Oracle database schemas, optimized complex SQL queries, and ensured data integrity for enterprise resource tracking.</p>
          </div>

        </div>
      </div>

      {/* Philosophy & Education */}
      <div>
        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-violet-100 rounded-lg text-violet-600"><GraduationCap size={20} /></div>
          Education & Approach
        </h3>
        
        <div className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-[2rem] mb-8 shadow-sm hover:shadow-md transition-shadow">
          <h4 className="text-lg font-bold text-slate-900 mb-1">BSc. Information Technology</h4>
          <p className="text-violet-600 text-sm font-bold mb-4">University of Ghana, Legon</p>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            My background provides a unique analytical edge. I don't just build features; 
            I understand the economic efficiency and data architecture behind them.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[1.5rem] shadow-sm">
            <Code className="text-blue-600 mb-4" size={24} />
            <h4 className="text-slate-900 font-bold mb-1 text-sm">Clean Arch</h4>
            <p className="text-xs text-slate-500 font-medium">Modular & Reusable</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[1.5rem] shadow-sm">
            <Cpu className="text-violet-600 mb-4" size={24} />
            <h4 className="text-slate-900 font-bold mb-1 text-sm">Performant</h4>
            <p className="text-xs text-slate-500 font-medium">Optimized renders</p>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default About;