import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PremiumBackground } from "@/components/portfolio/Background";
import { Loader } from "@/components/portfolio/Loader";
import { Navbar } from "@/components/portfolio/Navbar";
import {
  Hero,
  About,
  Experience,
  Projects,
  Skills,
  Achievements,
  Certifications,
  Building,
  Contact,
  Footer,
  ScrollProgress,
} from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guhan Lakshmanan | Frontend Developer · Data Analyst Intern · AI Student Builder" },
      {
        name: "description",
        content:
          "Portfolio showcasing AI projects, frontend development, data analytics experience, leadership roles, real client work, and innovative digital products.",
      },
      {
        property: "og:title",
        content: "Guhan Lakshmanan — Building Intelligent Digital Experiences",
      },
      {
        property: "og:description",
        content:
          "AI-powered products, frontend craft, data analytics and leadership. Welcome to my digital universe.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <PremiumBackground />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Certifications />
      <Building />
      <Contact />
      <Footer />
    </main>
  );
}
