"use client";

import { Brain, Code2, Network } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

const services = [
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "We embed intelligent capabilities into your existing systems — from NLP-powered document processing to computer vision pipelines and predictive analytics that surface actionable insights.",
    features: [
      "Machine Learning Pipelines",
      "Natural Language Processing",
      "Computer Vision Systems",
      "Predictive Analytics",
    ],
  },
  {
    icon: Code2,
    title: "Custom Development",
    description:
      "End-to-end software engineering with modern tech stacks. We build performant, maintainable applications that scale with your business — from MVPs to enterprise platforms.",
    features: [
      "Full-Stack Applications",
      "API Design & Development",
      "Cloud-Native Architecture",
      "Performance Optimization",
    ],
  },
  {
    icon: Network,
    title: "System Architecture",
    description:
      "We design the technical foundations that support growth. Our architecture consulting ensures your systems are resilient, scalable, and aligned with your long-term strategy.",
    features: [
      "Microservices Design",
      "Data Architecture",
      "Infrastructure as Code",
      "System Integration",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-400" />
              <span className="font-mono-tech text-xs text-teal-500 tracking-widest uppercase">
                What We Do
              </span>
              <div className="h-px w-8 bg-cyan-400" />
            </div>
            <h2 className="font-display text-h2-mobile md:text-h2 font-bold text-teal-900 mb-4">
              Core Services
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-[600px] mx-auto">
              Three pillars of expertise that converge to deliver intelligent,
              scalable software solutions for forward-thinking organizations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <div className="group relative bg-[#F9FAFB] rounded-2xl p-8 hover:bg-white hover:shadow-[0_8px_32px_rgba(11,31,42,0.08)] transition-all duration-300 h-full border border-transparent hover:border-teal-100">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-400/10 transition-colors">
                  <service.icon className="w-7 h-7 text-teal-500 group-hover:text-cyan-500 transition-colors" />
                </div>

                {/* Title */}
                <h3 className="font-display text-h3-mobile md:text-h3 font-bold text-teal-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-teal-800"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
