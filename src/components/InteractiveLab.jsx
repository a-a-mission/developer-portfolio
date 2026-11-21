import React, { useState } from 'react';
import { Sliders, Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export default function InteractiveLab() {
  const [blur, setBlur] = useState(24);
  const [glowColor, setGlowColor] = useState('indigo');
  const [spread, setSpread] = useState(12);
  const [copied, setCopied] = useState(false);

  const colors = [
    { id: 'indigo', name: 'Indigo', bg: 'bg-indigo-500', hex: '#6366f1', rgb: '99, 102, 241' },
    { id: 'cyan', name: 'Cyan', bg: 'bg-cyan-500', hex: '#06b6d4', rgb: '6, 182, 212' },
    { id: 'emerald', name: 'Emerald', bg: 'bg-emerald-500', hex: '#10b981', rgb: '16, 185, 129' },
    { id: 'rose', name: 'Rose', bg: 'bg-rose-500', hex: '#f43f5e', rgb: '244, 63, 94' },
    { id: 'amber', name: 'Amber', bg: 'bg-amber-500', hex: '#f59e0b', rgb: '245, 158, 11' },
  ];

  const activeColorObj = colors.find((c) => c.id === glowColor) || colors[0];

  const generatedCss = `box-shadow: 0 0 ${blur}px ${spread}px rgba(${activeColorObj.rgb}, 0.45);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.15);`;

  const copyCss = () => {
    soundEffects.play('success');
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-display font-semibold text-white">Interactive UI Lab</h4>
              <p className="text-[11px] text-slate-400 font-mono">Live dynamic shader & glow sandbox</p>
            </div>
          </div>
          <button
            onClick={copyCss}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all"
            title="Copy Generated CSS"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'CSS'}</span>
          </button>
        </div>

        {/* Live Preview Area */}
        <div className="h-32 rounded-xl bg-dark-950/70 border border-white/10 flex items-center justify-center relative overflow-hidden mb-4 p-4">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
          
          <button
            onClick={() => soundEffects.play('click')}
            style={{
              boxShadow: `0 0 ${blur}px ${spread}px rgba(${activeColorObj.rgb}, 0.45)`,
              borderColor: `rgba(${activeColorObj.rgb}, 0.6)`
            }}
            className="relative px-5 py-2.5 rounded-xl bg-dark-900/90 text-white font-medium text-xs border backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: activeColorObj.hex }} />
            <span>Interactive Object</span>
          </button>
        </div>

        {/* Sliders & Color Picker */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>Glow Radius:</span>
              <span className="text-cyan-400">{blur}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="60"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>Spread Intensity:</span>
              <span className="text-cyan-400">{spread}px</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-dark-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Palette selector */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-400 mr-1">Hue:</span>
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  soundEffects.play('hover');
                  setGlowColor(c.id);
                }}
                className={`w-5 h-5 rounded-full ${c.bg} transition-all ${
                  glowColor === c.id ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'
                }`}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Web Component Shader</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Ready to export
        </span>
      </div>
    </div>
  );
}
