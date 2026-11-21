import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ProjectsSection from './components/ProjectsSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import ContactSection from './components/ContactSection';
import ParticleBackground from './components/ParticleBackground';
import SpotlightCursor from './components/SpotlightCursor';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import InteractiveTerminal from './components/InteractiveTerminal';
import { soundEffects } from './utils/soundEffects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = soundEffects.toggle();
    setSoundEnabled(newState);
  };

  const handleOpenTerminal = () => {
    setTerminalModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#08090D] text-slate-100 overflow-x-hidden">
      {/* Interactive Starry/Particle Background */}
      <ParticleBackground />

      {/* Dynamic Cursor Spotlight Effect */}
      <SpotlightCursor />

      {/* Sticky Glass Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <Hero onOpenTerminal={handleOpenTerminal} />

        {/* Bento Grid Showcase */}
        <BentoGrid />

        {/* Featured Projects Section */}
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* Work Experience & Timeline */}
        <ExperienceTimeline />

        {/* Contact & Socials Hub */}
        <ContactSection />
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Standalone Terminal CLI Modal */}
      {terminalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl">
            <InteractiveTerminal
              isEmbedded={false}
              onClose={() => setTerminalModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Quick Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={handleOpenTerminal}
        onToggleSound={toggleSound}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
