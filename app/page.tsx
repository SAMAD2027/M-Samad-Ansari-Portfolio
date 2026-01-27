'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import CustomCursor from './components/CustomCursor';
import LiquidChrome from './components/LiquidChrome';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for ?admin=true in URL to enable management buttons
    const params = new URLSearchParams(window.location.search);
    setIsAdmin(params.get('admin') === 'true');

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-[#6BCF9B]/30 selection:text-[#F9FAF7] bg-[#1F7A5A]">
      <CustomCursor />
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <LiquidChrome
          baseColor={[0.1, 0.4, 0.3]} 
          speed={0.12}
          amplitude={0.7}
          frequencyX={1.5}
          frequencyY={1.2}
          interactive={true}
        />
      </div>

      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-transparent via-[#1F7A5A]/10 to-[#1F7A5A]/30 pointer-events-none"></div>

      <Header isScrolled={isScrolled} />
      
      <main className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about" className="py-24 md:py-40 reveal">
          <About />
        </section>

        <section id="skills" className="py-24 md:py-40 bg-white/5 backdrop-blur-[2px] border-y border-[#6BCF9B]/5 reveal">
          <Skills isAdmin={isAdmin} />
        </section>

        <section id="projects" className="py-24 md:py-40 reveal">
          <Projects isAdmin={isAdmin} />
        </section>

        <section id="certificates" className="py-24 md:py-40 bg-white/5 backdrop-blur-[2px] border-y border-[#6BCF9B]/5 reveal">
          <Certificates isAdmin={isAdmin} />
        </section>

        <section id="experience" className="py-24 md:py-40 reveal">
          <Experience isAdmin={isAdmin} />
        </section>

        <section id="contact" className="py-24 md:py-40 reveal">
          <Contact />
        </section>
      </main>

      <footer className="relative z-10 py-20 border-t border-[#6BCF9B]/10 text-center bg-[#1F7A5A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6 text-[#F9FAF7]">
          <div className="text-2xl font-black tracking-tighter uppercase">Muhammad Samad Ansari</div>
          <p className="text-[#F9FAF7]/70 text-sm max-w-xs leading-relaxed font-medium">
            Designed and engineered with passion. Leveraging AI and modern web standards.
          </p>
          <div className="flex gap-8 mt-4">
            <a href="mailto:samadansari521@gmail.com" className="text-xs uppercase tracking-widest font-bold text-[#F9FAF7]/50 hover:text-[#6BCF9B] transition-colors interactive">Email</a>
            <a href="https://www.linkedin.com/in/muhammad-samad-ansari/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#F9FAF7]/50 hover:text-[#6BCF9B] transition-colors interactive">LinkedIn</a>
            <a href="https://github.com/SAMAD2027" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-bold text-[#F9FAF7]/50 hover:text-[#6BCF9B] transition-colors interactive">GitHub</a>
          </div>
          {isAdmin && (
            <div className="mt-4 px-4 py-1 rounded-full bg-[#6BCF9B]/20 border border-[#6BCF9B]/40 text-[#6BCF9B] text-[10px] font-black uppercase tracking-widest">
              Admin Mode Enabled
            </div>
          )}
          <p className="mt-10 text-[10px] uppercase tracking-widest text-[#F9FAF7]/30">© {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}
