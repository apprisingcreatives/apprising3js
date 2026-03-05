"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";

function HeroFallback() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#050d10] via-[#0a1a1b] to-[#0F3D3E]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-400 blur-3xl animate-pulse" />
        <div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-cyan-300 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/3 left-1/2 w-24 h-24 rounded-full bg-teal-300 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
}

const HeroScene = lazy(() => import("@/components/three/hero-scene"));

function ThreeCanvas({
  onStageChange,
}: {
  onStageChange: (stage: number) => void;
}) {
  return (
    <Suspense fallback={<HeroFallback />}>
      <HeroScene onStageChange={onStageChange} />
    </Suspense>
  );
}

export default function Hero() {
  const [stage, setStage] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Show overlay after stage 1 or after 6 seconds
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleStageChange = (newStage: number) => {
    setStage(newStage);
    if (newStage >= 1 && !showOverlay) {
      setShowOverlay(true);
    }
  };

  // Prevent hydration mismatch by only rendering interactive content after mount
  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <HeroFallback />
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <ThreeCanvas onStageChange={handleStageChange} />
      </div>

      {/* Gradient overlay at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d10]/80 via-transparent to-transparent pointer-events-none" />

      {/* Hero Overlay Content - fades in after Stage 2 */}
      <div
        className={`absolute bottom-0 left-0 right-0 pb-20 md:pb-24 px-6 md:px-20 transition-all duration-1000 ${
          showOverlay ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-[600px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-cyan-400" />
            <span className="font-mono-tech text-xs text-cyan-400 tracking-widest uppercase">
              AI Software Development
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-hero-mobile md:text-hero font-bold text-white mb-6 leading-tight">
            We Transform <span className="text-cyan-400">Complexity</span> Into
            Intelligent Systems
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg text-white/60 mb-10 max-w-[480px]">
            From code to architecture to AI-powered business systems — we build
            the software that drives your competitive edge.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-display font-medium text-teal-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all duration-200 active:scale-[0.98] group"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-display font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-200"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>

      {/* Stage indicators (subtle) */}
      <div className="absolute bottom-6 right-6 md:right-20 flex gap-2">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
              stage >= s ? "bg-cyan-400" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono-tech">
          Scroll
        </span>
        <div className="w-px h-6 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
