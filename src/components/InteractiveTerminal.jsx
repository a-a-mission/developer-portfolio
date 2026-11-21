import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Play, CornerDownLeft } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';

export default function InteractiveTerminal({ isEmbedded = true, onClose }) {
  const [history, setHistory] = useState([
    { text: "Developer OS v2.6.4 (x86_64-antigravity)", type: "system" },
    { text: "Type 'help' to see all available commands or explore skills.", type: "dim" },
  ]);
  const [input, setInput] = useState("");
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const hasUserInteracted = useRef(false);

  useEffect(() => {
    if (hasUserInteracted.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      hasUserInteracted.current = true;
      const trimmed = input.trim();
      soundEffects.play('terminal');

      if (!trimmed) return;

      const newHistory = [...history, { text: `$ ${trimmed}`, type: "command" }];
      setCommandHistory((prev) => [...prev, trimmed]);
      setCmdIndex(-1);

      const parts = trimmed.toLowerCase().split(" ");
      const cmd = parts[0];

      switch (cmd) {
        case 'help':
          newHistory.push(
            { text: "AVAILABLE COMMANDS:", type: "header" },
            { text: "  about       - Overview of who I am and what I do", type: "info" },
            { text: "  skills      - List core tech stack and proficiency", type: "info" },
            { text: "  projects    - Summary of top projects shipped", type: "info" },
            { text: "  contact     - Ways to reach out & collaborate", type: "info" },
            { text: "  quote       - Display an inspiring engineering quote", type: "info" },
            { text: "  time        - Check current local time (GMT+6)", type: "info" },
            { text: "  clear       - Clear this terminal screen", type: "info" },
            { text: "  sudo        - Request elevated superpowers", type: "info" }
          );
          break;

        case 'about':
          newHistory.push(
            { text: `NAME: ${portfolioData.personal.name}`, type: "info" },
            { text: `ROLE: ${portfolioData.personal.title}`, type: "info" },
            { text: `LOCATION: ${portfolioData.personal.location} [${portfolioData.personal.timezone}]`, type: "info" },
            { text: `STATUS: ${portfolioData.personal.status.state}`, type: "accent" },
            { text: portfolioData.personal.tagline, type: "dim" }
          );
          break;

        case 'skills':
          newHistory.push(
            { text: "⚡ FRONTEND: React, Next.js, TypeScript, Tailwind CSS, Vue, Three.js", type: "accent" },
            { text: "🚀 BACKEND: Node.js, Express, NestJS, Python, FastAPI, GraphQL, REST", type: "accent" },
            { text: "🗄️ STORAGE: PostgreSQL, Prisma, MongoDB, Redis, TimescaleDB", type: "info" },
            { text: "🛠️ DEVOPS: Docker, Cloudflare Workers, AWS, GitHub Actions, Linux", type: "info" }
          );
          break;

        case 'projects':
          portfolioData.projects.forEach((p) => {
            newHistory.push({
              text: `• [${p.badge}] ${p.title} - ${p.tags.slice(0, 3).join(", ")}`,
              type: "accent"
            });
          });
          newHistory.push({ text: "Use GUI below to interact with live demos!", type: "dim" });
          break;

        case 'contact':
          newHistory.push(
            { text: `✉️ Email:    ${portfolioData.personal.email}`, type: "accent" },
            { text: `📞 Phone:    ${portfolioData.personal.phone}`, type: "accent" },
            { text: `💬 WhatsApp: ${portfolioData.personal.rawPhone} (${portfolioData.personal.whatsapp})`, type: "accent" },
            { text: `🐙 GitHub:   ${portfolioData.personal.github}`, type: "info" },
            { text: `💼 LinkedIn: ${portfolioData.personal.linkedin}`, type: "info" }
          );
          break;

        case 'quote':
          const quotes = portfolioData.terminalQuotes;
          const randomQ = quotes[Math.floor(Math.random() * quotes.length)];
          newHistory.push({ text: randomQ, type: "accent" });
          break;

        case 'time':
          newHistory.push({
            text: `Local time in Dhaka: ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka' })} (GMT+6)`,
            type: "info"
          });
          break;

        case 'clear':
          setHistory([]);
          setInput("");
          return;

        case 'sudo':
          newHistory.push({ text: "Permission denied: You already have read & write access to explore!", type: "error" });
          break;

        default:
          newHistory.push({
            text: `Command not recognized: '${trimmed}'. Type 'help' for available commands.`,
            type: "error"
          });
          break;
      }

      setHistory(newHistory);
      setInput("");
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = cmdIndex === -1 ? commandHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIndex);
      setInput(commandHistory[nextIndex] || "");
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIndex = cmdIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setCmdIndex(-1);
        setInput("");
      } else {
        setCmdIndex(nextIndex);
        setInput(commandHistory[nextIndex] || "");
      }
    }
  };

  return (
    <div className={`flex flex-col bg-dark-900 border border-white/10 rounded-2xl overflow-hidden font-mono text-xs shadow-2xl ${
      isEmbedded ? 'h-full min-h-[360px]' : 'h-[500px] w-full max-w-2xl'
    }`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-950/80 border-b border-white/10 select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40"></div>
          <span className="ml-2 text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            guest@portfolio: ~/terminal
          </span>
        </div>
        {!isEmbedded && onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Terminal Output Area */}
      <div
        className="flex-1 p-4 overflow-y-auto space-y-1.5 text-slate-300"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => {
          let styleClass = "text-slate-300";
          if (item.type === "command") styleClass = "text-white font-semibold";
          else if (item.type === "accent") styleClass = "text-cyan-300";
          else if (item.type === "header") styleClass = "text-indigo-400 font-bold mt-2";
          else if (item.type === "info") styleClass = "text-slate-400";
          else if (item.type === "dim") styleClass = "text-slate-500 italic";
          else if (item.type === "error") styleClass = "text-rose-400";
          else if (item.type === "system") styleClass = "text-emerald-400";

          return (
            <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${styleClass}`}>
              {item.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Command Input */}
      <div className="flex items-center gap-2 px-4 py-3 bg-dark-950/60 border-t border-white/10">
        <span className="text-emerald-400 font-semibold select-none">guest@sys:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="type 'help' or any command..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono text-xs"
          autoFocus={!isEmbedded}
        />
        <CornerDownLeft className="w-3.5 h-3.5 text-slate-500" />
      </div>
    </div>
  );
}
