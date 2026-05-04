import { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../hooks/usePortfolio';

const categories = ['All', 'Web', 'Backend', 'Mobile', 'Website'];

const accentMap = {
  cyan: 'from-cyan-400 to-blue-500',
  lime: 'from-lime-300 to-emerald-500',
  rose: 'from-rose-400 to-orange-500',
  violet: 'from-violet-400 to-fuchsia-500',
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const { content } = usePortfolio();
  const { projects } = content;

  const featuredProject = projects.find((p) => p.featured);

  const filteredProjects =
    filter === 'All'
      ? projects.filter((p) => !p.featured)
      : projects.filter(
          (project) =>
            project.category === filter && !project.featured
        );

  return (
    <div className="animate-reveal">

      {/* ================= FEATURED ================= */}
      {featuredProject && (
        <section className="section-pad border-b border-cyan-200/10">
          <p className="eyebrow mb-6">Featured Project</p>

          <div className="glass-card overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${accentMap[featuredProject.accent]}`} />

            <div className="grid lg:grid-cols-2 gap-8 p-6">

              <div>
                <h2 className="text-4xl font-black text-cyan-50">
                  {featuredProject.title}
                </h2>

                <p className="mt-4 text-cyan-50/60">
                  {featuredProject.description}
                </p>

                <button
                  onClick={() => navigate(`/projects/${featuredProject.id}`)}
                  className="mt-6 inline-flex items-center gap-2 text-cyan-300 font-black"
                >
                  View Case Study <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="rounded-lg overflow-hidden">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ================= FILTER ================= */}
      <section className="section-pad">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-lg border px-4 py-2 text-sm font-black ${
                filter === category
                  ? 'border-cyan-300 bg-cyan-300 text-black'
                  : 'border-cyan-200/10 text-cyan-50/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ================= PROJECTS ================= */}
        <div className="grid gap-6 lg:grid-cols-2">

          {filteredProjects.map((project) => {
            const Icon = project.icon;

            return (
              <article
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="glass-card overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
              >

                {/* IMAGE */}
                {project.image && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                <div className="p-6">

                  <div className="flex justify-between mb-4">
                    <Icon className="text-cyan-300" />
                    <span className="text-xs text-cyan-50/50 uppercase">
                      {project.category}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-cyan-50">
                    {project.title}
                  </h2>

                  <p className="mt-3 text-sm text-cyan-50/60">
                    {project.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-lime-300">
                      <CheckCircle2 size={14} />
                      Click to view case study
                    </span>

                    <ArrowUpRight className="text-cyan-300" />
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Projects;
