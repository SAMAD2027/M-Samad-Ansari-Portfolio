
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const [downloadCount, setDownloadCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const count = localStorage.getItem('portfolio_cv_downloads') || '0';
    setDownloadCount(parseInt(count));
  }, []);

  const handleDownloadCV = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const newCount = downloadCount + 1;
      setDownloadCount(newCount);
      localStorage.setItem('portfolio_cv_downloads', newCount.toString());
      setIsSyncing(false);
      
      // In a real app, you'd trigger the file download here
      alert("Resume database entry retrieved. Initiating secure download...");
    }, 800);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 pt-28 pb-12 overflow-hidden text-[#F9FAF7]">
      {/* Dynamic Background Glass Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -40, 0],
          x: [0, 30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] right-[15%] w-80 h-80 rounded-full bg-white/5 backdrop-blur-[120px] border border-white/20 pointer-events-none z-0 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
      />
      <motion.div 
        animate={{ 
          y: [0, 50, 0],
          x: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#6BCF9B]/5 backdrop-blur-[140px] border border-[#6BCF9B]/10 pointer-events-none z-0 shadow-[0_0_150px_rgba(107,207,155,0.05)]"
      />

      <motion.div 
        className="max-w-7xl mx-auto w-full relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          variants={itemVariants}
          className="relative w-full p-8 md:p-16 rounded-[60px] bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.3)] group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6BCF9B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-[#F9FAF7] text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-3xl shadow-lg"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6BCF9B] shadow-[0_0_15px_rgba(107,207,155,0.8)] animate-pulse"></span>
                  Flutter, UI/UX & Intelligent Automation
                </motion.div>
                
                {isSyncing && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[8px] font-black uppercase tracking-widest text-[#6BCF9B] animate-pulse"
                  >
                    Syncing DB...
                  </motion.span>
                )}
              </div>
              
              <div className="relative mb-8">
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl md:text-[4rem] lg:text-[5rem] font-black tracking-tighter leading-[1] select-none uppercase flex flex-wrap gap-x-4"
                >
                  <span className="drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]">
                    SOFTWARE
                  </span>
                  <span className="text-[#6BCF9B] drop-shadow-[0_10px_30px_rgba(107,207,155,0.3)]">
                    ENGINEER
                  </span>
                </motion.h1>
              </div>
              
              <motion.div 
                variants={itemVariants}
                className="space-y-4 text-sm md:text-base text-[#F9FAF7]/90 mb-10 leading-relaxed max-w-2xl font-light"
              >
                <p>
                  I am a Software Developer specializing in <strong>Flutter front-end development and UI/UX</strong>, with a strong focus on building clean, responsive, and user-centered mobile applications.
                </p>
                <p>
                  My expertise lies in <strong>Flutter and Python</strong>, where I design intuitive interfaces, craft seamless user experiences, and translate product ideas into scalable mobile solutions. I follow a component-based approach to UI development, ensuring performance, consistency, and maintainability across applications.
                </p>
                <p>
                  In addition to mobile development, I work with <strong>AI automation and no-code platforms</strong> to build intelligent workflows and AI-powered agents for practical, real-world use cases. My experience includes prompt engineering, ChatGPT-based automations, and leveraging tools such as <strong>Zapier, Make.com, N8N, and DeepSeek</strong> to optimize processes like email automation, data extraction, and productivity workflows.
                </p>
                <p>
                  Currently pursuing a <strong>Bachelor’s degree in Software Engineering (BSSE) at UBIT</strong>, I continuously strengthen my technical and design skills by building real-world projects and exploring emerging AI technologies.
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <button 
                  onClick={handleDownloadCV}
                  className="w-full sm:w-auto px-10 py-5 bg-[#6BCF9B] text-[#1F7A5A] rounded-full font-black text-lg hover:bg-[#2FB7A3] transition-all hover:-translate-y-1 active:translate-y-0 shadow-[0_20px_40px_rgba(107,207,155,0.2)] interactive group flex items-center justify-center gap-3"
                >
                  Download CV
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <a 
                  href="https://www.linkedin.com/in/muhammad-samad-ansari/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-3xl text-[#F9FAF7] rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all interactive shadow-xl flex items-center justify-center gap-3"
                >
                  LinkedIn
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div 
                variants={itemVariants}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-[#6BCF9B]/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-[50px] p-2 bg-white/10 border border-white/20 backdrop-blur-3xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-[#6BCF9B]/40 group-hover:scale-[1.02]">
                  <div className="w-full h-full rounded-[40px] overflow-hidden bg-[#1F7A5A]/50">
                    <img 
                      src="/images/ME.png" 
                      alt="Muhammad Samad Ansari"
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">Flutter</span>
                    <span className="px-3 py-1 bg-[#6BCF9B]/20 backdrop-blur-md border border-[#6BCF9B]/30 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">AI & UI/UX</span>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#6BCF9B]/40 rounded-tl-2xl" />
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[#6BCF9B]/40 rounded-br-2xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-12 p-8 md:p-10 rounded-[40px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 shadow-[0_10px_50px_rgba(0,0,0,0.2)] grid grid-cols-2 md:grid-cols-4 gap-12 text-[#F9FAF7]/50 font-bold"
        >
          {[
            { label: 'CV Downloads', val: downloadCount.toString() },
            { label: 'UI/UX Satisfaction', val: '100%' },
            { label: 'AI Automations', val: '24+' },
            { label: 'Current Study', val: 'BSSE' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2 group cursor-default">
              <span className="text-[#F9FAF7] text-2xl md:text-3xl group-hover:text-[#6BCF9B] transition-colors duration-500 font-black">{stat.val}</span>
              <span className="uppercase tracking-[0.2em] text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
