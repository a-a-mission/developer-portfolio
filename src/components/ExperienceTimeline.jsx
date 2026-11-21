import React from 'react';
import { Briefcase, Calendar, MapPin, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ExperienceTimeline() {
  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Experience &amp; Leadership
          </h2>
          <p className="text-slate-400 text-sm font-sans">
            A track record of taking complex problems, leading frontend initiatives, and scaling high-throughput applications.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
          {portfolioData.experience.map((item, index) => (
            <div key={index} className="relative group">
              {/* Glowing Node on Timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-dark-950 border-2 border-indigo-500 group-hover:scale-125 group-hover:border-cyan-400 transition-all duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mx-auto mt-0.5 group-hover:bg-cyan-300"></div>
              </div>

              {/* Timeline Card */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 hover:border-indigo-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-sm font-mono text-indigo-400">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-4 font-sans">
                  {item.description}
                </p>

                {/* Skills used */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-400 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
