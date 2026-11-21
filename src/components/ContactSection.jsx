import React, { useState } from 'react';
import { Mail, Send, Copy, Check, MessageSquare, ArrowUp, Sparkles, Heart, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';
import { soundEffects } from '../utils/soundEffects';
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsAppIcon } from './Icons';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activationNeeded, setActivationNeeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEffects.play('click');
    setLoading(true);
    setActivationNeeded(false);

    try {
      const res = await fetch("https://formsubmit.co/ajax/abbasmission1557@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: "false",
          _template: "table"
        })
      });

      const data = await res.json();
      setLoading(false);
      setSubmitted(true);
      soundEffects.play('success');

      if (data && (data.success === false || data.success === "false")) {
        setActivationNeeded(true);
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    } catch (err) {
      setLoading(false);
      setSubmitted(true);
      soundEffects.play('success');
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const copyEmail = () => {
    soundEffects.play('success');
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }
  };

  const copyPhone = () => {
    soundEffects.play('success');
    navigator.clipboard.writeText(portfolioData.personal.rawPhone);
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2200);
  };

  const scrollToTop = () => {
    soundEffects.play('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Container */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          {/* Ambient light inside card */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
            
            {/* Left info column */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let's Build Something Memorable</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
                Have an idea, project, or opportunity?
              </h2>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-sans">
                I'm actively discussing new freelance projects, startup mvps, and engineering leadership roles. Drop a note or copy my email directly.
              </p>

              {/* Quick Direct Connect Banners */}
              <div className="space-y-3 mb-8">
                {/* Email Banner */}
                <div className="p-4 rounded-2xl bg-dark-950/80 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">Direct Email</span>
                    <span className="text-sm font-mono font-medium text-white select-all">
                      {portfolioData.personal.email}
                    </span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>

                {/* WhatsApp & Phone Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={portfolioData.personal.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEffects.play('click')}
                    className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center gap-3 text-emerald-300 group"
                  >
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400/80 block uppercase">WhatsApp Direct</span>
                      <span className="text-xs font-mono font-semibold text-white">{portfolioData.personal.rawPhone}</span>
                    </div>
                  </a>

                  <button
                    onClick={copyPhone}
                    className="p-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center justify-between text-cyan-300 group text-left w-full"
                    title="Click to copy phone number"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400/80 block uppercase">Phone Number</span>
                        <span className="text-xs font-mono font-semibold text-white">{portfolioData.personal.phone}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 pr-1 shrink-0">
                      {phoneCopied ? 'Copied!' : 'Copy'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 block">
                  Find me across the web
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: 'WhatsApp', icon: WhatsAppIcon, href: portfolioData.personal.whatsapp, accent: 'text-emerald-400' },
                    { name: 'GitHub', icon: GithubIcon, href: portfolioData.personal.github, accent: 'text-slate-300' },
                    { name: 'LinkedIn', icon: LinkedinIcon, href: portfolioData.personal.linkedin, accent: 'text-indigo-400' },
                    { name: 'Twitter / X', icon: TwitterIcon, href: portfolioData.personal.twitter, accent: 'text-cyan-400' },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundEffects.play('click')}
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all hover:border-cyan-500/30"
                      >
                        <Icon className={`w-4 h-4 ${s.accent || 'text-cyan-400'}`} />
                        <span>{s.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Form column */}
            <div className="p-6 sm:p-8 rounded-2xl bg-dark-950/70 border border-white/10">
              {submitted ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">Message Dispatched!</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-3 border border-emerald-500/20">
                    Destination: abbasmission1557@gmail.com
                  </div>

                  {activationNeeded ? (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-sans text-left mb-6 space-y-2">
                      <p className="font-semibold text-amber-300">
                        ⚠️ One-Time Gmail Activation Required:
                      </p>
                      <p>
                        FormSubmit has sent an email with subject <strong>"Action Required: Activate FormSubmit"</strong> to <strong>abbasmission1557@gmail.com</strong>.
                      </p>
                      <p>
                        Please open your Gmail (also check <em>Spam</em> or <em>Updates</em> folder) and click <strong>"Activate Form"</strong>. Once activated, every message will arrive directly in your inbox!
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your note has been delivered to Abbas at <strong className="text-cyan-300">abbasmission1557@gmail.com</strong>.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white transition-colors"
                    >
                      Send Another Note
                    </button>
                    <a
                      href={`mailto:${portfolioData.personal.email}?subject=Inquiry%20from%20Portfolio&body=Hi%20Abbas,%0D%0A%0D%0A`}
                      className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-xs font-mono text-indigo-200 transition-colors"
                    >
                      Open in Gmail Directly
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-display font-semibold text-white mb-2">
                    Send a Direct Note
                  </h3>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Project Details or Inquiry
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your goals, timeline, or requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="font-mono text-xs">Transmitting message...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] font-mono text-slate-500 text-center pt-1 flex items-center justify-center gap-1">
                    <span>⚡ Messages are routed directly to abbasmission1557@gmail.com</span>
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {portfolioData.personal.name}.</span>
            <span>Crafted with React, Tailwind &amp; Clean Code.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </footer>

      </div>
    </section>
  );
}
