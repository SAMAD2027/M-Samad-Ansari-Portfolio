
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis, RadarProps } from 'recharts';
import { SKILLS as INITIAL_SKILLS } from '../constants';
import { Skill } from '../types';

interface SkillsProps {
  isAdmin?: boolean;
}

const Skills: React.FC<SkillsProps> = ({ isAdmin }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 80,
    category: 'Frontend'
  });

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_skills');
    if (saved) {
      setSkills(JSON.parse(saved));
    } else {
      // Add IDs to initial skills if they don't have them
      const initialWithIds = INITIAL_SKILLS.map((s, idx) => ({ ...s, id: `init-${idx}` })) as Skill[];
      setSkills(initialWithIds);
      localStorage.setItem('portfolio_skills', JSON.stringify(initialWithIds));
    }
  }, []);

  const coreCompetencies = [
    'Flutter', 
    'React', 
    'UI/UX Design', 
    'Prompt Engineering', 
    'AI Automation', 
    'Node.js', 
    'Python', 
    'JavaScript'
  ];
  
  const radarData = coreCompetencies.map(name => {
    const skill = skills.find(s => s.name === name);
    return {
      subject: name,
      level: skill ? skill.level : 60,
      fullMark: 100,
    };
  });

  const categories: Skill['category'][] = ['Frontend', 'Backend', 'DevOps', 'Tools'];

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormState({ name: '', level: 80, category: 'Frontend' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setFormState({ name: skill.name, level: skill.level, category: skill.category });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Do you want to delete this skill from your profile?")) {
      const updated = skills.filter(s => s.id !== id);
      setSkills(updated);
      localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const skillData: Skill = {
      ...formState,
      id: editingId || crypto.randomUUID(),
    };

    let updated: Skill[];
    if (editingId) {
      updated = skills.map(s => s.id === editingId ? skillData : s);
    } else {
      updated = [...skills, skillData];
    }

    setSkills(updated);
    localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 relative text-[#F9FAF7] py-12">
      <div className="absolute top-0 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#6BCF9B]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-[#6BCF9B]/20 border border-[#6BCF9B]/40 text-white text-sm md:text-base font-black uppercase tracking-[0.4em] mb-8 shadow-[0_0_30px_rgba(107,207,155,0.25)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6BCF9B] shadow-[0_0_15px_#6BCF9B] animate-pulse"></span>
            Technical Expertise
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-[#F9FAF7] uppercase leading-[0.85]">
            TECH<br/><span className="text-[#6BCF9B] drop-shadow-[0_0_20px_rgba(107,207,155,0.4)]">ARSENAL</span>
          </h2>
          <div className="flex items-center gap-4">
            <p className="text-[#F9FAF7]/70 text-xl leading-relaxed font-light max-w-lg">
              Mastering the intersection of high-fidelity mobile frontends, intelligent AI workflows, and user-centric design principles.
            </p>
            {isAdmin && (
               <button 
               onClick={handleOpenAdd}
               className="p-4 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-110 active:scale-95 transition-all"
               title="Add New Skill"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
             </button>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex flex-col items-end text-right"
        >
          <div className="text-[130px] font-black text-white/20 uppercase select-none leading-none mb-[-25px] tracking-[0.1em] blur-[0.5px]">SKILLS</div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-[#6BCF9B]">Core Proficiencies</span>
            <div className="w-16 h-[1px] bg-[#6BCF9B]/50"></div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 h-[600px] md:h-[750px] w-full relative group flex items-center justify-center overflow-visible bg-white/[0.02] rounded-[60px] border border-white/5 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-[#6BCF9B]/10 blur-[120px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
          
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart 
              cx="50%" 
              cy="50%" 
              outerRadius="60%" 
              data={radarData} 
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            >
              <defs>
                <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6BCF9B" stopOpacity={0.7}/>
                  <stop offset="100%" stopColor="#2FB7A3" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <PolarGrid stroke="#F9FAF740" strokeDasharray="4 4" />
            <PolarAngleAxis 
  dataKey="subject" 
  tick={({ payload, x, y, cx, cy }: any) => {
    const anchor = x > cx ? 'start' : x < cx ? 'end' : 'middle';
    const dy = y < cy ? -18 : 30;
    const dx = x > cx ? 12 : x < cx ? -12 : 0;

    let label =
      payload.value === 'Prompt Engineering'
        ? ['Prompt', 'Engineering']
        : [payload.value];
    if (payload.value === 'UI/UX Design') {
      label = ['UI/UX', 'Design'];
    } else {
      label = [payload.value];
    }
    
    return (
      <text
        x={x + dx}
        y={y}
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="900"
        textAnchor={anchor}
        className="uppercase tracking-[0.12em] drop-shadow-md select-none"
      >
        {label.map((line: string, i: number) => (
          <tspan key={i} x={x + dx} dy={i === 0 ? dy : 16}>
            {line}
          </tspan>
        ))}
      </text>
    );
  }}          />

              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Proficiency"
                dataKey="level"
                stroke="#6BCF9B"
                strokeWidth={5}
                fill="url(#radarGrad)"
                fillOpacity={0.8}
                animationDuration={2500}
              />
            </RadarChart>
          </ResponsiveContainer>
        
           {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#1F7A5A] border-8 border-[#6BCF9B]/20 flex items-center justify-center z-20 shadow-[0_0_80px_rgba(107,207,155,0.5)] group-hover:scale-110 transition-transform duration-500">
            <div className="w-14 h-14 text-[#6BCF9B] animate-pulse">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
            </div>
          </div> */}
        </motion.div> 

        <div className="lg:col-span-6 grid sm:grid-cols-1 gap-y-12 h-full content-center">
          {categories.map((category, catIdx) => (
            <motion.div 
              key={category} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-white font-black text-2xl opacity-100 font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">/0{catIdx + 1}</span>
                <h3 className="text-white font-black uppercase tracking-[0.3em] text-[15px] border-b border-white/20 pb-2 w-full">{category}</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
                {skills.filter(s => s.category === category).map((skill, skillIdx) => (
                  <div key={skill.id} className="group relative">
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#6BCF9B] transition-colors duration-300">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-3">
                        {isAdmin && (
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenEdit(skill)} className="text-[#6BCF9B] hover:text-white transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth={2.5}/></svg></button>
                            <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:text-white transition-colors"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2.5}/></svg></button>
                          </div>
                        )}
                        <span className="text-[#6BCF9B] font-mono text-xs font-black tracking-tighter">
                          {skill.level}<span className="text-[10px] opacity-40 ml-0.5">%</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="h-[6px] w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-md border border-white/5 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: 0.2 + (skillIdx * 0.05), ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-[#6BCF9B] to-[#2FB7A3] relative rounded-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
              className="w-full max-w-md bg-[#1F7A5A] border border-white/20 rounded-[40px] p-10 shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">
                {editingId ? 'Update Skill' : 'New Skill'}
              </h3>
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Skill Name</label>
                  <input required value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30" placeholder="e.g. Flutter" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Expertise Level ({formState.level}%)</label>
                  <input type="range" min="1" max="100" value={formState.level} onChange={e => setFormState({...formState, level: parseInt(e.target.value)})} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#6BCF9B]" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">Category</label>
                  <select value={formState.category} onChange={e => setFormState({...formState, category: e.target.value as Skill['category']})} className="w-full bg-white/5 border-white/10 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#6BCF9B]/30 appearance-none">
                    {categories.map(cat => <option key={cat} value={cat} className="bg-[#1F7A5A]">{cat}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-5 bg-[#6BCF9B] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-[#6BCF9B]/20">
                  {editingId ? 'Sync Updates' : 'Publish Skill'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer-move 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Skills;
<Skills isAdmin={true} />
