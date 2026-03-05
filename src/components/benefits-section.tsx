"use client";

import ScrollReveal from "@/components/scroll-reveal";
import { CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Optimized performance and blazing-fast load times that keep your users engaged.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with GDPR, SOC 2, and industry standards.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Growth",
    description:
      "Infrastructure designed to grow with your business without performance degradation.",
  },
  {
    icon: CheckCircle2,
    title: "Proven Reliability",
    description:
      "99.9% uptime guarantee with 24/7 monitoring and instant incident response.",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="py-24 md:py-32 bg-white dark:bg-[#0a1a1b] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 dark:bg-teal-400/5 blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the difference that comes from working with a team that
              truly cares about your success.
            </p>
          </div>
        </ScrollReveal>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal key={benefit.title} delay={index * 0.1}>
                <div className="group p-8 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-cyan-400/50 dark:hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-400/10">
                  <div className="mb-5">
                    <Icon className="w-10 h-10 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
