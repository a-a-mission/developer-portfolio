# 🚀 Interactive Developer Portfolio (2026 Edition)

A high-performance, dark-mode developer portfolio featuring an interactive Bento Grid, live browser CLI terminal, Web Audio API sound synthesis, dynamic cursor spotlight, particle canvas, interactive UI shader lab, and command palette (`Ctrl+K`).

---

## 🌟 Key Features

1. **Sleek Obsidian & Cyberpunk Dark Aesthetic**:
   - Dynamic radial gradient spotlight following cursor movement (`SpotlightCursor.jsx`).
   - Interactive HTML5 canvas particle network (`ParticleBackground.jsx`).
   - Glassmorphism design system built with Tailwind CSS.

2. **Interactive Bento Grid Core**:
   - **Live Terminal CLI (`InteractiveTerminal.jsx`)**: Real in-browser terminal with interactive commands (`help`, `skills`, `projects`, `about`, `quote`, `contact`, `time`, `clear`).
   - **Interactive UI Lab (`InteractiveLab.jsx`)**: Real-time glow shader & glassmorphism generator with live CSS code export.
   - **Tech Stack Matrix**: Filterable grid with interactive tabs (`All`, `Frontend`, `Backend`, `DevOps`) and instant search.
   - **Live Timezone Clock**: Real-time ticking clock showing local time (Dhaka GMT+6) with availability status badge.
   - **Dev Soundtrack Widget**: Ambient focus equalizer with animated frequency bars.

3. **Command Palette (`Ctrl+K` / `⌘K`)**:
   - Instant search and keyboard navigation across all sections, trigger celebratory confetti blasts, and toggle sound effects.

4. **In-Browser Audio Feedback**:
   - Synthesizer generated via native **Web Audio API** (zero external sound files needed). Includes toggle mute/unmute button with state persistence.

5. **Featured Project Showcases & Architecture Modals**:
   - Detailed project case studies with key metrics, tech stack tags, live preview modals, and direct GitHub links.

6. **Interactive Contact Form & One-Click Copy**:
   - Copy-to-clipboard email with confetti animations and direct message transmission simulation.

---

## 🛠️ Tech Stack

- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons & Custom SVGs
- **Interactive Effects**: Web Audio API, HTML5 Canvas, Canvas Confetti

---

## 📂 How to Customize Your Info

All personal content is centralized in a single file:
👉 **[`src/data/portfolioData.js`](file:///C:/Users/ASUS/.gemini/antigravity/scratch/developer-portfolio/src/data/portfolioData.js)**

You can easily edit:
- **`personal`**: Name, avatar picture, title, bio tagline, email, location, timezone, social links.
- **`skills`**: Frontend, Backend, and DevOps technologies with proficiency levels.
- **`projects`**: Title, descriptions, live demo links, GitHub repos, tags, architecture highlights.
- **`experience`**: Companies, roles, employment dates, and bulleted achievements.

---

## 💻 Available Scripts

Run inside `C:\Users\ASUS\.gemini\antigravity\scratch\developer-portfolio`:

```bash
# Start local development server
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Vercel / Netlify / GitHub Pages

This app is fully static and zero-backend ready:
1. Push this project to your GitHub repository.
2. Connect your repo to **Vercel** or **Netlify** — it will auto-detect Vite and deploy in seconds!
