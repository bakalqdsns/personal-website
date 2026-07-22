'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/hero/HeroSection';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import SkillPanel from '@/components/radar/SkillPanel';
import NeonPipeline from '@/components/pipeline/NeonPipeline';
import AboutSection from '@/components/about/AboutSection';
import useKeyboardShortcuts from '@/lib/useKeyboardShortcuts';

function Shortcuts() {
  useKeyboardShortcuts();
  return null;
}

export default function HomePage() {
  return (
    <main className="relative">
      <Shortcuts />
      <HeroSection />
      <ProjectsGrid />
      <SkillPanel />
      <NeonPipeline />
      <AboutSection />
      <footer className="border-t border-line/60 px-6 py-8 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-muted md:px-12">
        SHOWROOM · BUILT WITH NEXT.JS + R3F + GSAP · © 2026
      </footer>
    </main>
  );
}