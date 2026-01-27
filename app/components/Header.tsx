
import React, { useState } from 'react';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 rounded-3xl ${
      isScrolled 
        ? 'glass-animated border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="px-8 flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 bg-[#6BCF9B] rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-[#6BCF9B]/10 font-black">S</div>
          <span className="text-[#F9FAF7] text-lg md:text-xl truncate max-w-[180px] sm:max-w-[250px] md:max-w-none font-black">Muhammad Samad Ansari</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`text-sm font-bold transition-all hover:text-[#6BCF9B] ${isScrolled ? 'text-[#F9FAF7]' : 'text-[#F9FAF7]/80'}`}
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" className="ml-4 px-6 py-2.5 bg-[#6BCF9B] text-white rounded-full text-sm font-black hover:bg-[#2FB7A3] transition-all shadow-lg shadow-[#6BCF9B]/10 hover:-translate-y-0.5 active:translate-y-0">
            Let's Talk
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-[#F9FAF7]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full mt-4 left-0 w-full glass-animated border border-white/10 rounded-3xl p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300 shadow-2xl">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-lg font-black text-[#F9FAF7] hover:text-[#6BCF9B] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="w-full text-center px-5 py-4 bg-[#6BCF9B] text-white rounded-2xl text-sm font-black"
            onClick={() => setMobileMenuOpen(false)}
          >
            Let's Talk
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
