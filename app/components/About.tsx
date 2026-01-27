import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 text-[#F9FAF7]">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square rounded-[40px] overflow-hidden hover:shadow-2xl transition-all duration-700 border-8 border-white shadow-xl shadow-black/20">
            <img 
              src="/images/banner-ubit.jpg"

            
              alt="University Building" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#6BCF9B] text-white shadow-2xl rounded-[32px] p-8 hidden md:block">
            <div className="h-full flex flex-col justify-end">
              <p className="text-[10px] text-white/70 font-black uppercase tracking-widest mb-2">Currently At</p>
              <p className="text-lg font-bold">UBIT (BSSE)</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-4xl font-bold mb-8 text-[#F9FAF7]">
            Crafting <span className="text-[#6BCF9B] italic">intelligent</span> mobile applications with <span className="text-[#6BCF9B] italic">precision</span> and <span className="text-[#6BCF9B] italic">purpose</span>.
          </h2>
          <div className="space-y-6 text-[#F9FAF7]/70 text-lg leading-relaxed font-medium">
            <p>
              I focus on building clean, high-performance Flutter applications that deliver seamless user experiences across iOS and Android.
            </p>
            <p>
              With a strong foundation in Software Engineering, I bridge academic principles with real-world development by designing scalable front-end architectures, refining UI/UX, and ensuring performance-driven mobile solutions. My work emphasizes clarity, usability, and maintainability core elements of modern mobile engineering.
            </p>
            <p>
              Beyond mobile development, I integrate AI automation into applications and workflows to extend functionality beyond static interfaces. By leveraging tools such as <strong>Zapier, Make.com</strong>, and no-code automation platforms, I design intelligent systems that streamline processes, enhance productivity, and enable smarter application behaviour.
            </p>
            <p>
              I actively explore prompt engineering, AI-assisted workflows, and no-code scaling strategies to continuously improve how software interacts with users and data. My goal is to combine thoughtful design, robust engineering, and intelligent automation to build impactful digital products.
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="p-8 rounded-3xl bg-white/5 shadow-sm border border-white/10 backdrop-blur-sm">
              <h4 className="font-black text-[#6BCF9B] mb-2 uppercase text-xs tracking-widest">Mobile First</h4>
              <p className="text-sm text-[#F9FAF7]/60 font-medium">High-fidelity Flutter apps for iOS and Android.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 shadow-sm border border-white/10 backdrop-blur-sm">
              <h4 className="font-black text-[#6BCF9B] mb-2 uppercase text-xs tracking-widest">AI Infused</h4>
              <p className="text-sm text-[#F9FAF7]/60 font-medium">Intelligent agents and automated workflows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
