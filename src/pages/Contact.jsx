import { useRef, useState } from 'react';
import { Mail, Send, MessageSquare, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // PASTE YOUR EMAILJS KEYS HERE
    emailjs.sendForm(
      'service_vp3i7y9',   // Example: 'service_xyz123'
      'template_dwm4aww',  // Example: 'template_abc456'
      form.current,
      'qWVDtLvLTnSGbfUOi'    // Example: 'pub_key_987654321'
    )

    .then(() => {
        setStatus('success');
        form.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
    }, (error) => {
        console.error('Email sending failed:', error);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
    });
  };

  return (
    <div className="py-16 px-10 lg:px-16 max-w-7xl mx-auto animate-in fade-in duration-700 flex flex-col md:flex-row gap-16">
      
      {/* Left Side: Copy (NOW DARK HIGH-CONTRAST) */}
      <div className="md:w-1/2">
        <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
          Let's build something <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">exceptional.</span>
        </h2>
        <p className="text-slate-600 text-lg mb-12 leading-relaxed max-w-md font-medium">
          Currently open for new engineering opportunities. Whether you have a question about my architecture or just want to connect, I'll respond as soon as possible.
        </p>
        
        {/* Contact Info Card (FROSTED GLASS) */}
        <div className="bg-white/60 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm inline-flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-white">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-black tracking-widest uppercase mb-1">Direct Email</p>
            <p className="text-slate-900 font-bold">eshuncornelius98@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form (LIGHT FROSTED GLASS) */}
      <div className="md:w-1/2">
        <form ref={form} onSubmit={sendEmail} className="bg-white/60 backdrop-blur-md border border-white p-8 md:p-10 rounded-[2.5rem] shadow-sm flex flex-col gap-6 relative overflow-hidden">
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Initialize Contact</h3>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-700 font-bold ml-1">Your Name</label>
            <input 
              type="text" 
              name="user_name" 
              required 
              placeholder="John Doe" 
              className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-700 font-bold ml-1">Email Address</label>
            <input 
              type="email" 
              name="user_email" 
              required 
              placeholder="john@company.com" 
              className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate-700 font-bold ml-1">System / Project Details</label>
            <textarea 
              name="message" 
              required 
              rows="4" 
              placeholder="How can I help you scale?" 
              className="w-full bg-white/50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner resize-none"
            ></textarea>
          </div>

          {/* Dynamic Submit Button */}
          <button 
            type="submit" 
            disabled={status === 'sending'}
            className="mt-2 w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50"
          >
            {status === 'idle' && <>Execute Send <Send size={18} /></>}
            {status === 'sending' && <>Transmitting... <Loader2 size={18} className="animate-spin" /></>}
            {status === 'success' && <>Payload Delivered <CheckCircle size={18} /></>}
            {status === 'error' && <>Transmission Failed <AlertCircle size={18} /></>}
          </button>

          {/* Success Overlay Feedback (Updated for light theme) */}
          {status === 'success' && (
            <div className="absolute top-6 right-6 bg-emerald-50 text-emerald-600 border border-emerald-200 px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-in slide-in-from-top-4 shadow-sm">
              <CheckCircle size={18} /> Message Sent
            </div>
          )}
        </form>
      </div>
      
    </div>
  );
};

export default Contact;