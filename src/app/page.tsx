"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const headlineFirst = "Building practical";
const headlineSecond = "web apps for real needs";

const projects = [
  {
    number: "01",
    name: "Dev Stack",
    category: "React web application",
    image: "/card1.webp",
    description: "An interactive technology stack manager for exploring tools and assembling a personal development stack. It supports adding and removing technologies, duplicate prevention, clearing the stack, and responsive toast and loading states.",
    stack: ["React", "Vite", "Tailwind CSS", "DaisyUI", "React Toastify"],
    challenge: "Managing selection state, preventing duplicate technologies, and keeping reusable components in sync with interactive UI updates.",
    next: "Improve the user experience, add persistent storage, and expand stack management features.",
    liveUrl: "",
    repoUrl: "",
  },
  {
    number: "02",
    name: "PHA-Fit-Log",
    category: "Next.js fitness logging app",
    image: "/card2.webp",
    description: "A fitness logging project built while learning Next.js, with a responsive interface and external API integration.",
    stack: ["Next.js", "TypeScript", "REST API"],
    challenge: "Understanding the Next.js project structure, working with API endpoints, typing response data, and connecting components to API results.",
    next: "Strengthen error handling, improve the structure and user experience, and continue expanding API integration skills.",
    liveUrl: "https://lamia96588-source.github.io/PH-A-FitLog/",
    repoUrl: "",
  },
  {
    number: "03",
    name: "Social Spark",
    category: "Full-stack community events platform",
    image: "/base.webp",
    description: "A community event platform in development to help people organize, discover, and join local initiatives such as clothing drives, cleanups, and tree planting. Planned features include authentication, event management, joining activities, and user profiles.",
    stack: ["Next.js App Router", "TypeScript", "Express.js", "MongoDB", "Better Auth", "JWT", "Tailwind CSS"],
    challenge: "Connecting a Next.js frontend to a separate Express backend, securing authenticated API access, and managing event ownership and session state.",
    next: "Complete and verify frontend-backend integration, strengthen authentication and security, and prepare a stable deployment.",
    liveUrl: "",
    repoUrl: "",
  },
];

const skillGroups = [
  { title: "Frontend", items: ["JavaScript", "TypeScript", "HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS", "DaisyUI"] },
  { title: "Backend · learning & project experience", items: ["Node.js", "Express.js", "REST APIs", "MongoDB"] },
  { title: "Tools & development", items: ["Git", "GitHub", "VS Code", "API integration", "Responsive design", "AI-assisted development"] },
];

function Mark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" />
      <circle className="mark-dot" cx="12" cy="12" r="1.7" />
    </svg>
  );
}

function Dots() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" fill="currentColor">
      {[2, 6, 10].flatMap((x) =>
        [2, 6, 10].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1" />),
      )}
    </svg>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const replay = () => {
    const hero = heroRef.current;
    if (!hero) return;
    hero.classList.remove("is-playing");
    void hero.offsetWidth;
    hero.classList.add("is-playing");
    stageRef.current?.classList.remove("done");
    hero.dispatchEvent(new CustomEvent("portfolio-replay"));
  };

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(hover: none)");
    const AXIS = (-16.6 * Math.PI) / 180;
    const AX = Math.cos(AXIS);
    const AY = Math.sin(AXIS);
    const SLAB_MS = 300;
    const SLAB = 0.5;
    const GROW_MS = 700;
    const CY = 0.5;
    const RK = 0.56;
    const EDGE_PX = 1.5;
    const DRIFT = 0.205;
    const DRIFT_MS = 25000;
    const REV_LERP = 0.1;
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const easeOut = (t: number, p: number) => 1 - (1 - t) ** p;
    const cache = new Map<string, string>();
    const setVar = (key: string, value: string) => {
      if (cache.get(key) !== value) {
        stage.style.setProperty(key, value);
        cache.set(key, value);
      }
    };

    let W = 0;
    let H = 0;
    let BR = 0;
    let D1 = 0;
    let D2 = 0;
    let V2 = 0;
    let start = 0;
    let frame = 0;
    let introDoneAt = 0;
    let pointerSeen = false;
    let target = { x: -9999, y: -9999 };
    const mouse = { x: -9999, y: -9999 };

    const measure = () => {
      W = hero.clientWidth;
      H = hero.clientHeight;
      BR = RK * H;
      D1 = SLAB * W;
      D2 = (1 - SLAB) * W + BR;
      V2 = (2.2 * D2) / GROW_MS;
      setVar("--oy", `${CY * H}px`);
      setVar("--or", `${BR}px`);
      setVar("--oi", `${Math.max(0, BR - EDGE_PX)}px`);
    };

    const travel = (t: number) => {
      if (t <= SLAB_MS) {
        const a = (2 * D1) / SLAB_MS - V2;
        const b = (V2 * SLAB_MS - D1) / SLAB_MS ** 2;
        return a * t + b * t * t;
      }
      const p = clamp((t - SLAB_MS) / GROW_MS, 0, 1);
      return D1 + D2 * easeOut(p, 2.2);
    };

    const animate = (now: number) => {
      const t = now - start;
      if (reduced.matches) {
        stage.classList.add("done");
        setVar("--tx", "0px");
        setVar("--ty", "0px");
      } else {
        const slide = (1 - easeOut(clamp(t / SLAB_MS, 0, 1), 3)) * (SLAB / AX);
        const drift = Math.sin(clamp(t / DRIFT_MS, 0, 1) * (Math.PI / 2)) * DRIFT;
        const dist = (slide - drift) * W;
        setVar("--tx", `${dist * AX}px`);
        setVar("--ty", `${dist * AY}px`);

        if (t >= SLAB_MS + GROW_MS) {
          if (!stage.classList.contains("done")) {
            stage.classList.add("done");
            introDoneAt = now;
          }
        } else {
          const brushX = W - travel(t) + BR;
          setVar("--ox", `${brushX}px`);
        }

        if (!pointerSeen && touch.matches && introDoneAt && now - introDoneAt > 600) {
          target.x = W * (0.5 + 0.3 * Math.sin(now / 1500));
          target.y = H * 0.49 + (target.x - W * 0.4362) * Math.tan(AXIS);
        }
        mouse.x += (target.x - mouse.x) * REV_LERP;
        mouse.y += (target.y - mouse.y) * REV_LERP;
        setVar("--mx", `${mouse.x}px`);
        setVar("--my", `${mouse.y}px`);
      }
      frame = window.requestAnimationFrame(animate);
    };

    const play = () => {
      measure();
      start = performance.now();
      introDoneAt = 0;
      stage.classList.remove("done");
      if (reduced.matches) {
        setVar("--tx", "0px");
        setVar("--ty", "0px");
        stage.classList.add("done");
      } else {
        setVar("--ox", `${W + BR}px`);
        setVar("--tx", `${(SLAB / AX) * W * AX}px`);
        setVar("--ty", `${(SLAB / AX) * W * AY}px`);
      }
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(animate);
    };

    const pointerMove = (event: PointerEvent) => {
      pointerSeen = true;
      target = { x: event.clientX, y: event.clientY };
      if (mouse.x < -1000) Object.assign(mouse, target);
    };
    const onResize = () => measure();
    const onReplay = () => play();
    const begin = async () => {
      const images = [...hero.querySelectorAll("img")];
      await Promise.allSettled(images.map((image) => image.decode()));
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, 900)),
      ]);
      window.requestAnimationFrame(() => {
        hero.classList.add("is-playing");
        play();
      });
    };

    measure();
    window.addEventListener("pointermove", pointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    hero.addEventListener("portfolio-replay", onReplay);
    void begin();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("portfolio-replay", onReplay);
    };
  }, []);

  useEffect(() => {
    if (selectedProject === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  return (
    <>
      <main>
        <section className="hero" id="home" ref={heroRef} aria-label="Portfolio introduction">
          <div className="grid" aria-hidden="true"><i /><i /><i /></div>
          <div className="log-stage" id="stage" ref={stageRef} aria-hidden="true">
            <div className="layer"><div className="log"><img src="/base.webp" decoding="async" alt="" /></div></div>
            <div className="layer reveal"><div className="log"><img src="/reveal.webp" decoding="async" alt="" /></div></div>
          </div>

          <nav className={`nav ${menuOpen ? "menu-open" : ""}`} aria-label="Main navigation">
          <button className="brand a" type="button" aria-label="Replay introduction" onClick={replay}>
              <Mark /><span>Lamia</span>
            </button>
            <div className="nav-links">
              <a className="link a active" href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a className="link a" href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
              <a className="link a" href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
              <a className="link a" href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
              <a className="link a" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
            <a className="join a" href="#contact">Let&apos;s talk</a>
            <button className="burger a" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /></button>
          </nav>

          <h1 className="h1" aria-label="Building practical web apps for real needs">
            <span className="headline-row serif" aria-hidden="true">{Array.from(headlineFirst).map((char, index) => <span className="ch" style={{ "--i": index } as CSSProperties} key={`${char}-${index}`}>{char}</span>)}</span>
            <span className="headline-row" aria-hidden="true">{Array.from(headlineSecond).map((char, index) => <span className="ch" style={{ "--i": index + headlineFirst.length } as CSSProperties} key={`${char}-${index}`}>{char}</span>)}</span>
          </h1>
          <div className="copy">
            <p className="lede a">Aspiring AI-driven full-stack developer, learning by building practical web applications and growing toward Python backend and AI integration.</p>
            <a className="cta a" href="#projects"><Dots /><span>Explore my work</span></a>
          </div>

          <button className="play a" type="button" id="play" aria-label="Replay introduction" onClick={replay}>
            <span className="ring" /><span className="dot"><svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3 1.5v13l11-6.5z" /></svg></span>
          </button>

          <div className="stat stat-one a"><span className="stat-ring" aria-hidden="true"><svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" /></svg></span><span><small>Areas of focus</small><b>Web experiences</b></span></div>
          <div className="stat stat-two a"><span className="stat-ring" aria-hidden="true"><svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" /></svg></span><span><small>Working style</small><b>Thoughtful &amp; curious</b></span></div>

          <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
        </section>

        <section className="content-section about-section" id="about">
          <p className="eyebrow">A little about me</p>
          <div className="section-heading"><h2>Curious by nature.<br /><em>Always learning.</em></h2><p>I started by wondering how websites and applications work. That curiosity has taken me from HTML, CSS, and JavaScript through React and Next.js, and now toward backend engineering and AI integration. I&apos;m an ambitious, hands-on learner who enjoys breaking down problems, building practical solutions, and improving with each project.</p></div>
          <div className="about-notes"><span>My learning path <b>Web foundations · React · Next.js · backend · AI</b></span><span>What I like building <b>Responsive apps, APIs, auth, and data-backed tools</b></span><span>Interests beyond projects <b>Exploring AI and emerging technology; non-tech hobbies to add</b></span></div>
        </section>

        <section className="content-section skills-section" id="skills">
          <p className="eyebrow">The toolkit</p><div className="section-heading"><h2>Skills in<br /><em>good company.</em></h2><p>My current toolkit spans modern frontend development, backend fundamentals, APIs, and the tools I use to learn and build.</p></div>
          <div className="skill-grid">{skillGroups.map((group) => <article className="skill-card" key={group.title}><span>{group.title}</span><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
        </section>

        <section className="content-section resume-section" id="experience">
          <p className="eyebrow">The path so far</p><div className="resume-grid"><div><h2>Learning and<br /><em>making progress.</em></h2></div><div className="resume-list"><article><small>Education</small><h3>Academic background</h3><p>Education details are not included yet. I&apos;ll add your HSC and post-HSC qualifications here.</p></article><article><small>Experience</small><h3>Professional experience</h3><p>Currently focused on independent learning and hands-on project work. No formal employment or freelance details were included.</p></article></div></div>
        </section>

        <section className="content-section projects-section" id="projects">
          <p className="eyebrow">Selected projects</p><div className="section-heading"><h2>Made with<br /><em>intention.</em></h2><p>From an interactive developer toolkit to a fitness logging app and a community events platform, each project helps me learn by solving practical problems.</p></div>
          <div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.number}><button type="button" className="project-image" onClick={() => setSelectedProject(index)} aria-label={`View details for ${project.name}`}><img src={project.image} alt="Project preview" decoding="async" /><span>{project.number}</span></button><div className="project-meta"><div><small>{project.category}</small><h3>{project.name}</h3></div><button className="details-button" type="button" onClick={() => setSelectedProject(index)}>View details <span aria-hidden="true">↗</span></button></div></article>)}</div>
        </section>

        <section className="content-section contact-section" id="contact"><p className="eyebrow">Get in touch</p><div className="contact-row"><h2>Have a good idea?<br /><em>Let&apos;s make it real.</em></h2><div className="contact-links"><div>Email <span>Share an email address to add it</span></div><div>Phone <span>Share a phone number to add it</span></div><a href="https://www.linkedin.com/in/lamia-akter-sunjida-b92b66346/" target="_blank" rel="noreferrer">LinkedIn <span>Connect with Lamia ↗</span></a><a href="https://github.com/lamia96588-source" target="_blank" rel="noreferrer">GitHub <span>View GitHub profile ↗</span></a></div></div></section>
      </main>
      <footer className="footer"><a className="footer-brand" href="#home"><Mark /> Lamia</a><span>Always learning · always building · <span suppressHydrationWarning>{new Date().getFullYear()}</span></span><a href="#home">Back to top ↑</a></footer>

      {selectedProject !== null && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">×</button><p className="eyebrow">Project {projects[selectedProject].number}</p><h2 id="modal-title">{projects[selectedProject].name}</h2><p>{projects[selectedProject].description}</p><dl><div><dt>Technology</dt><dd>{projects[selectedProject].stack.join(", ")}</dd></div><div><dt>Challenge</dt><dd>{projects[selectedProject].challenge}</dd></div><div><dt>Next steps</dt><dd>{projects[selectedProject].next}</dd></div></dl><div className="modal-links">{projects[selectedProject].liveUrl ? <a href={projects[selectedProject].liveUrl} target="_blank" rel="noreferrer">Live project ↗</a> : <span>Live project link needed</span>}{projects[selectedProject].repoUrl ? <a href={projects[selectedProject].repoUrl} target="_blank" rel="noreferrer">GitHub repository ↗</a> : <span>GitHub link needed</span>}</div></section></div>}
    </>
  );
}
