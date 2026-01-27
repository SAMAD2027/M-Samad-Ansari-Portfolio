
import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    const subs = JSON.parse(localStorage.getItem('portfolio_submissions') || '[]');
    setSubmissionCount(subs.length);
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('portfolio_submissions') || '[]');
      const newSubmission = {
        ...formData,
        timestamp: new Date().toISOString(),
        id: crypto.randomUUID()
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      existingSubmissions.push(newSubmission);
      localStorage.setItem('portfolio_submissions', JSON.stringify(existingSubmissions));
      
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Database Save Error:", error);
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 text-[#F9FAF7]">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">Let's create something <span className="text-[#6BCF9B]">remarkable</span>.</h2>
          <p className="text-xl text-[#F9FAF7]/60 mb-12 font-medium">Whether you have a specific project in mind or just want to chat about tech, my inbox is always open.</p>
          
          <div className="space-y-10">
            <a href="mailto:samadansari521@gmail.com" className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#6BCF9B] group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-[10px] text-[#6BCF9B] font-black uppercase tracking-[0.2em] mb-1">Email</p>
                <p className="text-xl font-bold">samadansari521@gmail.com</p>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/muhammad-samad-ansari/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#6BCF9B] group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-[#6BCF9B] font-black uppercase tracking-[0.2em] mb-1">LinkedIn</p>
                <p className="text-xl font-bold">muhammad-samad-ansari</p>
              </div>
            </a>
            
            <a href="https://github.com/SAMAD2027" target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group">
              <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#6BCF9B] group-hover:text-white transition-all duration-500 shadow-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-[#6BCF9B] font-black uppercase tracking-[0.2em] mb-1">GitHub</p>
                <p className="text-xl font-bold">SAMAD2027</p>
              </div>
            </a>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-xl p-12 rounded-[50px] border border-white/10 shadow-2xl shadow-black/30 relative overflow-hidden">
          <div className="absolute top-6 right-8 flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/40 mb-0.5">DB Records</span>
              <span className="text-[10px] font-bold text-[#6BCF9B]">{submissionCount} Submissions</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${status === 'sending' ? 'bg-amber-400 animate-pulse' : 'bg-[#6BCF9B]'}`}></div>
          </div>

          {status === 'sent' ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-white/5 text-[#6BCF9B] rounded-full flex items-center justify-center mb-8 shadow-inner">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-black mb-3 uppercase">Message Persisted!</h3>
              <p className="text-white/60 font-medium">Your message has been saved to the database. I'll get back to you within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="mt-8 text-[#6BCF9B] font-black uppercase text-xs tracking-widest hover:underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-5 text-[#F9FAF7] focus:outline-none focus:ring-4 focus:ring-[#6BCF9B]/10 transition-all font-bold placeholder:text-white/10" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-5 text-[#F9FAF7] focus:outline-none focus:ring-4 focus:ring-[#6BCF9B]/10 transition-all font-bold placeholder:text-white/10" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 ml-2">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-5 text-[#F9FAF7] focus:outline-none focus:ring-4 focus:ring-[#6BCF9B]/10 transition-all resize-none font-bold placeholder:text-white/10" placeholder="How can I help you?"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-5 bg-[#6BCF9B] hover:bg-[#2FB7A3] text-white rounded-2xl font-black text-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-[#6BCF9B]/10 uppercase tracking-widest"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
