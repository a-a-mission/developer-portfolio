import React, { useState, useEffect } from 'react';
import { ArrowDown, Code2, Sparkles, Terminal, ExternalLink, Mail, Copy, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';
import { GithubIcon } from './Icons';

export default function Hero({ onOpenTerminal }) {
  const titles = [
    "Full-Stack Web Developer",
    "Modern React & Next.js Engineer",
    "UI/UX Craftsmanship Enthusiast",
    "High-Performance System Builder"
  ];
  
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === current) {
      const timeout = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.substring(0, displayText.length - 1)
          : current.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  const copyEmail = () => {
    soundEffects.play('success');
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Avatar Profile Photo */}
          <div className="relative mb-6 group cursor-pointer">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse"></div>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/20 p-1 bg-dark-900 shadow-2xl">
              <img
                src={portfolioData.personal.avatar}
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-dark-900 shadow-md flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white"></span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 hover:border-emerald-500/40 transition-colors cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-300">
              {portfolioData.personal.status.state}
            </span>
            <span className="text-slate-600 font-mono">|</span>
            <span className="text-xs font-mono text-emerald-400 font-semibold hidden sm:inline">
              Q1/Q2 Available
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white mb-6">
            Building memorable <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 glow-text">
              interactive web experiences
            </span>
          </h1>

          {/* Dynamic Cycling Role */}
          <div className="flex items-center justify-center gap-2 text-lg sm:text-2xl font-mono text-slate-300 mb-6 h-9">
            <span className="text-indigo-400">&gt;</span>
            <span className="text-white font-semibold">{displayText}</span>
            <span className="w-2.5 h-6 bg-cyan-400 animate-pulse inline-block"></span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            Hi, I'm <strong className="text-slate-200">{portfolioData.personal.name}</strong>. I specialize in crafting ultra-responsive, accessible, and high-performance web applications with modern design systems and clean architecture.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a
              href="#projects"
              onClick={() => soundEffects.play('click')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-medium text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Explore Projects</span>
            </a>

            <button
              onClick={() => {
                soundEffects.play('terminal');
                onOpenTerminal();
              }}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-sm hover:border-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Launch Terminal CLI</span>
            </button>

            <button
              onClick={copyEmail}
              className="px-5 py-3.5 rounded-xl bg-dark-800/80 hover:bg-dark-750 border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>{portfolioData.personal.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Live Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-white/10">
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-white mb-0.5">
                {portfolioData.personal.yearsExperience}+ Years
              </span>
              <span className="text-xs font-mono text-slate-400">Industry Experience</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-cyan-400 mb-0.5">
                {portfolioData.personal.completedProjects}+
              </span>
              <span className="text-xs font-mono text-slate-400">Projects Shipped</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-indigo-400 mb-0.5">
                {portfolioData.personal.clientSatisfaction}
              </span>
              <span className="text-xs font-mono text-slate-400">Satisfaction Rate</span>
            </div>
            <div className="glass-card p-4 rounded-2xl flex flex-col items-center">
              <span className="font-display font-bold text-2xl sm:text-3xl text-purple-400 mb-0.5">
                {portfolioData.personal.coffeeCups}+
              </span>
              <span className="text-xs font-mono text-slate-400">Coffee Mugs Logged</span>
            </div>
          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="flex justify-center mt-12">
        <a
          href="#bento"
          onClick={() => soundEffects.play('click')}
          className="text-slate-500 hover:text-slate-300 transition-colors p-2 rounded-full animate-bounce"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
