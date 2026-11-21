import React, { useState, useEffect } from 'react';
import {
  Code2,
  MapPin,
  Clock,
  Compass,
  Cpu,
  Layers,
  Sparkles,
  Search,
  Radio,
  Music,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';
import InteractiveTerminal from './InteractiveTerminal';
import InteractiveLab from './InteractiveLab';

export default function BentoGrid() {
  const [activeStackTab, setActiveStackTab] = useState('all');
  const [skillSearch, setSkillSearch] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Live Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter skills
  const allSkills = [
    ...portfolioData.skills.frontend.map(s => ({ ...s, category: 'frontend' })),
    ...portfolioData.skills.backend.map(s => ({ ...s, category: 'backend' })),
    ...portfolioData.skills.devops.map(s => ({ ...s, category: 'devops' }))
  ];

  const filteredSkills = allSkills.filter(skill => {
    const matchesTab = activeStackTab === 'all' || skill.category === activeStackTab;
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
                          skill.tag.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <section id="bento" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Bento Grid</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Engineering Hub &amp; Playground
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-sans">
            Explore my developer stack, real-time command terminal, live UI lab, and timezone availability in an interconnected system.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1: Profile & Timezone Bio (Cols: 1-2 on lg) */}
          <div className="glass-card rounded-3xl p-6 md:col-span-2 lg:col-span-2 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500"></div>

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/40 p-0.5">
                    <img
                      src={portfolioData.personal.avatar}
                      alt={portfolioData.personal.name}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-dark-900 rounded-full"></span>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    {portfolioData.personal.name}
                    <span className="text-xs font-mono font-normal text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                      Developer
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {portfolioData.personal.tagline}
                  </p>
                </div>
              </div>

              {/* Timezone and Location HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                      Local Time (Dhaka)
                    </span>
                    <span className="text-sm font-mono font-semibold text-white">
                      {currentTime || "12:00:00 PM"} <span className="text-cyan-400 text-xs">GMT+6</span>
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">
                      Base Location
                    </span>
                    <span className="text-sm font-sans font-medium text-white">
                      {portfolioData.personal.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Philosophy Pills */}
              <div className="flex flex-wrap gap-2">
                {["Component Architecture", "Design Systems", "Web Performance", "API Security", "Clean Code"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {portfolioData.personal.status.notice}
              </span>
            </div>
          </div>

          {/* CARD 2: Interactive Terminal CLI */}
          <div className="rounded-3xl md:col-span-2 lg:col-span-2 overflow-hidden">
            <InteractiveTerminal isEmbedded={true} />
          </div>

          {/* CARD 3: Tech Stack Matrix */}
          <div className="glass-card rounded-3xl p-6 md:col-span-2 lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-semibold text-white">Tech Stack Matrix</h4>
                    <p className="text-xs text-slate-400 font-mono">Filter by specialty or search tools</p>
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-[11px] font-mono self-start sm:self-auto">
                  {['all', 'frontend', 'backend', 'devops'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        soundEffects.play('click');
                        setActiveStackTab(tab);
                      }}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        activeStackTab === tab
                          ? 'bg-indigo-600 text-white font-medium shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stack Search bar */}
              <div className="relative mb-4">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter skills (e.g. React, Docker, Python)..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-indigo-500/30 transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Proficiency progress bar */}
                    <div className="w-full h-1 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>{filteredSkills.length} Technologies displayed</span>
              <span className="text-indigo-400">Modern 2026 Ecosystem</span>
            </div>
          </div>

          {/* CARD 4: Interactive UI Sandbox / Lab */}
          <div className="glass-card rounded-3xl p-6 md:col-span-1 lg:col-span-1">
            <InteractiveLab />
          </div>

          {/* CARD 5: Soundtrack / Dev Vibes Equalizer */}
          <div className="glass-card rounded-3xl p-6 md:col-span-1 lg:col-span-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold text-white">Coding Soundtrack</h4>
                    <p className="text-[11px] text-slate-400 font-mono">Deep work audio loop</p>
                  </div>
                </div>
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              </div>

              {/* Music Player Mockup */}
              <div className="p-3.5 rounded-2xl bg-dark-950/70 border border-white/10 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-emerald-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    LO-FI
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">Midnight Cyber Synth</p>
                    <p className="text-[10px] text-slate-400 font-mono">Deep Focus • 124 BPM</p>
                  </div>
                </div>

                {/* Animated Equalizer Bars */}
                <div className="flex items-end justify-between h-8 px-2 gap-1 bg-dark-900 rounded-lg py-1 border border-white/5">
                  {[40, 75, 55, 90, 60, 85, 45, 100, 70, 50, 80, 65, 95, 35].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${(i % 5) * 0.15}s`,
                        animationDuration: '0.8s'
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Optimal coding flow powered by high-tempo synthwave, minimal house, and ambient soundscapes.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Status: In the Zone</span>
              <span className="text-emerald-400 font-semibold">60 FPS Flow</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
