import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Briefcase,
  Sparkles,
  Code2,
  Database,
  Brain,
  Wrench,
  Layers,
  Trophy,
  Award,
  GraduationCap,
  Mail,
  Phone,
  Linkedin,
  Github,
  ArrowUpRight,
  Star,
  Rocket,
  ExternalLink,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/profile.jpeg";

/* ============ HERO ============ */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [6, -6]), { stiffness: 80, damping: 12 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-6, 6]), { stiffness: 80, damping: 12 });

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-32 pb-16"
    >
      <div className="grid w-full items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Open to Internships & Opportunities
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Building <span className="text-gradient">AI-Powered</span> Digital Products That Solve
            Real Problems
          </h1>
          <RolesRotator />
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Building intelligent digital experiences through Artificial Intelligence, Data
            Analytics, and Modern Web Development.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact Me
            </MagneticButton>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat label="Projects" value="7+" />
            <Stat label="Client Work" value="Real" />
            <Stat label="Internship" value="Live" />
            <Stat label="Leadership" value="Tech Lead" />
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current!.getBoundingClientRect();
            mx.set(e.clientX - r.left - r.width / 2);
            my.set(e.clientY - r.top - r.height / 2);
          }}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mx-auto aspect-square w-full max-w-md"
          style={{ perspective: 1000 }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative h-full w-full">
            <div
              className="absolute -inset-6 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--color-primary), var(--color-accent), var(--color-highlight), var(--color-primary))",
              }}
            />
            <div className="glass-strong float-slow relative h-full w-full overflow-hidden rounded-[2rem] p-2">
              <div className="relative h-full w-full overflow-hidden rounded-[1.7rem]">
                <img
                  src={portrait}
                  alt="Guhan Lakshmanan"
                  width={832}
                  height={1024}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--color-background) 85%, transparent))",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold">Guhan Lakshmanan</div>
                    <div className="text-xs text-muted-foreground">
                      B.Sc CS with AI · DG Vaishnav College
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/20 px-2 py-1 text-[10px] font-semibold text-primary">
                    v1.0
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function RolesRotator() {
  const roles = ["Frontend Developer", "Data Analyst Intern", "AI Student Builder"];
  const [i, setI] = useState(0);
  useTimer(() => setI((x) => (x + 1) % roles.length), 2200);
  return (
    <div className="mt-4 flex h-8 items-center gap-2 text-lg font-medium md:text-xl">
      <span className="text-muted-foreground">I am a</span>
      <div className="relative h-8 overflow-hidden">
        {roles.map((r, idx) => (
          <motion.span
            key={r}
            initial={false}
            animate={{ y: idx === i ? 0 : idx < i ? -32 : 32, opacity: idx === i ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-0 top-0 whitespace-nowrap text-gradient font-display font-semibold"
          >
            {r}
          </motion.span>
        ))}
        <span className="invisible text-gradient font-display font-semibold">
          Data Analyst Intern
        </span>
      </div>
    </div>
  );
}

function useTimer(cb: () => void, ms: number) {
  const ref = useRef(cb);
  ref.current = cb;
  useEffect(() => {
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-3 py-3">
      <div className="font-display text-xl font-bold text-gradient">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function MagneticButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  const base =
    "shine relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition";
  const styles =
    variant === "primary"
      ? {
          background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
          color: "white",
        }
      : undefined;
  const cls = variant === "primary" ? `${base} glow-primary` : `${base} glass hover:bg-secondary`;
  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, ...(styles ?? {}) }}
      className={cls}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}

/* ============ SECTION TITLE ============ */
function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      <div className="text-xs uppercase tracking-[0.3em] text-primary">{kicker}</div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ============ ABOUT ============ */
export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionTitle kicker="About" title="A student building like a startup" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-12"
      >
        <div
          className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <p className="relative text-lg leading-relaxed text-muted-foreground md:text-xl">
          I am a{" "}
          <span className="text-foreground">
            B.Sc Computer Science with Artificial Intelligence
          </span>{" "}
          student at
          <span className="text-foreground"> DG Vaishnav College</span>. Currently serving as
          <span className="text-foreground"> Technical Coordinator of AI IGNITE Forum</span> and
          working as a<span className="text-foreground"> Data Analyst Intern at Interain AI</span>.
          I have hands-on experience building responsive websites, client-focused solutions, and
          AI-powered applications. My interests include Artificial Intelligence, Data Analytics,
          Product Development, and Modern Web Technologies.
        </p>
        <div className="relative mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Brain, label: "AI & ML" },
            { icon: Database, label: "Data Analytics" },
            { icon: Code2, label: "Modern Web" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="glass flex items-center gap-3 rounded-2xl p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ============ EXPERIENCE ============ */
const experiences = [
  {
    role: "Data Analyst Intern",
    org: "Interain AI",
    icon: Database,
    points: [
      "Data Analysis",
      "Reporting",
      "Business Insights",
      "Research & Analytics",
      "AI-Assisted Workflows",
    ],
  },
  {
    role: "Technical Coordinator",
    org: "AI IGNITE Forum",
    icon: Briefcase,
    points: [
      "Organizing Technical Events",
      "Student Community Engagement",
      "Workshop Coordination",
      "Technology Initiatives",
      "Team Collaboration",
    ],
  },
];
export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionTitle kicker="Experience" title="Where I'm building right now" />
      <div className="relative">
        <div
          className="absolute left-4 top-0 bottom-0 hidden w-px md:left-1/2 md:block"
          style={{
            background:
              "linear-gradient(180deg, transparent, var(--color-primary), var(--color-accent), transparent)",
          }}
        />
        <div className="space-y-8">
          {experiences.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div
                className={`glass-strong rounded-2xl p-6 hover-lift ${i % 2 ? "md:text-left" : "md:text-right"}`}
              >
                <div className={`flex items-center gap-3 ${i % 2 ? "" : "md:flex-row-reverse"}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                    <e.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-xl font-semibold">{e.role}</div>
                    <div className="text-sm text-muted-foreground">{e.org}</div>
                  </div>
                </div>
                <ul className={`mt-4 flex flex-wrap gap-2 ${i % 2 ? "" : "md:justify-end"}`}>
                  {e.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROJECTS ============ */
type Project = {
  title: string;
  emoji: string;
  tag: string;
  desc: string;
  features?: string[];
  tech?: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  disableDemo?: boolean;
};
const projects: Project[] = [
  {
    title: "CareerDNA AI",
    emoji: "⭐",
    tag: "AI Product",
    featured: true,
    desc: "AI-powered career intelligence platform helping students improve employability through ATS analysis, skill-gap detection, career roadmaps, and placement readiness tracking.",
    features: [
      "ATS Resume Analysis",
      "Skill-Gap Detection",
      "Career Roadmap Engine",
      "Placement Readiness Score",
      "AI Mentor Chat",
    ],
    tech: ["React", "Node.js", "Tailwind CSS", "Groq API"],
    github: "https://github.com/Saravanan2005real/AI-Powered-Resume-JD-analyzer",
    demo: "#",
    disableDemo: true,
  },
  {
    title: "Chinnadurai Coaching Centre",
    emoji: "🎓",
    tag: "Client Site",
    desc: "Responsive website built for a real client showcasing courses, faculty, and admissions.",
    features: ["SEO Optimized", "Responsive", "Admissions Form"],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Guhan-L/Chinnadurai-Coaching-Centre-CCC",
    demo: "https://chinnadurai-coaching-centre-website.vercel.app/",
  },
  {
    title: "Baking Academy Model Website",
    emoji: "🎨",
    tag: "Concept",
    desc: "A warm, premium concept site for a baking academy — visual storytelling and course catalog.",
    features: ["Course Catalog", "Gallery", "Booking"],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Guhan-L/Baking-Academy-Model-Website",
    demo: "https://baking-academy-model-website.vercel.app/",
  },
  {
    title: "Library Management System",
    emoji: "📚",
    tag: "System",
    desc: "Library workflow automation: catalog, issue/return, member management.",
    features: ["Catalog", "Issue / Return", "Members"],
    tech: ["HTML", "CSS", "JavaScript", "Django"],
    github: "https://github.com/Guhan-L/Library-Management-System",
    demo: "https://drive.google.com/file/d/1OtEbw-nFumq3KfNHZHefuFchr8wrjTLI/view?usp=drive_link",
  },
  {
    title: "Text Summarizer Web App",
    emoji: "📝",
    tag: "AI Tool",
    desc: "NLP-powered summarizer that condenses long-form content into key takeaways.",
    features: ["Extractive + Abstractive", "Length Control"],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Guhan-L/Text-Summarizer-Web-APP",
  },
  {
    title: "Lottle Cafe Website",
    emoji: "☕",
    tag: "Client Site",
    desc: "Cozy cafe website with menu, story, and reservations.",
    features: ["Menu", "Story", "Reservations"],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Guhan-L/Project-Lottle-Cafe-UI-UX",
    demo: "https://project-lottle-cafe-ui-ux.vercel.app/",
  },
];

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionTitle
        kicker="Projects"
        title="A few things I've shipped"
        sub="Real client work, AI tools, and a flagship product in development."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} onOpen={() => setOpen(p)} />
        ))}
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [4, -4]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-4, 4]), { stiffness: 120, damping: 14 });
  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
        ref.current!.style.setProperty("--sx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--sy", `${e.clientY - r.top}px`);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      style={{ rotateX: rx, rotateY: ry, perspective: 800 }}
      className={`group glass-strong relative overflow-hidden rounded-3xl p-6 text-left transition hover:border-primary/40 ${project.featured ? "md:col-span-2 lg:col-span-2" : ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--sx) var(--sy), color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 60%)",
        }}
      />
      {project.featured && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          <Star className="h-3 w-3 fill-current" /> Featured Innovation
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="text-3xl">{project.emoji}</div>
        <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] text-muted-foreground">
          {project.tag}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold md:text-2xl">{project.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{project.desc}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        <div className="flex flex-wrap gap-1.5">
          {(project.tech ?? []).slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-md bg-secondary/60 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-primary opacity-0 transition group-hover:opacity-100">
          View <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresenceLazy show={!!project}>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-background/70 p-4 backdrop-blur-md"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, filter: "blur(12px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.96, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong relative w-full max-w-2xl overflow-hidden rounded-3xl p-7"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-secondary/60 hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-3xl">{project.emoji}</div>
            <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{project.title}</h3>
            <div className="mt-1 text-xs uppercase tracking-widest text-primary">{project.tag}</div>
            <p className="mt-4 text-muted-foreground">{project.desc}</p>
            {project.features && (
              <>
                <h4 className="mt-6 text-sm font-semibold">Features</h4>
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {project.tech && (
              <>
                <h4 className="mt-6 text-sm font-semibold">Technologies</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
            <div className="mt-7 flex gap-3">
              {project.demo !== undefined && (
                <a
                  className={`shine inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white ${
                    project.disableDemo ? "pointer-events-none opacity-50" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                  }}
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />{" "}
                  {project.disableDemo ? "Coming Soon" : "Live Demo"}
                </a>
              )}
              {project.github && (
                <a
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium hover:bg-secondary"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresenceLazy>
  );
}

function AnimatePresenceLazy({ show, children }: { show: boolean; children: React.ReactNode }) {
  return <AnimatePresence>{show ? children : null}</AnimatePresence>;
}

/* ============ SKILLS ============ */
const skillGroups: { title: string; icon: any; items: string[] }[] = [
  {
    title: "Programming",
    icon: Code2,
    items: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
  },
  {
    title: "Web Development",
    icon: Layers,
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Node.js"],
  },
  { title: "UI / UX", icon: Sparkles, items: ["Figma", "Design Systems", "Prototyping", "Motion"] },
  {
    title: "AI & Data",
    icon: Brain,
    items: ["Machine Learning", "Deep Learning", "Generative AI", "Data Analytics", "Statistics"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Jupyter", "MATLAB", "Microsoft Copilot"],
  },
  {
    title: "Additional",
    icon: Star,
    items: ["Public Speaking", "Team Leadership", "Event Management", "Client Communication"],
  },
];
export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionTitle kicker="Skills" title="A growing AI-era toolkit" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="glass-strong rounded-2xl p-6 hover-lift"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <g.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="cursor-default rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs transition hover:border-primary/50 hover:bg-primary/10 hover:text-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ ACHIEVEMENTS ============ */
const achievements = [
  { icon: Trophy, title: "Overall Champions (Team)", desc: "Technical Symposium" },
  { icon: Award, title: "Multiple Symposiums", desc: "Active participation across colleges" },
  { icon: Briefcase, title: "Data Analyst Intern", desc: "Interain AI" },
  { icon: Sparkles, title: "Technical Coordinator", desc: "AI IGNITE Forum" },
  { icon: Code2, title: "Real Client Websites", desc: "Production-grade delivery" },
  { icon: GraduationCap, title: "10+ Certifications", desc: "Across AI, Web and Cyber" },
  { icon: Rocket, title: "Building Career DNA", desc: "AI career intelligence" },
];
export function Achievements() {
  return (
    <section id="achievements" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionTitle kicker="Achievements" title="Wins that shaped the path" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="group glass relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:border-primary/40"
          >
            <div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
              style={{ background: "var(--color-primary)" }}
            />
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <a.icon className="h-5 w-5" />
            </span>
            <div className="mt-4 font-semibold">{a.title}</div>
            <div className="text-sm text-muted-foreground">{a.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============ CERTIFICATIONS (marquee) ============ */
const certs = [
  "Web Application Development using Django",
  "Generative AI Basics",
  "Introduction to Artificial Intelligence",
  "Microsoft Copilot",
  "Concepts of Cyber Security",
  "Machine Learning Onramp",
  "Deep Learning Onramp",
  "Statistics Onramp",
  "Python Programming & Problem Solving",
];
export function Certifications() {
  return (
    <section id="certs" className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionTitle kicker="Certifications" title="Always learning" />
      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee-track flex w-max gap-4 group-hover:[animation-play-state:paused]">
          {[...certs, ...certs].map((c, i) => (
            <div key={i} className="glass flex items-center gap-3 rounded-2xl px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent">
                <Award className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium whitespace-nowrap">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CURRENTLY BUILDING ============ */
export function Building() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="glass-strong pulse-ring relative overflow-hidden rounded-3xl p-8 md:p-12"
      >
        <div
          className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: "var(--color-accent)" }}
        />
        <div
          className="absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">
              Currently Building
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Building the <span className="text-gradient">Future</span>
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              <span className="font-semibold text-foreground">Career DNA</span> — an AI-powered
              career intelligence ecosystem helping students understand strengths, identify skill
              gaps, improve employability and prepare strategically for future opportunities.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success" /> In Development
            </div>
          </div>
          <div className="glass relative aspect-video w-full overflow-hidden rounded-2xl p-5">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "conic-gradient(from 220deg at 50% 50%, var(--color-primary), var(--color-accent), var(--color-highlight), var(--color-primary))",
              }}
            />
            <div className="absolute inset-[1px] rounded-2xl bg-card/80 backdrop-blur-xl" />
            <div className="relative grid h-full place-items-center text-center">
              <div>
                <Rocket className="mx-auto h-10 w-10 text-primary" />
                <div className="mt-3 font-display text-xl font-semibold">Career DNA</div>
                <div className="text-xs text-muted-foreground">v0.1 · Private Alpha</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============ CONTACT ============ */
export function Contact() {
  const items = [
    {
      icon: Mail,
      label: "Email",
      value: "guhanlakshmanan21@gmail.com",
      href: "mailto:guhanlakshmanan21@gmail.com",
    },
    { icon: Phone, label: "Phone", value: "+91 7358012441", href: "tel:+917358012441" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "/in/guhan-lakshmanan",
      href: "https://www.linkedin.com/in/guhan-lakshmanan/",
    },
    { icon: Github, label: "GitHub", value: "@Guhan-L", href: "https://github.com/Guhan-L" },
  ];
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionTitle
        kicker="Contact"
        title="Let's build something great"
        sub="Open to internships, freelance client work, and ambitious collaborations."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it, i) => (
          <motion.a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group glass-strong relative flex items-center justify-between overflow-hidden rounded-2xl p-5 hover-lift"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                <it.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {it.label}
                </div>
                <div className="font-medium">{it.value}</div>
              </div>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-6 pb-10 pt-16">
      <div className="glass-strong relative overflow-hidden rounded-3xl p-8">
        <div
          className="absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--color-primary)" }}
        />
        <div className="relative grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-xl font-bold text-gradient">Guhan Lakshmanan</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Frontend Developer · Data Analyst Intern · AI Student Builder
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Quick Links
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {["Home", "About", "Projects", "Skills", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    className="text-muted-foreground hover:text-foreground"
                    href={`#${l.toLowerCase()}`}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Social</div>
            <div className="mt-3 flex gap-2">
              <a
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/guhan-lakshmanan/"
                className="glass grid h-10 w-10 place-items-center rounded-full hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Guhan-L"
                className="glass grid h-10 w-10 place-items-center rounded-full hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                aria-label="Email"
                href="mailto:guhanlakshmanan21@gmail.com"
                className="glass grid h-10 w-10 place-items-center rounded-full hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="relative mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/50 pt-5 text-xs text-muted-foreground md:flex-row">
          <div>© 2026 Guhan Lakshmanan · All Rights Reserved</div>
          <a
            href="#home"
            className="rounded-full border border-border/60 px-3 py-1 hover:border-primary/50 hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============ SCROLL PROGRESS ============ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        background:
          "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-highlight))",
        scaleX: scrollYProgress,
      }}
    />
  );
}
