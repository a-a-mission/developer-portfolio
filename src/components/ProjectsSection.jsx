import React, { useState } from 'react';
import { ExternalLink, Sparkles, Layers, ArrowRight, Code } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';
import { GithubIcon } from './Icons';

export default function ProjectsSection({ onSelectProject }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Full Stack & AI', 'Full Stack', 'Web App', 'Creative Tech'];

  const filteredProjects = filter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Work &amp; Labs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Featured Case Studies
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mt-6 md:mt-0 p-1 rounded-2xl bg-white/[0.03] border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.play('click');
                  setFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  filter === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between group relative overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Subtle top gradient glow on card */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-white/5 border border-white/10 text-cyan-300">
                    {project.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-sans">
                  {project.shortDescription}
                </p>

                {/* Metrics Highlight Pill */}
                <div className="mb-6 p-3 rounded-xl bg-dark-950/60 border border-white/5 font-mono text-xs text-indigo-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span>{project.metrics}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundEffects.play('click');
                    onSelectProject(project);
                  }}
                  className="text-xs font-mono font-medium text-white group-hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                >
                  <span>Architecture &amp; Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEffects.play('click')}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="View Source Code"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEffects.play('click')}
                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition-colors"
                    title="Open Live Preview"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
