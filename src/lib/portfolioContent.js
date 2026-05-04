import {
  Activity,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Layers3,
  ListChecks,
  LockKeyhole,
  Rocket,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
  Workflow,
} from 'lucide-react';

export const iconMap = {
  Activity,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Layers3,
  ListChecks,
  LockKeyhole,
  Rocket,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TerminalSquare,
  Workflow,
};

const withIconComponent = (item, fallback = TerminalSquare) => {
  const iconName = typeof item.icon === 'string' ? item.icon : item.iconName;

  return {
    ...item,
    iconName: iconName || 'TerminalSquare',
    icon: iconMap[iconName] || fallback,
  };
};

export const normalizePortfolioContent = (content) => ({
  ...content,
  metrics: (content.metrics || []).map((item) => withIconComponent(item, Activity)),
  capabilities: (content.capabilities || []).map((item) => withIconComponent(item, LayoutDashboard)),
  projects: (content.projects || []).map((item) => withIconComponent(item, TerminalSquare)),
  workflow: (content.workflow || []).map((item) => withIconComponent(item, Workflow)),
  experience: content.experience || [],
  credentials: (content.credentials || []).map((item) => withIconComponent(item, Code2)),
  stack: content.stack || [],
});
