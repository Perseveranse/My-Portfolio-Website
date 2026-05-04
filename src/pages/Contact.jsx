import { useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { usePortfolio } from '../hooks/usePortfolio';

const briefTypes = ['Engineering role', 'Web app build', 'Backend/API help', 'Database system', 'Portfolio website'];

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');
  const { content } = usePortfolio();
  const { capabilities, profile } = content;

  const sendEmail = (event) => {
    event.preventDefault();
    setStatus('sending');

    emailjs
      .sendForm('service_vp3i7y9', 'template_dwm4aww', form.current, 'qWVDtLvLTnSGbfUOi')
      .then(
        () => {
          setStatus('success');
          form.current.reset();
          setTimeout(() => setStatus('idle'), 5000);
        },
        (error) => {
          console.error('Email sending failed:', error);
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
        },
      );
  };

  return (
    <div className="animate-reveal">
      <section className="grid border-b border-cyan-200/10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-cyan-200/10 p-6 md:p-10 lg:border-b-0 lg:border-r">
          <p className="eyebrow mb-6">Contact Endpoint</p>
          <h1 className="section-title font-black text-cyan-50">
            Send a technical brief or hiring message.
          </h1>
          <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-cyan-50/62">
            Share the role, project idea, stack, timeline, or problem. I will respond directly through email.
          </p>

          <div className="mt-10 grid gap-4">
            <a href={`mailto:${profile.email}`} className="glass-card flex items-center justify-between gap-5 p-5 transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-300 text-[#071116]">
                  <Mail size={22} />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Email</p>
                  <p className="mt-1 font-black text-cyan-50">{profile.email}</p>
                </div>
              </div>
              <ArrowUpRight className="text-cyan-300" size={20} />
            </a>

            <div className="glass-card flex items-center gap-4 p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-lime-300 text-[#071116]">
                <MapPin size={22} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-50/38">Location</p>
                <p className="mt-1 font-black text-cyan-50">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>

        <form ref={form} onSubmit={sendEmail} className="scan p-6 md:p-10">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-cyan-50/70" htmlFor="user_name">Name</label>
              <input
                id="user_name"
                type="text"
                name="user_name"
                required
                placeholder="Your name"
                className="rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-4 text-cyan-50 outline-none placeholder:text-cyan-50/28 focus:border-cyan-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-black text-cyan-50/70" htmlFor="user_email">Email</label>
              <input
                id="user_email"
                type="email"
                name="user_email"
                required
                placeholder="you@company.com"
                className="rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-4 text-cyan-50 outline-none placeholder:text-cyan-50/28 focus:border-cyan-300"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-sm font-black text-cyan-50/70" htmlFor="brief_type">Message Type</label>
            <select
              id="brief_type"
              name="brief_type"
              className="rounded-lg border border-cyan-200/12 bg-[#0a1821] px-4 py-4 text-cyan-50 outline-none focus:border-cyan-300"
              defaultValue={briefTypes[0]}
            >
              {briefTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <label className="text-sm font-black text-cyan-50/70" htmlFor="message">Technical Details</label>
            <textarea
              id="message"
              name="message"
              required
              rows="8"
              placeholder="What should I know about the role, project, users, stack, or timeline?"
              className="resize-none rounded-lg border border-cyan-200/12 bg-cyan-100/5 px-4 py-4 text-cyan-50 outline-none placeholder:text-cyan-50/28 focus:border-cyan-300"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-4 text-sm font-black text-[#071116] transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'idle' && <>Send Brief <Send size={18} /></>}
            {status === 'sending' && <>Sending <Loader2 size={18} className="animate-spin" /></>}
            {status === 'success' && <>Message Sent <CheckCircle2 size={18} /></>}
            {status === 'error' && <>Try Again <AlertCircle size={18} /></>}
          </button>

          {status === 'success' && (
            <div className="mt-5 rounded-lg border border-lime-300/30 bg-lime-300/10 px-4 py-3 text-sm font-bold text-lime-200">
              Your message was sent successfully.
            </div>
          )}

          {status === 'error' && (
            <div className="mt-5 rounded-lg border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-bold text-rose-200">
              The form could not send. Email me directly at {profile.email}.
            </div>
          )}
        </form>
      </section>

      <section className="section-pad">
        <p className="eyebrow mb-6">Good Fit</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <div key={capability.title} className="glass-card p-5">
                <Icon className="mb-5 text-lime-300" size={24} />
                <h3 className="text-lg font-black text-cyan-50">{capability.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-cyan-50/52">{capability.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Contact;
