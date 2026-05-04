import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  KeyRound,
  Layers3,
  ListChecks,
  LogIn,
  LogOut,
  Loader2,
  Plus,
  Save,
  ShieldCheck,
  Signal,
  Sparkles,
  Trash2,
  UserRound,
} from 'lucide-react';
import { iconMap } from '../lib/portfolioContent';
import { usePortfolio } from '../hooks/usePortfolio';

const tabs = [
  { id: 'profile', label: 'Basic Info', icon: UserRound },
  { id: 'metrics', label: 'Quick Stats', icon: BarChart3 },
  { id: 'stack', label: 'Skills', icon: Signal },
  { id: 'capabilities', label: 'Services', icon: Sparkles },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'experience', label: 'Work History', icon: BriefcaseBusiness },
  { id: 'workflow', label: 'Process', icon: ListChecks },
  { id: 'credentials', label: 'Highlights', icon: Layers3 },
  { id: 'security', label: 'Account', icon: KeyRound },
];

const accentOptions = ['cyan', 'lime', 'rose', 'violet'];
const projectCategories = ['Web', 'Backend', 'Mobile', 'Website'];

const emptyMetric = { value: '1+', label: 'New stat', icon: 'BarChart3' };
const emptyCapability = {
  title: 'New Service',
  description: '',
  icon: 'Sparkles',
  stack: [],
};
const emptyProject = {
  title: 'New Project',
  type: 'Project Type',
  category: 'Web',
  description: '',
  challenge: '',
  solution: '',
  impact: '',
  tech: [],
  icon: 'TerminalSquare',
  accent: 'cyan',
};
const emptyExperience = {
  period: '2026 - Present',
  title: 'New Role',
  description: '',
};
const emptyWorkflow = {
  title: 'New Step',
  description: '',
  icon: 'Workflow',
};
const emptyCredential = {
  label: 'New Highlight',
  value: '',
  icon: 'ShieldCheck',
};

const Field = ({ label, value, onChange, textarea = false }) => (
  <label className="grid gap-2">
    <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/42">{label}</span>
    {textarea ? (
      <textarea
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="min-h-32 resize-y rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-3 text-sm font-bold leading-6 text-cyan-50 outline-none placeholder:text-cyan-50/28 focus:border-cyan-300"
      />
    ) : (
      <input
        value={value || ''}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-3 text-sm font-bold text-cyan-50 outline-none placeholder:text-cyan-50/28 focus:border-cyan-300"
      />
    )}
  </label>
);

const SelectField = ({ label, value, options, onChange }) => (
  <label className="grid gap-2">
    <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/42">{label}</span>
    <select
      value={value || options[0]}
      onChange={(event) => onChange(event.target.value)}
      className="rounded-lg border border-cyan-200/12 bg-[#0a1821] px-4 py-3 text-sm font-bold text-cyan-50 outline-none focus:border-cyan-300"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

const ChipEditor = ({ label, items, onChange }) => {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;
    onChange([...(items || []), trimmed]);
    setNewItem('');
  };

  const removeItem = (index) => {
    onChange((items || []).filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="grid gap-3">
      <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/42">{label}</span>
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addItem();
            }
          }}
          className="min-w-0 flex-1 rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-3 text-sm font-bold text-cyan-50 outline-none focus:border-cyan-300"
        />
        <button
          type="button"
          onClick={addItem}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lime-300 text-[#071116]"
          aria-label={`Add ${label}`}
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(items || []).map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/10 bg-cyan-100/5 px-3 py-2 text-xs font-black text-cyan-50/70">
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-cyan-50/42 hover:text-rose-200"
              aria-label={`Remove ${item}`}
            >
              <Trash2 size={13} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, action }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-3xl font-black text-cyan-50">{title}</h2>
    {action}
  </div>
);

const DeleteButton = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-rose-300/30 text-rose-200 hover:bg-rose-300/10"
    aria-label={label}
  >
    <Trash2 size={17} />
  </button>
);

const Admin = () => {
  const { liveStatus, rawContent, setRawContent } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');
  const [sourceContent, setSourceContent] = useState(rawContent);
  const [draft, setDraft] = useState(rawContent);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [session, setSession] = useState(() => {
    const token = localStorage.getItem('portfolio-admin-session');
    const email = localStorage.getItem('portfolio-admin-email');

    return token ? { token, email } : null;
  });
  const [loginEmail, setLoginEmail] = useState(() => localStorage.getItem('portfolio-admin-email') || '');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('idle');
  const [loginError, setLoginError] = useState('');
  const [serverStatus, setServerStatus] = useState(null);
  const iconOptions = useMemo(() => Object.keys(iconMap).sort(), []);
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(rawContent);

  if (rawContent !== sourceContent) {
    setSourceContent(rawContent);
    setDraft(rawContent);
    setErrorMessage('');
  }

  useEffect(() => {
    fetch('/api/admin/status')
      .then((response) => response.json())
      .then((status) => setServerStatus(status))
      .catch(() => setServerStatus({ loginReady: false, database: 'offline' }));
  }, []);

  useEffect(() => {
    if (!session?.token) return;
    const currentToken = session.token;

    fetch('/api/admin/me', {
      headers: {
        Authorization: `Bearer ${currentToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Session expired.');
        }

        const result = await response.json();
        const email = result.user?.email || '';
        setSession({ token: currentToken, email });
        localStorage.setItem('portfolio-admin-email', email);
      })
      .catch(() => {
        localStorage.removeItem('portfolio-admin-session');
        setSession(null);
      });
  }, [session?.token]);

  const syncDraft = (nextDraft) => {
    setDraft(nextDraft);
    setErrorMessage('');
  };

  const updateProfile = (key, value) => {
    syncDraft({
      ...draft,
      profile: {
        ...draft.profile,
        [key]: value,
      },
    });
  };

  const updateProfileSocial = (key, value) => {
    syncDraft({
      ...draft,
      profile: {
        ...draft.profile,
        socials: {
          ...draft.profile.socials,
          [key]: value || null,
        },
      },
    });
  };

  const updateSectionItem = (section, index, key, value) => {
    syncDraft({
      ...draft,
      [section]: draft[section].map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    });
  };

  const addSectionItem = (section, emptyItem) => {
    const nextItem =
      section === 'projects'
        ? {
            ...emptyItem,
            id: Math.max(0, ...draft.projects.map((project) => Number(project.id) || 0)) + 1,
          }
        : { ...emptyItem };

    syncDraft({
      ...draft,
      [section]: [...draft[section], nextItem],
    });
  };

  const removeSectionItem = (section, index) => {
    syncDraft({
      ...draft,
      [section]: draft[section].filter((_, itemIndex) => itemIndex !== index),
    });
  };

  const login = async (event) => {
    event.preventDefault();
    setLoginStatus('checking');
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Could not log in.');
      }

      const nextSession = {
        token: result.token,
        email: result.user?.email || loginEmail,
      };

      setSession(nextSession);
      localStorage.setItem('portfolio-admin-session', nextSession.token);
      localStorage.setItem('portfolio-admin-email', nextSession.email);
      setLoginPassword('');
      setLoginStatus('idle');
    } catch (error) {
      setLoginStatus('error');
      setLoginError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio-admin-session');
    setSession(null);
    setActiveTab('profile');
  };

  const saveDraft = async () => {
    setSaveStatus('saving');

    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(draft),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Could not save portfolio content.');
      }

      setRawContent(result);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2400);
    } catch (error) {
      setSaveStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (!session) {
    return (
      <div className="animate-reveal">
        <section className="grid min-h-[calc(100vh-12rem)] border-b border-cyan-200/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-cyan-200/10 p-6 md:p-10 lg:border-b-0 lg:border-r">
            <p className="eyebrow mb-5">
              <ShieldCheck size={15} />
              Secure Admin
            </p>
            <h1 className="section-title font-black text-cyan-50">Log in to update the portfolio.</h1>
            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-cyan-50/62">
              Your changes are saved to PostgreSQL and published to open portfolio pages in real time.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="solid-card p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Database</p>
                <p className="mt-2 text-xl font-black text-cyan-50">{serverStatus?.database || 'Checking'}</p>
              </div>
              <div className="solid-card p-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Login</p>
                <p className="mt-2 text-xl font-black text-cyan-50">{serverStatus?.loginReady === false ? 'Needs env setup' : 'Ready'}</p>
              </div>
            </div>
          </div>

          <form onSubmit={login} className="scan flex items-center p-6 md:p-10">
            <div className="glass-card w-full max-w-xl p-6 md:p-8">
              <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-lg bg-cyan-300 text-[#071116]">
                <KeyRound size={24} />
              </div>
              <div className="grid gap-5">
                <Field label="Admin Email" value={loginEmail} onChange={setLoginEmail} />
                <label className="grid gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/42">Password</span>
                  <input
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    type="password"
                    className="rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-3 text-sm font-bold text-cyan-50 outline-none placeholder:text-cyan-50/28 focus:border-cyan-300"
                  />
                </label>
              </div>
              {loginError && <p className="mt-5 rounded-lg border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-bold text-rose-200">{loginError}</p>}
              <button
                type="submit"
                disabled={loginStatus === 'checking'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-4 text-sm font-black text-[#071116] hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loginStatus === 'checking' ? <>Checking <Loader2 size={18} className="animate-spin" /></> : <>Log In <LogIn size={18} /></>}
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-reveal">
      <section className="border-b border-cyan-200/10 p-6 md:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-5">
              <span className={`h-2 w-2 rounded-full ${liveStatus === 'live' ? 'bg-lime-300' : 'bg-rose-300'}`} />
              {liveStatus === 'live' ? 'Live' : 'Offline'}
            </p>
            <h1 className="section-title font-black text-cyan-50">Admin Dashboard</h1>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[36rem]">
            <div className="solid-card p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Projects</p>
              <p className="mt-2 text-3xl font-black text-cyan-50">{draft.projects.length}</p>
            </div>
            <div className="solid-card p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Skills</p>
              <p className="mt-2 text-3xl font-black text-cyan-50">{draft.stack.length}</p>
            </div>
            <div className="solid-card p-4">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Services</p>
              <p className="mt-2 text-3xl font-black text-cyan-50">{draft.capabilities.length}</p>
            </div>
            <div className="sm:col-span-3">
              <div className="flex flex-col gap-3 rounded-lg border border-cyan-200/12 bg-cyan-100/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-bold text-cyan-50/62">Logged in as {session.email}</p>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-300/30 px-4 py-2.5 text-sm font-black text-rose-200 hover:bg-rose-300/10"
                >
                  Log Out <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid border-b border-cyan-200/10 lg:grid-cols-[18rem_1fr]">
        <aside className="border-b border-cyan-200/10 p-4 lg:border-b-0 lg:border-r">
          <div className="grid gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-black transition-colors ${
                    activeTab === tab.id ? 'bg-cyan-300 text-[#071116]' : 'text-cyan-50/58 hover:bg-cyan-100/8 hover:text-cyan-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="scan p-6 md:p-8">
          {activeTab === 'profile' && (
            <div>
              <SectionHeader title="Basic Info" />
              <div className="grid gap-5 xl:grid-cols-2">
                <Field label="Full Name" value={draft.profile.name} onChange={(value) => updateProfile('name', value)} />
                <Field label="Job Title" value={draft.profile.role} onChange={(value) => updateProfile('role', value)} />
                <Field label="Email" value={draft.profile.email} onChange={(value) => updateProfile('email', value)} />
                <Field label="Location" value={draft.profile.location} onChange={(value) => updateProfile('location', value)} />
                <Field label="Availability" value={draft.profile.availability} onChange={(value) => updateProfile('availability', value)} textarea />
                <Field label="Headline" value={draft.profile.headline} onChange={(value) => updateProfile('headline', value)} textarea />
                <div className="xl:col-span-2">
                  <Field label="About Summary" value={draft.profile.summary} onChange={(value) => updateProfile('summary', value)} textarea />
                </div>
                <Field label="GitHub Link" value={draft.profile.socials?.github || ''} onChange={(value) => updateProfileSocial('github', value)} />
                <Field label="LinkedIn Link" value={draft.profile.socials?.linkedin || ''} onChange={(value) => updateProfileSocial('linkedin', value)} />
                <Field label="X Link" value={draft.profile.socials?.x || ''} onChange={(value) => updateProfileSocial('x', value)} />
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div>
              <SectionHeader
                title="Quick Stats"
                action={
                  <button type="button" onClick={() => addSectionItem('metrics', emptyMetric)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-black text-[#071116]">
                    Add Stat <Plus size={17} />
                  </button>
                }
              />
              <div className="grid gap-5 xl:grid-cols-3">
                {draft.metrics.map((metric, index) => (
                  <article key={`${metric.label}-${index}`} className="glass-card p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-cyan-50">{metric.value}</h3>
                      <DeleteButton label={`Remove ${metric.label}`} onClick={() => removeSectionItem('metrics', index)} />
                    </div>
                    <div className="grid gap-4">
                      <Field label="Number" value={metric.value} onChange={(value) => updateSectionItem('metrics', index, 'value', value)} />
                      <Field label="Label" value={metric.label} onChange={(value) => updateSectionItem('metrics', index, 'label', value)} />
                      <SelectField label="Icon" value={metric.icon} options={iconOptions} onChange={(value) => updateSectionItem('metrics', index, 'icon', value)} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stack' && (
            <div>
              <SectionHeader title="Skills" />
              <div className="glass-card p-5">
                <ChipEditor label="Skills" items={draft.stack} onChange={(items) => syncDraft({ ...draft, stack: items })} />
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div>
              <SectionHeader
                title="Services"
                action={
                  <button type="button" onClick={() => addSectionItem('capabilities', emptyCapability)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-black text-[#071116]">
                    Add Service <Plus size={17} />
                  </button>
                }
              />
              <div className="grid gap-5 xl:grid-cols-2">
                {draft.capabilities.map((capability, index) => (
                  <article key={`${capability.title}-${index}`} className="glass-card p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-cyan-50">{capability.title}</h3>
                      <DeleteButton label={`Remove ${capability.title}`} onClick={() => removeSectionItem('capabilities', index)} />
                    </div>
                    <div className="grid gap-4">
                      <Field label="Service Name" value={capability.title} onChange={(value) => updateSectionItem('capabilities', index, 'title', value)} />
                      <Field label="Description" value={capability.description} onChange={(value) => updateSectionItem('capabilities', index, 'description', value)} textarea />
                      <SelectField label="Icon" value={capability.icon} options={iconOptions} onChange={(value) => updateSectionItem('capabilities', index, 'icon', value)} />
                      <ChipEditor label="Related Skills" items={capability.stack} onChange={(items) => updateSectionItem('capabilities', index, 'stack', items)} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <SectionHeader
                title="Projects"
                action={
                  <button type="button" onClick={() => addSectionItem('projects', emptyProject)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-black text-[#071116]">
                    Add Project <Plus size={17} />
                  </button>
                }
              />
              <div className="grid gap-5">
                {draft.projects.map((project, index) => (
                  <article key={project.id || `${project.title}-${index}`} className="glass-card p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-cyan-50">{project.title}</h3>
                      <DeleteButton label={`Remove ${project.title}`} onClick={() => removeSectionItem('projects', index)} />
                    </div>

                    <div className="grid gap-4 xl:grid-cols-2">
                      <Field label="Project Name" value={project.title} onChange={(value) => updateSectionItem('projects', index, 'title', value)} />
                      <Field label="Project Type" value={project.type} onChange={(value) => updateSectionItem('projects', index, 'type', value)} />
                      <SelectField label="Category" value={project.category} options={projectCategories} onChange={(value) => updateSectionItem('projects', index, 'category', value)} />
                      <SelectField label="Accent Color" value={project.accent} options={accentOptions} onChange={(value) => updateSectionItem('projects', index, 'accent', value)} />
                      <SelectField label="Icon" value={project.icon} options={iconOptions} onChange={(value) => updateSectionItem('projects', index, 'icon', value)} />
                      <ChipEditor label="Technologies" items={project.tech} onChange={(items) => updateSectionItem('projects', index, 'tech', items)} />
                      <div className="xl:col-span-2">
                        <Field label="Project Description" value={project.description} onChange={(value) => updateSectionItem('projects', index, 'description', value)} textarea />
                      </div>
                      <Field label="Challenge" value={project.challenge} onChange={(value) => updateSectionItem('projects', index, 'challenge', value)} textarea />
                      <Field label="Solution" value={project.solution} onChange={(value) => updateSectionItem('projects', index, 'solution', value)} textarea />
                      <div className="xl:col-span-2">
                        <Field label="Impact" value={project.impact} onChange={(value) => updateSectionItem('projects', index, 'impact', value)} textarea />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <SectionHeader
                title="Work History"
                action={
                  <button type="button" onClick={() => addSectionItem('experience', emptyExperience)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-black text-[#071116]">
                    Add Role <Plus size={17} />
                  </button>
                }
              />
              <div className="grid gap-5 xl:grid-cols-2">
                {draft.experience.map((item, index) => (
                  <article key={`${item.title}-${index}`} className="glass-card p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-cyan-50">{item.title}</h3>
                      <DeleteButton label={`Remove ${item.title}`} onClick={() => removeSectionItem('experience', index)} />
                    </div>
                    <div className="grid gap-4">
                      <Field label="Dates" value={item.period} onChange={(value) => updateSectionItem('experience', index, 'period', value)} />
                      <Field label="Role" value={item.title} onChange={(value) => updateSectionItem('experience', index, 'title', value)} />
                      <Field label="Description" value={item.description} onChange={(value) => updateSectionItem('experience', index, 'description', value)} textarea />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div>
              <SectionHeader
                title="Process"
                action={
                  <button type="button" onClick={() => addSectionItem('workflow', emptyWorkflow)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-black text-[#071116]">
                    Add Step <Plus size={17} />
                  </button>
                }
              />
              <div className="grid gap-5 xl:grid-cols-3">
                {draft.workflow.map((step, index) => (
                  <article key={`${step.title}-${index}`} className="glass-card p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-cyan-50">{step.title}</h3>
                      <DeleteButton label={`Remove ${step.title}`} onClick={() => removeSectionItem('workflow', index)} />
                    </div>
                    <div className="grid gap-4">
                      <Field label="Step Name" value={step.title} onChange={(value) => updateSectionItem('workflow', index, 'title', value)} />
                      <Field label="Description" value={step.description} onChange={(value) => updateSectionItem('workflow', index, 'description', value)} textarea />
                      <SelectField label="Icon" value={step.icon} options={iconOptions} onChange={(value) => updateSectionItem('workflow', index, 'icon', value)} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'credentials' && (
            <div>
              <SectionHeader
                title="Highlights"
                action={
                  <button type="button" onClick={() => addSectionItem('credentials', emptyCredential)} className="inline-flex w-fit items-center gap-2 rounded-lg bg-lime-300 px-4 py-3 text-sm font-black text-[#071116]">
                    Add Highlight <Plus size={17} />
                  </button>
                }
              />
              <div className="grid gap-5 xl:grid-cols-3">
                {draft.credentials.map((credential, index) => (
                  <article key={`${credential.label}-${index}`} className="glass-card p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-cyan-50">{credential.label}</h3>
                      <DeleteButton label={`Remove ${credential.label}`} onClick={() => removeSectionItem('credentials', index)} />
                    </div>
                    <div className="grid gap-4">
                      <Field label="Label" value={credential.label} onChange={(value) => updateSectionItem('credentials', index, 'label', value)} />
                      <Field label="Value" value={credential.value} onChange={(value) => updateSectionItem('credentials', index, 'value', value)} />
                      <SelectField label="Icon" value={credential.icon} options={iconOptions} onChange={(value) => updateSectionItem('credentials', index, 'icon', value)} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <SectionHeader title="Account" />
              <div className="glass-card grid gap-5 p-5 xl:max-w-xl">
                <div className="flex items-center gap-3 rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-3 text-sm font-bold text-cyan-50/62">
                  <ShieldCheck size={18} className="text-lime-300" />
                  Logged in as {session.email}
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-3 text-sm font-bold text-cyan-50/62">
                  <Signal size={18} className="text-cyan-300" />
                  Database: {serverStatus?.database || 'checking'}
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-300/30 px-5 py-3 text-sm font-black text-rose-200 hover:bg-rose-300/10"
                >
                  Log Out <LogOut size={17} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="sticky bottom-0 z-30 flex flex-col gap-3 border-t border-cyan-200/10 bg-[#071116]/94 p-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className={`text-sm font-black ${hasChanges ? 'text-lime-200' : 'text-cyan-50/48'}`}>
            {hasChanges ? 'Unsaved changes' : 'All changes saved'}
          </p>
          {errorMessage && <p className="mt-1 text-sm font-bold text-rose-200">{errorMessage}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => syncDraft(rawContent)}
            disabled={!hasChanges || saveStatus === 'saving'}
            className="rounded-lg border border-cyan-200/12 px-5 py-3 text-sm font-black text-cyan-50/70 hover:border-cyan-300 hover:text-cyan-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={saveDraft}
            disabled={!hasChanges || saveStatus === 'saving'}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 text-sm font-black text-[#071116] hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saveStatus === 'saving' && <>Saving <Loader2 size={17} className="animate-spin" /></>}
            {saveStatus === 'saved' && <>Saved <CheckCircle2 size={17} /></>}
            {saveStatus !== 'saving' && saveStatus !== 'saved' && <>Save <Save size={17} /></>}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Admin;
