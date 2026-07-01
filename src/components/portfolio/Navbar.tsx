import { useEffect, useState } from "react";
import { Moon, Sun, Download } from "lucide-react";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Achievements", "achievements"],
  ["Certifications", "certs"],
  ["Contact", "contact"],
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(94vw,960px)]" : "w-[min(96vw,1100px)]"
      }`}
    >
      <nav
        className={`glass-strong flex items-center justify-between rounded-full px-3 py-2 transition-all ${scrolled ? "py-1.5" : ""}`}
      >
        <a href="#home" className="ml-2 flex items-center gap-2 font-display font-bold">
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-xs"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
              color: "white",
            }}
          >
            GL
          </span>
          <span className="hidden sm:inline">Guhan</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                  active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {active === id && (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                    }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60 bg-secondary/50 transition hover:bg-secondary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#contact"
            className="shine hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white md:inline-flex"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
            }}
          >
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
