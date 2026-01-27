
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';

interface ProjectsProps {
  isAdmin?: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isAdmin }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    tags: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(PROJECTS);
      localStorage.setItem('portfolio_projects', JSON.stringify(PROJECTS));
    }
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({ title: '', description: '', tags: '', imageUrl: '', githubUrl: '', liveUrl: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingId(project.id);
    setFormState({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      imageUrl: project.imageUrl,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bhai, kya aap waqai ye project delete karna chahte hain?")) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: Project = {
      id: editingId || crypto.randomUUID(),
      title: formState.title,
      description: formState.description,
      tags: formState.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      imageUrl: formState.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      githubUrl: formState.githubUrl || undefined,
      liveUrl: formState.liveUrl || undefined
    };

    let updated: Project[];
    if (editingId) {
      updated = projects.map(p => p.id === editingId ? projectData : p);
    } else {
      updated = [projectData, ...projects];
    }

    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 text-[#F9FAF7]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal">
        <div>
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">Featured Work</h2>
          <p className="text-[#F9FAF7]/60 max-w-xl font-medium">A selection of projects that demonstrate my technical breadth and problem-solving abilities.</p>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <button 
              onClick={handleOpenAdd}
              className="px-6 py-3 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#2FB7A3] transition-all shadow-xl shadow-[#6BCF9B]/10 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              Add New Project
            </button>
          )}
          <a href="#" className="flex items-center gap-2 text-[#6BCF9B] font-black uppercase text-xs tracking-widest hover:text-[#2FB7A3] transition-colors interactive">
            View all projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative flex flex-col bg-white/5 backdrop-blur-md rounded-[40px] overflow-hidden border border-white/10 hover:border-[#6BCF9B]/30 shadow-sm hover:shadow-2xl hover:shadow-black/20 transition-all duration-500 reveal interactive"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleOpenEdit(project); }}
                    className="w-10 h-10 bg-[#6BCF9B] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                    title="Edit Project"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(project.id); }}
                    className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                    title="Delete Project"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-10 flex-1 flex flex-col relative z-10">
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-[#F9FAF7] text-[9px] font-black uppercase tracking-widest border border-white/10">{tag}</span>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-[#F9FAF7]">{project.title}</h3>
              <p className="text-[#F9FAF7]/60 text-sm leading-relaxed mb-8 flex-1 font-medium">{project.description}</p>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.githubUrl && (
                  <a href={project.githubUrl} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[#F9FAF7]/50 hover:text-[#F9FAF7] transition-all interactive">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} className="flex-1 text-center py-3.5 bg-[#6BCF9B] hover:bg-[#2FB7A3] rounded-2xl text-white text-sm font-black transition-all shadow-lg shadow-[#6BCF9B]/10 interactive group">
                    View Project
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal (Add/Edit) */}
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
                {editingId ? 'Edit Project' : 'New Project'}
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Project Title</label>
                  <input required value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. My Awesome App" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Description</label>
                  <textarea required value={formState.description} onChange={e => setFormState({...formState, description: e.target.value})} rows={3} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30 resize-none" placeholder="Explain what the project is..." />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Tags (comma separated)</label>
                  <input required value={formState.tags} onChange={e => setFormState({...formState, tags: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="Flutter, AI, Firebase" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Image URL (Unsplash recommended)</label>
                  <input value={formState.imageUrl} onChange={e => setFormState({...formState, imageUrl: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="https://..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">GitHub Link</label>
                    <input value={formState.githubUrl} onChange={e => setFormState({...formState, githubUrl: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="#" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Live Link</label>
                    <input value={formState.liveUrl} onChange={e => setFormState({...formState, liveUrl: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="#" />
                  </div>
                </div>
                <button type="submit" className="w-full py-5 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6BCF9B]/20">
                  {editingId ? 'Update Project' : 'Publish Project'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
