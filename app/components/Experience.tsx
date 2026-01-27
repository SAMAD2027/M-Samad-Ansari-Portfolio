
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { EXPERIENCES } from '../constants';
// import { Experience as ExperienceType } from '../types';

// interface ExperienceProps {
//   isAdmin?: boolean;
// }

// const Experience: React.FC<ExperienceProps> = ({ isAdmin }) => {
//   const [experiences, setExperiences] = useState<ExperienceType[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);
//   const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);
  
//   const [formState, setFormState] = useState({
//     company: '',
//     role: '',
//     period: '',
//     description: '',
//     skills: '',
//     certificatePdf: '',
//     certificateThumbnail: '',
//     offerLetterPdf: '',
//     offerLetterThumbnail: ''
//   });

//   // Load from local database on mount
//   useEffect(() => {
//     const saved = localStorage.getItem('portfolio_experiences');
//     if (saved) {
//       setExperiences(JSON.parse(saved));
//     } else {
//       setExperiences(EXPERIENCES);
//       localStorage.setItem('portfolio_experiences', JSON.stringify(EXPERIENCES));
//     }
//   }, []);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (field.includes('Pdf') && file.type !== 'application/pdf') {
//         alert("Please upload a PDF file.");
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormState(prev => ({ ...prev, [field]: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleOpenAdd = () => {
//     setEditingIndex(null);
//     setFormState({ 
//       company: '', role: '', period: '', description: '', skills: '',
//       certificatePdf: '', certificateThumbnail: '',
//       offerLetterPdf: '', offerLetterThumbnail: '' 
//     });
//     setIsModalOpen(true);
//   };

//   const handleOpenEdit = (index: number) => {
//     const exp = experiences[index];
//     setEditingIndex(index);
//     setFormState({
//       company: exp.company,
//       role: exp.role,
//       period: exp.period,
//       description: exp.description.join('\n'),
//       skills: exp.skills?.join(', ') || '',
//       certificatePdf: exp.certificatePdf || '',
//       certificateThumbnail: exp.certificateThumbnail || '',
//       offerLetterPdf: exp.offerLetterPdf || '',
//       offerLetterThumbnail: exp.offerLetterThumbnail || ''
//     });
//     setIsModalOpen(true);
//   };

//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     const exp: ExperienceType = {
//       role: formState.role,
//       company: formState.company,
//       period: formState.period,
//       description: formState.description.split('\n').filter(line => line.trim() !== ''),
//       skills: formState.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
//       certificatePdf: formState.certificatePdf || undefined,
//       certificateThumbnail: formState.certificateThumbnail || undefined,
//       offerLetterPdf: formState.offerLetterPdf || undefined,
//       offerLetterThumbnail: formState.offerLetterThumbnail || undefined
//     };
    
//     let updated: ExperienceType[];
//     if (editingIndex !== null) {
//       updated = [...experiences];
//       updated[editingIndex] = exp;
//     } else {
//       updated = [exp, ...experiences];
//     }

//     setExperiences(updated);
//     localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
//     setIsModalOpen(false);
//   };

//   const handleDelete = (index: number) => {
//     if (window.confirm("Are you sure you want to delete this experience? This action cannot be undone.")) {
//       const updated = experiences.filter((_, i) => i !== index);
//       setExperiences(updated);
//       localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-6 text-[#F9FAF7]">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
//         <div className="text-center md:text-left">
//           <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Professional Journey</h2>
//           <div className="flex items-center justify-center md:justify-start gap-3">
//             <p className="text-[#F9FAF7]/60 font-medium">Evolution of my technical contributions.</p>
//             {isAdmin && (
//               <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#6BCF9B]/10 rounded-full border border-[#6BCF9B]/20">
//                 <div className="w-1.5 h-1.5 rounded-full bg-[#6BCF9B] animate-pulse"></div>
//                 <span className="text-[8px] font-black uppercase tracking-widest text-[#6BCF9B]">Admin Access</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {isAdmin && (
//           <button 
//             onClick={handleOpenAdd}
//             className="px-8 py-4 bg-white/5 hover:bg-[#6BCF9B] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/10 hover:border-[#6BCF9B] shadow-xl group flex items-center gap-2"
//           >
//             <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
//             </svg>
//             Add Experience
//           </button>
//         )}
//       </div>

//       <div className="relative space-y-16">
//         <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block"></div>

//         {experiences.map((exp, idx) => (
//           <motion.div 
//             key={`${exp.company}-${idx}`} 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
//           >
//             <div className="absolute left-[-5px] md:left-1/2 w-5 h-5 bg-[#1F7A5A] border-4 border-[#6BCF9B] rounded-full z-10 -translate-x-1/2 mt-2 shadow-lg shadow-[#6BCF9B]/30"></div>
            
//             <div className="w-full md:w-1/2">
//               <div className={`p-10 rounded-[40px] bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative group ${idx % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                
//                 {isAdmin && (
//                   <div className="absolute -top-3 -right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
//                     <button 
//                       onClick={() => handleOpenEdit(idx)}
//                       className="w-10 h-10 bg-[#6BCF9B] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
//                       title="Edit Experience"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                       </svg>
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(idx)}
//                       className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
//                       title="Delete Experience"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 )}

//                 <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
//                   <h3 className="text-xl font-black text-[#F9FAF7] uppercase tracking-tight">{exp.role}</h3>
//                   <span className="text-[10px] font-black text-[#F9FAF7] px-4 py-1.5 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest">{exp.period}</span>
//                 </div>
                
//                 <h4 className="text-[#6BCF9B] font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
//                   {exp.company}
//                 </h4>

//                 {exp.skills && exp.skills.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {exp.skills.map((skill, i) => (
//                       <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/50">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                 <ul className="space-y-4 mb-8">
//                   {exp.description.map((item, i) => (
//                     <li key={i} className="flex items-start gap-4 text-sm text-[#F9FAF7]/60 leading-relaxed font-medium">
//                       <span className="w-2 h-2 rounded-full bg-[#6BCF9B] shrink-0 mt-1.5 shadow-sm"></span>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>

//                 {(exp.certificatePdf || exp.offerLetterPdf) && (
//                   <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
//                     {exp.certificatePdf && (
//                       <div className="flex flex-col gap-3">
//                         <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Certificate</span>
//                         <div 
//                           onClick={() => setSelectedPdf({ url: exp.certificatePdf!, title: 'Certificate of Completion' })}
//                           className="relative aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer group/doc"
//                         >
//                           {exp.certificateThumbnail ? (
//                             <img src={exp.certificateThumbnail} className="w-full h-full object-cover opacity-60 group-hover/doc:opacity-100 transition-opacity" alt="Certificate Preview" />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-[#6BCF9B]/40 group-hover/doc:text-[#6BCF9B] transition-colors">
//                               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/doc:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-black uppercase tracking-widest">
//                             View PDF
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     {exp.offerLetterPdf && (
//                       <div className="flex flex-col gap-3">
//                         <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Offer Letter</span>
//                         <div 
//                           onClick={() => setSelectedPdf({ url: exp.offerLetterPdf!, title: 'Offer Letter' })}
//                           className="relative aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer group/doc"
//                         >
//                           {exp.offerLetterThumbnail ? (
//                             <img src={exp.offerLetterThumbnail} className="w-full h-full object-cover opacity-60 group-hover/doc:opacity-100 transition-opacity" alt="Offer Letter Preview" />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-[#6BCF9B]/40 group-hover/doc:text-[#6BCF9B] transition-colors">
//                               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/doc:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-black uppercase tracking-widest">
//                             View PDF
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="hidden md:block w-1/2"></div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Experience Modal (Add/Edit) */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               className="w-full max-w-xl bg-[#1F7A5A] border border-white/20 rounded-[40px] p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-hide"
//             >
//               <button 
//                 onClick={() => setIsModalOpen(false)} 
//                 className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
//               >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
              
//               <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">
//                 {editingIndex !== null ? 'Update career chapter' : 'New Career Chapter'}
//               </h3>
//               <form onSubmit={handleSave} className="space-y-6">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Job Role</label>
//                     <input required value={formState.role} onChange={e => setFormState({...formState, role: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Senior Flutter Developer" />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Period</label>
//                     <input required value={formState.period} onChange={e => setFormState({...formState, period: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Feb 2024 - Present" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Company Name</label>
//                   <input required value={formState.company} onChange={e => setFormState({...formState, company: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Global Tech Hub" />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Skills Used (comma separated)</label>
//                   <input value={formState.skills} onChange={e => setFormState({...formState, skills: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Flutter, Dart, AI Automation" />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Key Contributions (One per line)</label>
//                   <textarea required value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} rows={4} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30 resize-none" placeholder="Optimized state management...&#10;Mentored 3 junior devs...&#10;Architected cloud infrastructure..." />
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-4">
//                     <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Certificate Docs</label>
//                     <div className="space-y-2">
//                        <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center">
//                           {formState.certificatePdf ? <span className="text-[8px] text-[#6BCF9B] font-black uppercase">PDF Uploaded</span> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload PDF</span>}
//                           <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileChange(e, 'certificatePdf')} />
//                        </label>
//                        <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center overflow-hidden">
//                           {formState.certificateThumbnail ? <img src={formState.certificateThumbnail} className="w-full h-full object-cover" /> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload Pic Preview</span>}
//                           <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'certificateThumbnail')} />
//                        </label>
//                     </div>
//                   </div>
//                   <div className="space-y-4">
//                     <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Offer Letter Docs</label>
//                     <div className="space-y-2">
//                        <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center">
//                           {formState.offerLetterPdf ? <span className="text-[8px] text-[#6BCF9B] font-black uppercase">PDF Uploaded</span> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload PDF</span>}
//                           <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileChange(e, 'offerLetterPdf')} />
//                        </label>
//                        <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center overflow-hidden">
//                           {formState.offerLetterThumbnail ? <img src={formState.offerLetterThumbnail} className="w-full h-full object-cover" /> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload Pic Preview</span>}
//                           <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'offerLetterThumbnail')} />
//                        </label>
//                     </div>
//                   </div>
//                 </div>

//                 <button type="submit" className="w-full py-5 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6BCF9B]/20 transition-transform active:scale-95">
//                   {editingIndex !== null ? 'Sync Update' : 'Archive Achievement'}
//                 </button>
//               </form>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* PDF Viewer Lightbox */}
//       <AnimatePresence>
//         {selectedPdf && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80"
//           >
//             <motion.div 
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="relative max-w-6xl w-full h-[90vh] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
//             >
//               <div className="p-6 border-b flex justify-between items-center bg-[#1F7A5A]">
//                 <h3 className="text-xl font-black uppercase tracking-tighter text-white">{selectedPdf.title}</h3>
//                 <button 
//                   onClick={() => setSelectedPdf(null)} 
//                   className="w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>
              
//               <div className="flex-1 bg-gray-100">
//                 <embed 
//                   src={selectedPdf.url} 
//                   type="application/pdf" 
//                   className="w-full h-full"
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Experience;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES } from '../constants';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  isAdmin?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ isAdmin }) => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);
  
  const [formState, setFormState] = useState({
    company: '',
    role: '',
    period: '',
    description: '',
    skills: '',
    certificatePdf: '',
    certificateThumbnail: '',
    offerLetterPdf: '',
    offerLetterThumbnail: ''
  });

  // Load from local database on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    if (saved) {
      setExperiences(JSON.parse(saved));
    } else {
      setExperiences(EXPERIENCES);
      localStorage.setItem('portfolio_experiences', JSON.stringify(EXPERIENCES));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field.includes('Pdf') && file.type !== 'application/pdf') {
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
    setEditingIndex(null);
    setFormState({ 
      company: '', role: '', period: '', description: '', skills: '',
      certificatePdf: '', certificateThumbnail: '',
      offerLetterPdf: '', offerLetterThumbnail: '' 
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index: number) => {
    const exp = experiences[index];
    setEditingIndex(index);
    setFormState({
      company: exp.company,
      role: exp.role,
      period: exp.period,
      description: exp.description.join('\n'),
      skills: exp.skills?.join(', ') || '',
      certificatePdf: exp.certificatePdf || '',
      certificateThumbnail: exp.certificateThumbnail || '',
      offerLetterPdf: exp.offerLetterPdf || '',
      offerLetterThumbnail: exp.offerLetterThumbnail || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const exp: ExperienceType = {
      role: formState.role,
      company: formState.company,
      period: formState.period,
      description: formState.description.split('\n').filter(line => line.trim() !== ''),
      skills: formState.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
      certificatePdf: formState.certificatePdf || undefined,
      certificateThumbnail: formState.certificateThumbnail || undefined,
      offerLetterPdf: formState.offerLetterPdf || undefined,
      offerLetterThumbnail: formState.offerLetterThumbnail || undefined
    };
    
    let updated: ExperienceType[];
    if (editingIndex !== null) {
      updated = [...experiences];
      updated[editingIndex] = exp;
    } else {
      updated = [exp, ...experiences];
    }

    setExperiences(updated);
    localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this experience? This action cannot be undone.")) {
      const updated = experiences.filter((_, i) => i !== index);
      setExperiences(updated);
      localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 text-[#F9FAF7]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Professional Journey</h2>
          <div className="flex items-center justify-center md:justify-start gap-3">
            <p className="text-[#F9FAF7]/60 font-medium">Evolution of my technical contributions.</p>
            {isAdmin && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#6BCF9B]/10 rounded-full border border-[#6BCF9B]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6BCF9B] animate-pulse"></div>
                <span className="text-[8px] font-black uppercase tracking-widest text-[#6BCF9B]">Admin Access</span>
              </div>
            )}
          </div>
        </div>

        {isAdmin && (
          <button 
            onClick={handleOpenAdd}
            className="px-8 py-4 bg-white/5 hover:bg-[#6BCF9B] text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-white/10 hover:border-[#6BCF9B] shadow-xl group flex items-center gap-2"
          >
            <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </button>
        )}
      </div>

      <div className="relative space-y-16">
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 hidden md:block"></div>

        {experiences.map((exp, idx) => (
          <motion.div 
            key={`${exp.company}-${idx}`} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="absolute left-[-5px] md:left-1/2 w-5 h-5 bg-[#1F7A5A] border-4 border-[#6BCF9B] rounded-full z-10 -translate-x-1/2 mt-2 shadow-lg shadow-[#6BCF9B]/30"></div>
            
            <div className="w-full md:w-1/2">
              <div className={`p-10 rounded-[40px] bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative group ${idx % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                
                {isAdmin && (
                  <div className="absolute -top-3 -right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                    <button 
                      onClick={() => handleOpenEdit(idx)}
                      className="w-10 h-10 bg-[#6BCF9B] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                      title="Edit Experience"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(idx)}
                      className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                      title="Delete Experience"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                  <h3 className="text-xl font-black text-[#F9FAF7] uppercase tracking-tight">{exp.role}</h3>
                  <span className="text-[10px] font-black text-[#F9FAF7] px-4 py-1.5 bg-white/10 rounded-full border border-white/10 uppercase tracking-widest">{exp.period}</span>
                </div>
                
                <h4 className="text-[#6BCF9B] font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  {exp.company}
                </h4>

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="space-y-4 mb-8">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-[#F9FAF7]/60 leading-relaxed font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#6BCF9B] shrink-0 mt-1.5 shadow-sm"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                {(exp.certificatePdf || exp.offerLetterPdf) && (
                  <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                    {exp.certificatePdf && (
                      <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Certificate</span>
                        <div 
                          onClick={() => setSelectedPdf({ url: exp.certificatePdf!, title: 'Certificate of Completion' })}
                          className="relative aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer group/doc"
                        >
                          {exp.certificateThumbnail ? (
                            <img src={exp.certificateThumbnail} className="w-full h-full object-cover opacity-60 group-hover/doc:opacity-100 transition-opacity" alt="Certificate Preview" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#6BCF9B]/40 group-hover/doc:text-[#6BCF9B] transition-colors">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/doc:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-black uppercase tracking-widest">
                            View PDF
                          </div>
                        </div>
                      </div>
                    )}
                    {exp.offerLetterPdf && (
                      <div className="flex flex-col gap-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Offer Letter</span>
                        <div 
                          onClick={() => setSelectedPdf({ url: exp.offerLetterPdf!, title: 'Offer Letter' })}
                          className="relative aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer group/doc"
                        >
                          {exp.offerLetterThumbnail ? (
                            <img src={exp.offerLetterThumbnail} className="w-full h-full object-cover opacity-60 group-hover/doc:opacity-100 transition-opacity" alt="Offer Letter Preview" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#6BCF9B]/40 group-hover/doc:text-[#6BCF9B] transition-colors">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/doc:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-black uppercase tracking-widest">
                            View PDF
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden md:block w-1/2"></div>
          </motion.div>
        ))}
      </div>

      {/* Experience Modal (Add/Edit) */}
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
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">
                {editingIndex !== null ? 'Update career chapter' : 'New Career Chapter'}
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Job Role</label>
                    <input required value={formState.role} onChange={e => setFormState({...formState, role: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Senior Flutter Developer" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Period</label>
                    <input required value={formState.period} onChange={e => setFormState({...formState, period: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Feb 2024 - Present" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Company Name</label>
                  <input required value={formState.company} onChange={e => setFormState({...formState, company: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Global Tech Hub" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Skills Used (comma separated)</label>
                  <input value={formState.skills} onChange={e => setFormState({...formState, skills: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Flutter, Dart, AI Automation" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Key Contributions (One per line)</label>
                  <textarea required value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} rows={4} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30 resize-none" placeholder="Optimized state management...&#10;Mentored 3 junior devs...&#10;Architected cloud infrastructure..." />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Certificate Docs</label>
                    <div className="space-y-2">
                       <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center">
                          {formState.certificatePdf ? <span className="text-[8px] text-[#6BCF9B] font-black uppercase">PDF Uploaded</span> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload PDF</span>}
                          <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileChange(e, 'certificatePdf')} />
                       </label>
                       <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center overflow-hidden">
                          {formState.certificateThumbnail ? <img src={formState.certificateThumbnail} className="w-full h-full object-cover" /> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload Pic Preview</span>}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'certificateThumbnail')} />
                       </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest">Offer Letter Docs</label>
                    <div className="space-y-2">
                       <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center">
                          {formState.offerLetterPdf ? <span className="text-[8px] text-[#6BCF9B] font-black uppercase">PDF Uploaded</span> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload PDF</span>}
                          <input type="file" className="hidden" accept="application/pdf" onChange={(e) => handleFileChange(e, 'offerLetterPdf')} />
                       </label>
                       <label className="flex flex-col items-center justify-center w-full h-24 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors p-2 text-center overflow-hidden">
                          {formState.offerLetterThumbnail ? <img src={formState.offerLetterThumbnail} className="w-full h-full object-cover" /> : <span className="text-[8px] text-white/30 font-bold uppercase">Upload Pic Preview</span>}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'offerLetterThumbnail')} />
                       </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full py-5 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6BCF9B]/20 transition-transform active:scale-95">
                  {editingIndex !== null ? 'Sync Update' : 'Archive Achievement'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF Viewer Lightbox */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-6xl w-full h-[90vh] bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b flex justify-between items-center bg-[#1F7A5A]">
                <h3 className="text-xl font-black uppercase tracking-tighter text-white">{selectedPdf.title}</h3>
                <button 
                  onClick={() => setSelectedPdf(null)} 
                  className="w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="flex-1 bg-gray-100">
                <embed 
                  src={selectedPdf.url} 
                  type="application/pdf" 
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
