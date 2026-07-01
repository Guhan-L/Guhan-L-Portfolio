import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "Data Analyst Intern",
  "Technical Coordinator",
  "AI Student Builder",
];

export function Loader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t1 = setInterval(() => setStep((s) => (s + 1) % roles.length), 380);
    const t2 = setInterval(() => setProgress((p) => Math.min(100, p + 4)), 90);
    const done = setTimeout(() => {
      setShow(false);
      setTimeout(onDone, 700);
    }, 2600);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="aurora-blob absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[120px]"
              style={{
                background: "radial-gradient(circle, var(--color-primary), transparent 65%)",
              }}
            />
          </div>
          <div className="relative z-10 flex w-[min(90vw,560px)] flex-col items-center text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl font-bold tracking-tight md:text-6xl"
            >
              <span className="text-gradient">Guhan Lakshmanan</span>
            </motion.h1>
            <div className="mt-4 h-7 font-mono text-sm text-muted-foreground md:text-base">
              <AnimatePresence mode="wait">
                <motion.span
                  key={step}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {"> "}
                  {roles[step]}
                  <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              Building Intelligent Digital Experiences
            </motion.p>
            <div className="mt-8 h-[3px] w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-highlight))",
                }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
