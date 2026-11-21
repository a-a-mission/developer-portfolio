export const portfolioData = {
  personal: {
    name: "Abbas Ahammod Mission",
    title: "Full-Stack Web Developer",
    tagline: "Architecting interactive digital products, performant web apps & modern digital experiences.",
    avatar: "/profile.jpg",
    status: {
      state: "Available for Projects",
      badgeColor: "emerald", // 'emerald', 'cyan', 'amber'
      notice: "Accepting Q1/Q2 freelance contracts & full-time engineering roles"
    },
    location: "Bangladesh",
    timezone: "GMT+6 (Asia/Dhaka)",
    email: "abbasmission1557@gmail.com",
    phone: "+880 1766-811996",
    rawPhone: "01766811996",
    whatsapp: "https://wa.me/8801766811996",
    github: "https://github.com/a-a-mission",
    linkedin: "https://www.linkedin.com/in/mission1556/",
    twitter: "https://x.com/Mission1557",
    discord: "mission#1557",
    resumeUrl: "#resume-download",
    yearsExperience: 4,
    completedProjects: 28,
    coffeeCups: 1420,
    clientSatisfaction: "99.4%"
  },

  skills: {
    frontend: [
      { name: "React / Next.js", level: 95, icon: "Atom", tag: "Core" },
      { name: "TypeScript", level: 90, icon: "FileCode", tag: "Language" },
      { name: "Tailwind CSS", level: 96, icon: "Palette", tag: "Styling" },
      { name: "Vue.js", level: 82, icon: "Layers", tag: "Framework" },
      { name: "Redux / Zustand", level: 88, icon: "Database", tag: "State" },
      { name: "Framer Motion", level: 85, icon: "Sparkles", tag: "Animation" },
      { name: "Three.js / WebGL", level: 74, icon: "Box", tag: "3D Graphics" },
    ],
    backend: [
      { name: "Node.js / Express", level: 92, icon: "Server", tag: "Runtime" },
      { name: "NestJS", level: 84, icon: "Cpu", tag: "Architecture" },
      { name: "Python / FastAPI", level: 80, icon: "Code", tag: "Backend & AI" },
      { name: "GraphQL & REST APIs", level: 90, icon: "Network", tag: "API Design" },
      { name: "PostgreSQL & Prisma", level: 88, icon: "Database", tag: "SQL" },
      { name: "MongoDB & Redis", level: 85, icon: "HardDrive", tag: "NoSQL / Cache" },
    ],
    devops: [
      { name: "Docker & Containers", level: 85, icon: "Container", tag: "DevOps" },
      { name: "AWS & Cloudflare", level: 80, icon: "Cloud", tag: "Cloud" },
      { name: "CI/CD Pipelines", level: 84, icon: "GitBranch", tag: "Automation" },
      { name: "Linux & Shell Scripting", level: 88, icon: "Terminal", tag: "System" },
      { name: "Git & GitHub Actions", level: 95, icon: "GitCommit", tag: "VCS" },
    ]
  },

  projects: [
    {
      id: "orbit-ai",
      title: "Orbit Engine - AI Workflow Canvas",
      shortDescription: "A node-based visual workflow builder for automating LLM chains and multithreaded AI agent pipelines.",
      fullDescription: "Built an infinite interactive canvas with React Flow and WebAssembly. Provides real-time execution feedback, API integration nodes, and sub-second pipeline runs with streaming responses.",
      category: "Full Stack & AI",
      tags: ["React", "TypeScript", "Node.js", "WebSockets", "TailwindCSS", "OpenAI"],
      liveUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example/orbit-engine",
      featured: true,
      metrics: "12k+ Active Workflows • 99.8% Uptime",
      badge: "Featured SaaS",
      highlights: [
        "Infinite node canvas supporting 500+ simultaneous connected nodes without lag",
        "Zero-latency streaming protocol via binary WebSockets",
        "Custom drag-and-drop reactive state graph"
      ]
    },
    {
      id: "hyper-commerce",
      title: "HyperStore - Headless E-Commerce Suite",
      shortDescription: "Ultra-fast Next.js headless storefront with sub-second page transitions, dynamic cart, and localized multi-currency checkout.",
      fullDescription: "Architected a headless store powered by Shopify Storefront API and Stripe with edge rendering. Achieved 99/100 Google Lighthouse score and instant cart updates.",
      category: "Full Stack",
      tags: ["Next.js", "Tailwind CSS", "Stripe API", "Zustand", "Redis Cache"],
      liveUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example/hyperstore",
      featured: true,
      metrics: "0.4s Time to Interactive • 99/100 Lighthouse",
      badge: "High Performance",
      highlights: [
        "Distributed edge caching via Cloudflare Workers",
        "Optimistic UI updates for zero-friction cart & checkout actions",
        "Automated inventory webhook syncing"
      ]
    },
    {
      id: "dev-pulse",
      title: "DevPulse - Cloud Telemetry & Metrics HUD",
      shortDescription: "Real-time microservices monitoring dashboard with interactive time-series charts, alert routing, and dark mode telemetry.",
      fullDescription: "A developer-first observability suite that aggregates logs, distributed traces, and container resource spikes with custom threshold alerts.",
      category: "Web App",
      tags: ["React", "Go / Fiber", "TimescaleDB", "Tailwind CSS", "Canvas Charts"],
      liveUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example/devpulse",
      featured: true,
      metrics: "Handles 1.2M events/sec • Real-time Websockets",
      badge: "Developer Tool",
      highlights: [
        "Custom WebGL chart renderer plotting 100k+ data points at 60 FPS",
        "Instant alert dispatch via Telegram, Discord, and Slack webhooks",
        "Configurable multi-pane drag-and-drop dashboard"
      ]
    },
    {
      id: "synth-wave-studio",
      title: "SynthLab - In-Browser Audio Synthesizer",
      shortDescription: "Polyphonic subtractive synthesizer and step-sequencer powered entirely by Web Audio API and Web Workers.",
      fullDescription: "An interactive creative instrument allowing music producers to craft patches, modulate LFOs, and export WAV audio straight from the browser.",
      category: "Creative Tech",
      tags: ["JavaScript", "Web Audio API", "Web Workers", "Tailwind CSS", "SVG"],
      liveUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example/synthlab",
      featured: false,
      metrics: "Zero dependencies audio engine • 16-step sequencer",
      badge: "Experimental",
      highlights: [
        "Custom oscillator bank with FM and AM modulation",
        "Real-time visual oscilloscope and spectrum analyzer",
        "MIDI keyboard device support via Web MIDI API"
      ]
    }
  ],

  experience: [
    {
      role: "Senior Full-Stack Engineer",
      company: "Nexus Cloud Systems",
      period: "2024 - Present",
      location: "Remote",
      description: "Spearheaded frontend architecture modernization for enterprise SaaS platform. Reduced bundle size by 45% and improved Core Web Vitals across all product surfaces.",
      skills: ["React", "Next.js", "TypeScript", "Node.js", "Cloudflare"]
    },
    {
      role: "Frontend Software Engineer",
      company: "Apex Digital Labs",
      period: "2022 - 2024",
      location: "Hybrid",
      description: "Crafted responsive web portals, custom design systems, and client-facing dashboards for international fintech and e-commerce clients.",
      skills: ["React", "Tailwind CSS", "Redux Toolkit", "REST / GraphQL", "Jest"]
    },
    {
      role: "Junior Web Developer",
      company: "Craft interactive",
      period: "2021 - 2022",
      location: "On-site",
      description: "Developed interactive landing pages, responsive client websites, and integrated third-party payment gateways and headless CMS platforms.",
      skills: ["JavaScript", "HTML5/CSS3", "PHP", "Bootstrap", "Git"]
    }
  ],

  terminalQuotes: [
    "“Talk is cheap. Show me the code.” — Linus Torvalds",
    "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
    "“First, solve the problem. Then, write the code.” — John Johnson",
    "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” — Martin Fowler"
  ]
};
