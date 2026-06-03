import { useEffect, useRef, useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    num: "01",
    title: "Python File Content Analyzer",
    desc:
      "A Python application that reads, parses, and extracts meaningful insights from structured academic data files — automating analysis for efficiency and accuracy.",
    tech: ["Python", "File Handling", "Data Processing"],
    link: "https://github.com/Aryaabhadane21/Python-project",
  },
  {
    num: "02",
    title: "Aerospace Company Website",
    desc:
      "A multi-page static website for an aerospace company, featuring structured sections, responsive layouts, and clean visual hierarchy for a professional experience.",
    tech: ["HTML5", "CSS3", "Responsive Design"],
    link: "https://github.com/Aryaabhadane21/DAMS-Aerospace-Website",
  },
  {
    num: "03",
    title: "ATM Simulator",
    desc:
      "An interactive browser-based ATM with deposit & withdrawal functionality, real-time balance updates, and robust input validation using DOM manipulation.",
    tech: ["JavaScript", "DOM API", "Input Validation"],
    link: "https://github.com/Aryaabhadane21/ATM-simulator",
  },
];

const SKILLS = [
  {
    icon: "💻",
    title: "Languages",
    tags: ["Python", "C", "JavaScript"],
  },
  {
    icon: "🌐",
    title: "Web Technologies",
    tags: ["HTML5", "CSS3", "DOM Manipulation", "Responsive Design"],
  },
  {
    icon: "🛠️",
    title: "Tools & Platforms",
    tags: ["Git", "GitHub", "VS Code"],
  },
  {
    icon: "🧠",
    title: "Core Concepts",
    tags: ["File Handling", "Data Processing", "Input Validation"],
  },
];

const CUBE_FACES = ["Python", "JS", "HTML", "CSS", "Git", "C"];
const STATS = [
  { num: "3+", label: "Projects Built" },
  { num: "5+", label: "Technologies" },
  { num: "2025", label: "Started Coding" },
  { num: "∞", label: "Curiosity" },
];

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.5 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? "124,111,253" : "6,214,160";
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 140; i++) particles.push(new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(124,111,253,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trail = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 6}px`;
        dotRef.current.style.top  = `${e.clientY - 6}px`;
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf;
    const animTrail = () => {
      trail.current.x += (mouse.current.x - trail.current.x) * 0.18;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${trail.current.x - 16}px`;
        ringRef.current.style.top  = `${trail.current.y - 16}px`;
      }
      raf = requestAnimationFrame(animTrail);
    };
    animTrail();

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 nav-blur border-b transition-all duration-300 ${scrolled ? "border-accent/20" : "border-transparent"}`}>
      <span className="font-syne font-extrabold text-xl gradient-text-accent tracking-tight">AB</span>
      <div className="hidden md:flex gap-8">
        {["About", "Skills", "Projects", "Contact"].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`}
            className="text-muted hover:text-accent text-xs tracking-widest uppercase font-medium transition-colors duration-200">
            {s}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
      {/* Eyebrow */}
      <div className="animate-fade-up-1 flex items-center gap-3 text-accent2 text-xs tracking-[0.2em] uppercase font-semibold mb-6">
        <span className="w-8 h-px bg-accent2/50" />
        Available for Internships
        <span className="w-8 h-px bg-accent2/50" />
      </div>

      {/* Name */}
      <h1 className="animate-fade-up-2 font-syne font-extrabold gradient-text leading-[0.9] mb-4"
        style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}>
        Aryaa<br />Bhadane
      </h1>

      {/* Subtitle */}
      <p className="animate-fade-up-3 text-muted font-light mb-10"
        style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)" }}>
        B.Tech CSE Student ·{" "}
        <span className="text-accent font-semibold">Developer</span> · Problem Solver
      </p>

      {/* CTA */}
      <div className="animate-fade-up-4 flex gap-4 flex-wrap justify-center">
        <a href="#projects"
          className="btn-glow px-8 py-3 rounded-full text-sm font-semibold text-white
            bg-gradient-to-br from-accent to-indigo-700 border-none">
          View Projects
        </a>
        <a href="#contact"
          className="px-8 py-3 rounded-full text-sm font-semibold text-white/80
            border border-white/20 hover:border-accent2 hover:text-accent2 transition-all duration-250">
          Get in Touch
        </a>
      </div>

      {/* 3D Cube */}
      <div className="animate-float mt-16">
        <div className="scene mx-auto">
          <div className="cube">
            {CUBE_FACES.map((face, i) => (
              <div key={face} className={`cube__face cube__face--${["front","back","left","right","top","bottom"][i]}`}>
                {face}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-muted">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="relative z-10 px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="reveal">
          <p className="text-accent2 text-xs tracking-[0.2em] uppercase font-semibold mb-3">About Me</p>
          <h2 className="font-syne font-extrabold mb-6 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            First-Year CSE Student<br />
            with a{" "}
            <span className="text-accent">Builder's</span> Mindset
          </h2>
          <p className="text-muted leading-relaxed mb-4">
            I'm <span className="text-white font-medium">Aryaa Bhadane</span>, a Computer Science Engineering student at{" "}
            <span className="text-white font-medium">ITM Skills University, Navi Mumbai</span> — passionate about turning ideas into real, working software.
          </p>
          <p className="text-muted leading-relaxed mb-8">
            From building a Python file analyzer to crafting aerospace websites and JavaScript ATM simulators, I love projects that solve real problems. Currently seeking internship opportunities to grow in the industry.
          </p>
          <a href="mailto:bhadanearyaa08@gmail.com"
            className="inline-block px-7 py-3 rounded-full text-sm font-semibold text-white
              bg-gradient-to-br from-accent to-indigo-700 btn-glow">
            Say Hello 👋
          </a>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 gap-4">
          {STATS.map(s => (
            <div key={s.label}
              className="stat-card bg-surface rounded-2xl p-6 text-center border border-accent/10">
              <div className="font-syne font-extrabold text-4xl gradient-text-accent">{s.num}</div>
              <div className="text-muted text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="skills" className="relative z-10 px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <p className="reveal text-accent2 text-xs tracking-[0.2em] uppercase font-semibold mb-3">Tech Stack</p>
        <h2 className="reveal font-syne font-extrabold mb-12" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          What I Work With
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {SKILLS.map((group, i) => (
            <div key={group.title}
              className={`reveal skill-group relative bg-surface border border-white/[0.06] rounded-2xl p-7`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl mb-4">{group.icon}</div>
              <h3 className="font-syne font-bold mb-4 text-sm tracking-wide">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map(tag => (
                  <span key={tag}
                    className="skill-tag px-3 py-1 rounded-full text-xs font-medium text-accent
                      bg-accent/10 border border-accent/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" className="relative z-10 px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <p className="reveal text-accent2 text-xs tracking-[0.2em] uppercase font-semibold mb-3">Portfolio</p>
        <h2 className="reveal font-syne font-extrabold mb-12" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Things I've Built
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <div key={p.num}
              className={`reveal project-card bg-surface border border-white/[0.06] rounded-2xl p-7 flex flex-col`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="font-syne font-extrabold text-5xl text-accent/[0.12] leading-none mb-4">
                {p.num}
              </div>
              <h3 className="font-syne font-bold text-lg mb-3">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tech.map(t => (
                  <span key={t}
                    className="px-2 py-1 rounded-md text-xs font-semibold text-accent2
                      bg-accent2/10 border border-accent2/20">
                    {t}
                  </span>
                ))}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all duration-200">
                View on GitHub
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="relative z-10 px-6 py-24 text-center">
      <div className="max-w-xl mx-auto reveal">
        <p className="text-accent2 text-xs tracking-[0.2em] uppercase font-semibold mb-3">Let's Connect</p>
        <h2 className="font-syne font-extrabold mb-6 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Open to Internship<br />Opportunities
        </h2>
        <div className="w-10 h-0.5 mx-auto mb-8 bg-gradient-to-r from-accent to-accent2 rounded-full" />
        <p className="text-muted mb-8 leading-relaxed">
          I'm actively looking for internships where I can apply my Python and web development skills. Let's build something great together.
        </p>
        <a href="mailto:bhadanearyaa08@gmail.com"
          className="font-syne font-bold text-accent2 border-b-2 border-accent2/30 hover:border-accent2 transition-colors duration-200 pb-1"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>
          bhadanearyaa08@gmail.com
        </a>

        <div className="flex gap-3 justify-center mt-8 flex-wrap">
          {[
            {
              label: "LinkedIn",
              href: "https://linkedin.com/in/aryaa-bhadane-96998a383",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              ),
            },
            {
              label: "GitHub",
              href: "https://github.com/Aryaabhadane21",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              ),
            },
            {
              label: "+91 98190 85441",
              href: "tel:+919819085441",
              icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 5.67 5.67l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
                </svg>
              ),
            },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="social-btn flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                text-white/80 border border-white/15">
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative z-10 text-center py-8 text-muted text-xs border-t border-white/[0.05]">
      Designed & Built with ❤️ · Aryaa Bhadane
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-bg text-white font-outfit">
      <Cursor />
      <ParticleCanvas />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
