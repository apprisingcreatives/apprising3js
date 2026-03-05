"use client";

import ScrollReveal from "@/components/scroll-reveal";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12", label: "Industries Served" },
  { value: "99.9%", label: "System Uptime" },
  { value: "3.2x", label: "Average ROI" },
];

const values = [
  {
    title: "Technical Depth",
    description:
      "Our team brings decades of combined experience across AI/ML, distributed systems, and enterprise architecture.",
  },
  {
    title: "Business Alignment",
    description:
      "Every technical decision is driven by measurable business outcomes — not technology for technology's sake.",
  },
  {
    title: "Long-Term Partnership",
    description:
      "We don't just deliver and disappear. We build relationships and systems designed to evolve with your needs.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-teal-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-teal-400/5 blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/50 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* About content */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-cyan-400" />
                <span className="font-mono-tech text-xs text-cyan-400 tracking-widest uppercase">
                  About Us
                </span>
              </div>
              <h2 className="font-display text-h2-mobile md:text-h2 font-bold text-white mb-6">
                Building the Future of{" "}
                <span className="text-cyan-400">Intelligent Software</span>
              </h2>
              <p className="text-body-lg text-white/60 mb-6">
                We&apos;re a team of engineers, architects, and AI specialists who
                believe that great software should be both technically excellent
                and deeply aligned with business goals.
              </p>
              <p className="text-body-lg text-white/60">
                Founded by veterans of Fortune 500 engineering teams, we bring
                enterprise-grade discipline to every engagement — from early-stage
                startups to global organizations.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 100}>
                <div className="border-l-2 border-cyan-400/30 pl-6 hover:border-cyan-400 transition-colors">
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
