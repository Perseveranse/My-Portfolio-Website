import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content } = usePortfolio();
  const { projects } = content;

  const project = projects.find((p) => p.id === Number(id));

  if (!project) {
    return (
      <div className="p-10 text-white">
        Project not found
      </div>
    );
  }

  return (
    <div className="section-pad animate-reveal">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-cyan-300 font-black mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* HERO IMAGE */}
      {project.image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      {/* TITLE */}
      <h1 className="text-4xl font-black text-cyan-50">
        {project.title}
      </h1>

      <p className="mt-4 text-cyan-50/60 text-lg">
        {project.description}
      </p>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="glass-card p-6">
          <h3 className="text-lime-300 font-black">Challenge</h3>
          <p className="mt-2 text-sm text-cyan-50/60">
            {project.challenge}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-cyan-300 font-black">Solution</h3>
          <p className="mt-2 text-sm text-cyan-50/60">
            {project.solution}
          </p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-violet-300 font-black">Impact</h3>
          <p className="mt-2 text-sm text-cyan-50/60">
            {project.impact}
          </p>
        </div>

      </div>

      {/* TECH STACK */}
      <div className="mt-10 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-black bg-cyan-100/10 text-cyan-50/70 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>

    </div>
  );
};

export default ProjectDetails;
