import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Command, Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { portfolioData } from '../data/portfolioData';

export default function Navbar({ onOpenCommandPalette, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'About & Bento', href: '#bento' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    soundEffects.play('click');
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090D]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a
          href="#overview"
          onClick={(e) => handleNavClick(e, '#overview')}
          className="group flex items-center gap-3"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
              &lt;/&gt;
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
              {portfolioData.personal.name}
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                Available
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono -mt-0.5 hidden sm:block">{portfolioData.personal.title}</span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundEffects.play('click');
            }}
            title={soundEnabled ? 'Mute sound effects' : 'Enable tactile audio'}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Command Palette Button */}
          <button
            onClick={() => {
              soundEffects.play('click');
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <Command className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden xl:inline text-slate-400">Quick Menu</span>
            <kbd className="px-1.5 py-0.5 rounded bg-dark-800 border border-white/10 text-[10px] text-slate-300">⌘K</kbd>
          </button>

          {/* Resume CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="relative group overflow-hidden rounded-xl p-[1px] font-medium text-xs shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative px-3.5 py-2 rounded-[11px] bg-dark-900/90 hover:bg-dark-900 transition-colors flex items-center gap-1.5 text-white">
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>

        {/* Mobile & Tablet menu controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => {
              onToggleSound();
              soundEffects.play('click');
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 bg-dark-900/95 backdrop-blur-2xl border-b border-white/10 flex flex-col gap-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 py-2"
            >
              <Command className="w-4 h-4 text-indigo-400" />
              <span>Command Palette (⌘K)</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-xs font-semibold text-white"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
