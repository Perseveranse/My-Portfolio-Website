import { BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

const About = () => {
  const { content } = usePortfolio();
  const { credentials, experience, profile, stack } = content;

  return (
    <div className="animate-reveal">
    <section className="grid border-b border-cyan-200/10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="border-b border-cyan-200/10 p-6 md:p-10 lg:border-b-0 lg:border-r">
        <p className="eyebrow mb-6">Stack & Profile</p>
        <h1 className="section-title font-black text-cyan-50">
          Software engineer focused on frontend, backend, and database systems.
        </h1>
      </div>

      <div className="scan p-6 md:p-10">
        <div className="glass-card p-7">
          <p className="text-lg font-medium leading-8 text-cyan-50/66">{profile.headline}</p>
          <p className="mt-5 text-lg font-medium leading-8 text-cyan-50/58">{profile.summary}</p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="solid-card p-5">
            <MapPin className="mb-5 text-cyan-300" size={24} />
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Location</p>
            <p className="mt-2 text-2xl font-black text-cyan-50">{profile.location}</p>
          </div>
          <div className="solid-card p-5">
            <GraduationCap className="mb-5 text-lime-300" size={24} />
            <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Education</p>
            <p className="mt-2 text-2xl font-black text-cyan-50">BSc. Information Technology</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-pad border-b border-cyan-200/10">
      <div className="mb-10 flex items-center gap-3">
        <BriefcaseBusiness className="text-lime-300" size={28} />
        <h2 className="section-title font-black text-cyan-50">Experience</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {experience.map((item) => (
          <article key={item.title} className="glass-card p-7">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">{item.period}</p>
            <h3 className="text-3xl font-black text-cyan-50">{item.title}</h3>
            <p className="mt-5 text-sm font-medium leading-7 text-cyan-50/58">{item.description}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="section-pad border-b border-cyan-200/10">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow mb-5">Technical Credentials</p>
        <h2 className="section-title font-black text-cyan-50">What this portfolio is built to prove.</h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {credentials.map((credential) => {
          const Icon = credential.icon;
          return (
            <article key={credential.label} className="glass-card flex gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-300 text-[#071116]">
                <Icon size={22} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-lime-300">{credential.label}</p>
                <h3 className="mt-2 text-lg font-black leading-tight text-cyan-50">{credential.value}</h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>

    <section className="section-pad">
      <p className="eyebrow mb-5">Current Stack</p>
      <div className="flex flex-wrap gap-3">
        {stack.map((item) => (
          <span key={item} className="rounded-lg border border-cyan-200/10 bg-cyan-100/5 px-4 py-3 text-sm font-black text-cyan-50/62">
            {item}
          </span>
        ))}
      </div>
    </section>
    </div>
  );
};

export default About;
