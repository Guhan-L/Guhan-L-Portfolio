import { useEffect, useRef } from "react";

export function PremiumBackground() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
      el.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ ["--mx" as any]: "50%", ["--my" as any]: "30%" }}
    >
      {/* Aurora orbs */}
      <div
        className="aurora-blob absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full opacity-60 blur-[120px]"
        style={{
          background: "radial-gradient(circle at 30% 30%, var(--color-primary), transparent 60%)",
        }}
      />
      <div
        className="aurora-blob absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full opacity-50 blur-[120px]"
        style={{
          background: "radial-gradient(circle at 70% 30%, var(--color-accent), transparent 60%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="aurora-blob absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full opacity-40 blur-[120px]"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--color-highlight), transparent 60%)",
          animationDelay: "-8s",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklab, var(--color-foreground) 14%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--color-foreground) 14%, transparent) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />
      {/* Mouse glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-primary) 22%, transparent), transparent 60%)",
          transition: "background 200ms",
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, color-mix(in oklab, var(--color-background) 70%, transparent))",
        }}
      />
    </div>
  );
}
