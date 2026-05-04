import { ArrowRight, CheckCircle2, Mail, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.png';
import { usePortfolio } from '../hooks/usePortfolio';

const accentMap = {
  cyan: 'from-cyan-400 to-blue-500',
  lime: 'from-lime-300 to-emerald-500',
  rose: 'from-rose-400 to-orange-500',
  violet: 'from-violet-400 to-fuchsia-500',
};

const Home = () => {
  const { content } = usePortfolio();
  const { capabilities, metrics, profile, projects, stack, workflow } = content;
  const featured = projects.slice(0, 3);

  return (
    <div className="animate-reveal">
      <section className="grid min-h-[calc(100vh-5rem)] border-b border-cyan-200/10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between border-b border-cyan-200/10 p-6 md:p-10 lg:border-b-0 lg:border-r">
          <div>
            <p className="eyebrow mb-8">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              {profile.availability}
            </p>

            <h1 className="display-title max-w-6xl font-black text-gradient">
              TECH PORTFOLIO FOR FULL-STACK BUILDS.
            </h1>

            <p className="mt-8 max-w-2xl text-xl font-medium leading-9 text-cyan-50/68">
              {profile.summary}
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-[auto_auto]">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-4 text-sm font-black text-[#071116] transition-transform hover:-translate-y-0.5"
            >
              Explore Systems <ArrowRight size={18} />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-200/14 bg-cyan-100/5 px-6 py-4 text-sm font-black text-cyan-50 transition-colors hover:border-lime-300 hover:text-lime-200"
            >
              Contact Engineer <Mail size={18} />
            </a>
          </div>
        </div>

        <aside className="scan bg-[#0a1821]">
          <div className="border-b border-cyan-200/10 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-50/45">System Snapshot</p>
              <span className="rounded-lg bg-lime-300 px-3 py-1 text-xs font-black text-[#071116]">ONLINE</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="glass-card overflow-hidden">
              <div className="circuit-line h-2" />
              <div className="grid gap-0 md:grid-cols-[1fr_0.82fr]">
                <div className="p-6">
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">Primary Stack</p>
                  <h2 className="text-4xl font-black leading-tight text-cyan-50">React + Node + SQL deployment flow.</h2>
                  <p className="mt-5 text-sm font-medium leading-7 text-cyan-50/58">
                    A portfolio focused on usable software: interfaces, APIs, databases, and production handoff.
                  </p>
                </div>
                <div className="flex items-center justify-center border-t border-cyan-200/10 bg-[#071116] p-8 md:border-l md:border-t-0">
                  <img src={heroImage} alt="" className="h-48 w-48 object-contain" />
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div key={metric.label} className="solid-card p-5">
                    <Icon className="mb-5 text-lime-300" size={23} />
                    <p className="text-3xl font-black text-cyan-50">{metric.value}</p>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-50/42">{metric.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {stack.slice(0, 10).map((item) => (
                <span key={item} className="rounded-lg border border-cyan-200/10 bg-cyan-100/5 px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-cyan-50/58">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="section-pad border-b border-cyan-200/10">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow mb-5">Engineering Capabilities</p>
            <h2 className="section-title font-black text-cyan-50">Built for tech products.</h2>
          </div>
          <p className="text-lg font-medium leading-8 text-cyan-50/58">
            The site now behaves like a technology portfolio: every section points toward practical engineering skill, delivery readiness, and real project capability.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article key={capability.title} className="glass-card p-6 transition-transform hover:-translate-y-1">
                <Icon className="mb-8 text-cyan-300" size={30} />
                <h3 className="text-2xl font-black text-cyan-50">{capability.title}</h3>
                <p className="mt-4 min-h-28 text-sm font-medium leading-7 text-cyan-50/58">{capability.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {capability.stack.map((item) => (
                    <span key={item} className="rounded-md bg-lime-300/10 px-2.5 py-1.5 text-xs font-black text-lime-200">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad border-b border-cyan-200/10">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5">Project Lab</p>
            <h2 className="section-title font-black text-cyan-50">Selected technical builds.</h2>
          </div>
          <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-black text-[#071116]">
            Open Projects <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((project) => {
            const Icon = project.icon;
            return (
              <article key={project.id} className="glass-card overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${accentMap[project.accent]}`} />
                <div className="p-6">
                  <div className="mb-10 flex items-start justify-between gap-5">
                    <div className="flex h-13 w-13 items-center justify-center rounded-lg bg-cyan-300 text-[#071116]">
                      <Icon size={26} />
                    </div>
                    <span className="rounded-lg border border-cyan-200/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-cyan-50/45">
                      {project.type}
                    </span>
                  </div>
                  <h3 className="text-3xl font-black leading-tight text-cyan-50">{project.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-cyan-50/58">{project.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow mb-5">Workflow</p>
            <h2 className="section-title font-black text-cyan-50">How I move from idea to deployable product.</h2>
          </div>

          <div className="grid gap-4">
            {workflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="glass-card grid gap-5 p-6 md:grid-cols-[auto_1fr]">
                  <div>
                    <div className="flex h-13 w-13 items-center justify-center rounded-lg bg-lime-300 text-[#071116]">
                      <Icon size={25} />
                    </div>
                    <p className="mt-6 text-4xl font-black text-cyan-50/12">0{index + 1}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-cyan-50">{step.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-7 text-cyan-50/58">{step.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid border-t border-cyan-200/10 bg-cyan-300 text-[#071116] md:grid-cols-[1fr_1fr]">
        <div className="p-7 md:p-10">
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">Need a tech-focused developer portfolio or app?</h2>
        </div>
        <div className="border-t border-[#071116]/10 p-7 md:border-l md:border-t-0 md:p-10">
          <p className="text-lg font-bold leading-8">
            Send the role, product idea, or technical problem. I can help with web apps, APIs, data systems, and deployment-ready interfaces.
          </p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#071116] px-6 py-4 text-sm font-black text-cyan-50">
            Start Contact <CheckCircle2 size={18} />
          </Link>
        </div>
      </section>

      <section className="overflow-hidden border-t border-cyan-200/10 py-5">
        <div className="flex whitespace-nowrap animate-scroll items-center gap-10 px-6">
          {[...stack, ...stack].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.14em] text-cyan-50/42">
              <Zap size={15} className="text-lime-300" />
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
