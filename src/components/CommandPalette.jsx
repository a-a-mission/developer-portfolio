import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Terminal,
  Sparkles,
  LayoutGrid,
  FolderGit2,
  Calendar,
  Mail,
  Volume2,
  Copy,
  PartyPopper,
  FileDown,
  X,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/soundEffects';
import { portfolioData } from '../data/portfolioData';

export default function CommandPalette({ isOpen, onClose, onOpenTerminal, onToggleSound, soundEnabled }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown handler for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else soundEffects.play('click');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      id: 'projects',
      title: 'Navigate to Projects',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'bento',
      title: 'Explore Bento Grid & Tech Matrix',
      category: 'Navigation',
      icon: LayoutGrid,
      action: () => {
        window.location.hash = '#bento';
        onClose();
      }
    },
    {
      id: 'timeline',
      title: 'View Career Experience Timeline',
      category: 'Navigation',
      icon: Calendar,
      action: () => {
        window.location.hash = '#timeline';
        onClose();
      }
    },
    {
      id: 'contact',
      title: 'Jump to Contact Hub',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        window.location.hash = '#contact';
        onClose();
      }
    },
    {
      id: 'terminal',
      title: 'Launch Interactive CLI Terminal',
      category: 'Actions',
      icon: Terminal,
      action: () => {
        onClose();
        onOpenTerminal();
      }
    },
    {
      id: 'confetti',
      title: 'Trigger Celebratory Confetti Blast',
      category: 'Fun & Easter Eggs',
      icon: PartyPopper,
      action: () => {
        soundEffects.play('success');
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        onClose();
      }
    },
    {
      id: 'sound',
      title: `Toggle Audio Effects (Currently: ${soundEnabled ? 'Enabled' : 'Muted'})`,
      category: 'Preferences',
      icon: Volume2,
      action: () => {
        onToggleSound();
        onClose();
      }
    },
    {
      id: 'copy-email',
      title: `Copy Email: ${portfolioData.personal.email}`,
      category: 'Contact',
      icon: Copy,
      action: () => {
        soundEffects.play('success');
        navigator.clipboard.writeText(portfolioData.personal.email);
        onClose();
      }
    },
    {
      id: 'whatsapp',
      title: `Chat on WhatsApp: ${portfolioData.personal.rawPhone}`,
      category: 'Contact',
      icon: Mail,
      action: () => {
        window.open(portfolioData.personal.whatsapp, '_blank');
        onClose();
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (a-a-mission)',
      category: 'Social',
      icon: FolderGit2,
      action: () => {
        window.open(portfolioData.personal.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile (mission1556)',
      category: 'Social',
      icon: ArrowRight,
      action: () => {
        window.open(portfolioData.personal.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item) => {
    soundEffects.play('click');
    item.action();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-dark-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-dark-950/70">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500 font-sans"
          />
          <kbd className="px-2 py-0.5 rounded bg-dark-800 border border-white/10 text-[10px] font-mono text-slate-400">
            Esc
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isSelected ? 'bg-indigo-600/20 border border-indigo-500/40 text-white' : 'text-slate-300 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-medium block">{item.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400 opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })
          )}
        </div>

        {/* Bottom hint bar */}
        <div className="px-4 py-2.5 bg-dark-950/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Command Palette Engine</span>
        </div>

      </div>
    </div>
  );
}
