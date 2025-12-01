'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Protocol', href: '#protocol' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-6 
      ${isScrolled ? 'pt-4' : 'pt-6'}`}>
      
      <div className={`max-w-7xl mx-auto rounded-full px-6 py-4 flex items-center justify-between transition-all duration-300
        ${isScrolled 
          ? 'bg-navy-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50' 
          : 'bg-transparent border border-transparent'}`}>
        
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950 rounded-xl border border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-neon-cyan/20 blur-md group-hover:bg-neon-cyan/40 transition-all duration-500"></div>
            <span className="relative text-neon-cyan font-bold font-mono text-sm tracking-tighter">A2I</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight leading-none text-white text-lg">BARRIOS</span>
            <span className="font-mono text-[10px] text-neon-gold tracking-widest uppercase">Systems</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Link 
            href="#contact" 
            className="flex items-center gap-2 px-6 py-2.5 bg-white text-navy-950 font-bold text-sm rounded-full hover:bg-neon-cyan transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,234,255,0.4)]"
          >
            <span>Initialize</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full p-4 md:hidden">
          <div className="bg-navy-900 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-300 hover:text-neon-cyan transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#contact"
              className="mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-neon-cyan text-navy-950 font-bold rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Initialize</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
