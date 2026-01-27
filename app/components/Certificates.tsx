
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_CERTIFICATES } from '../constants';
import { Certificate } from '../types';

interface CertificatesProps {
  isAdmin?: boolean;
}

const Certificates: React.FC<CertificatesProps> = ({ isAdmin }) => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState({ 
    title: '', 
    issuer: '', 
    pdfData: '', 
    date: '',
    skills: '',
    thumbnailUrl: ''
  });

  // Load from local database on mount and backfill thumbnails from INITIAL_CERTIFICATES if missing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('portfolio_certificates');
    if (saved) {
      try {
        const parsed: Certificate[] = JSON.parse(saved);
        const merged = parsed.map((c) => {
          if (c.thumbnailUrl) return c;
          const seed = INITIAL_CERTIFICATES.find(ic => ic.id === c.id);
          return seed?.thumbnailUrl ? { ...c, thumbnailUrl: seed.thumbnailUrl } : c;
        });

        setCertificates(merged);
        localStorage.setItem('portfolio_certificates', JSON.stringify(merged));
      } catch {
        setCertificates(INITIAL_CERTIFICATES);
        localStorage.setItem('portfolio_certificates', JSON.stringify(INITIAL_CERTIFICATES));
      }
    } else {
      setCertificates(INITIAL_CERTIFICATES);
      localStorage.setItem('portfolio_certificates', JSON.stringify(INITIAL_CERTIFICATES));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'pdfData' | 'thumbnailUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'pdfData' && file.type !== 'application/pdf') {
        alert("Please upload a PDF file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({ 
      title: '', 
      issuer: '', 
      pdfData: '', 
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), 
      skills: '',
      thumbnailUrl: '' 
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setFormState({
      title: cert.title,
      issuer: cert.issuer,
      pdfData: cert.pdfData || '',
      date: cert.date,
      skills: cert.skills?.join(', ') || '',
      thumbnailUrl: cert.thumbnailUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bhai, kya aap ye certificate delete karna chahte hain?")) {
      const updated = certificates.filter(c => c.id !== id);
      setCertificates(updated);
      localStorage.setItem('portfolio_certificates', JSON.stringify(updated));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cert: Certificate = {
      id: editingId || crypto.randomUUID(),
      title: formState.title,
      issuer: formState.issuer,
      pdfData: formState.pdfData,
      thumbnailUrl: formState.thumbnailUrl,
      skills: formState.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      date: formState.date
    };
    
    let updated: Certificate[];
    if (editingId) {
      updated = certificates.map(c => c.id === editingId ? cert : c);
    } else {
      updated = [cert, ...certificates];
    }

    setCertificates(updated);
    localStorage.setItem('portfolio_certificates', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 text-[#F9FAF7]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Verified Credentials</h2>
            {isAdmin && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#6BCF9B]/10 rounded-full border border-[#6BCF9B]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6BCF9B] animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-[#6BCF9B]">Owner Active</span>
              </div>
            )}
          </div>
          <p className="text-[#F9FAF7]/60 max-w-lg font-medium">Official certifications and academic achievements. Previews visible below.</p>
        </div>
        
        {isAdmin && (
          <button 
            onClick={handleOpenAdd}
            className="px-8 py-4 bg-white/10 hover:bg-[#6BCF9B] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/10 hover:border-[#6BCF9B] shadow-xl group"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Upload New Credential
            </span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            layoutId={cert.id}
            whileHover={{ y: -10 }}
            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden cursor-pointer interactive shadow-sm hover:shadow-2xl hover:shadow-[#6BCF9B]/10 transition-all duration-500"
            onClick={() => setSelectedCert(cert)}
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleOpenEdit(cert); }}
                  className="w-10 h-10 bg-[#6BCF9B] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  title="Edit Certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(cert.id); }}
                  className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  title="Delete Certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            )}

            <div className="aspect-[4/3] overflow-hidden relative flex flex-col items-center justify-center bg-[#1F7A5A]/30">
              {cert.thumbnailUrl ? (
                <img 
                  src={cert.thumbnailUrl} 
                  alt={cert.title} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-20 h-20 text-[#6BCF9B]/40 group-hover:text-[#6BCF9B] transition-colors duration-500">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="px-6 py-2 rounded-full bg-[#6BCF9B] text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                  View Full Document
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <p className="text-[10px] font-black text-[#6BCF9B] uppercase tracking-[0.2em] mb-1">{cert.issuer}</p>
                  <h3 className="text-xl font-bold leading-tight mb-3">{cert.title}</h3>
                  
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-[#6BCF9B] group-hover:border-[#6BCF9B]/30 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-black bg-white/10 px-3 py-1 rounded-full border border-white/10 shrink-0 whitespace-nowrap">{cert.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-xl bg-[#1F7A5A] border border-white/20 rounded-[40px] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">
                {editingId ? 'Update Credential' : 'Add New Credential'}
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Certificate Title</label>
                    <input required value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Flutter Advanced Patterns" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Date Earned</label>
                    <input required value={formState.date} onChange={e => setFormState({...formState, date: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Jan 2024" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Issuing Organization</label>
                  <input required value={formState.issuer} onChange={e => setFormState({...formState, issuer: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Google Cloud" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Skills (comma separated)</label>
                  <input value={formState.skills} onChange={e => setFormState({...formState, skills: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Flutter, Dart, AI, Firebase" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Preview Pic (Card Thumbnail)</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors text-center p-2 overflow-hidden">
                      {formState.thumbnailUrl ? (
                        <img src={formState.thumbnailUrl} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg className="w-8 h-8 mb-2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Select Image</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'thumbnailUrl')} />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Verification PDF</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors text-center p-4">
                      {formState.pdfData ? (
                        <div className="flex flex-col items-center gap-2">
                          <svg className="w-8 h-8 text-[#6BCF9B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          <p className="text-[8px] text-[#6BCF9B] font-black uppercase">PDF Attached</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Select PDF</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileChange(e, 'pdfData')} />
                    </label>
                  </div>
                </div>

                <button type="submit" disabled={!formState.pdfData} className="w-full py-5 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6BCF9B]/20 disabled:opacity-50 transition-all active:scale-95">
                  {editingId ? 'Save Changes' : 'Publish Credential'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <motion.div 
              className="absolute inset-0 bg-[#1F7A5A]/95 backdrop-blur-3xl"
              onClick={() => setSelectedCert(null)}
            ></motion.div>
            
            <motion.div
              layoutId={selectedCert.id}
              className="relative w-full max-w-6xl h-[90vh] bg-white rounded-[40px] overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div className="p-6 bg-[#1F7A5A] border-b border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-black text-[#6BCF9B] uppercase tracking-[0.3em]">{selectedCert.issuer}</span>
                  <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">{selectedCert.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 bg-gray-100 relative flex items-center justify-center">
                {selectedCert.pdfData ? (
                  <embed 
                    src={selectedCert.pdfData} 
                    type="application/pdf" 
                    className="w-full h-full"
                  />
                ) : selectedCert.thumbnailUrl ? (
                  <img
                    src={selectedCert.thumbnailUrl}
                    alt={selectedCert.title}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">
                    Document Viewer Unavailable
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
