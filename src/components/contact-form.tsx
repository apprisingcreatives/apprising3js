"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Send } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";
import { submitContactForm } from "@/app/actions";

const projectTypes = [
  {
    id: "ai-integration",
    label: "AI Integration",
    description: "Embed intelligence into existing systems",
  },
  {
    id: "custom-dev",
    label: "Custom Development",
    description: "Build new software from the ground up",
  },
  {
    id: "architecture",
    label: "System Architecture",
    description: "Design scalable technical foundations",
  },
  {
    id: "consulting",
    label: "Technical Consulting",
    description: "Strategic guidance and assessment",
  },
];

const budgetRanges = ["$25K - $50K", "$50K - $100K", "$100K - $250K", "$250K+"];

const timelines = [
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Ongoing engagement",
];

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    name: "",
    email: "",
    company: "",
  });

  const handleProjectType = (type: string) => {
    setFormData((prev) => ({ ...prev, projectType: type }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("projectType", formData.projectType);
      formDataToSend.append("budget", formData.budget);
      formDataToSend.append("timeline", formData.timeline);
      formDataToSend.append("description", formData.description);

      const result = await submitContactForm(formDataToSend);

      if (result.error) {
        setError(result.error);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.projectType !== "";
      case 1:
        return formData.description.length > 10;
      case 2:
        return formData.name && formData.email;
      default:
        return true;
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 md:py-32 bg-[#F9FAFB]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-cyan-600" />
          </div>
          <h2 className="font-display text-h2-mobile md:text-h2 font-bold text-teal-900 mb-4">
            Thank You
          </h2>
          <p className="text-body-lg text-muted-foreground">
            We&apos;ve received your project inquiry. Our team will review your
            requirements and get back to you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F9FAFB]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-cyan-400" />
                <span className="font-mono-tech text-xs text-teal-500 tracking-widest uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-display text-h2-mobile md:text-h2 font-bold text-teal-900 mb-4">
                Let&apos;s Build Something{" "}
                <span className="text-cyan-500">Exceptional</span>
              </h2>
              <p className="text-body-lg text-muted-foreground mb-10">
                Tell us about your project and we&apos;ll craft a custom
                approach tailored to your goals, timeline, and technical
                requirements.
              </p>

              {/* Contact Info */}
              <div className="mb-10 p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                <p className="text-sm text-teal-900 mb-2 font-medium">
                  Prefer to call? Reach us at:
                </p>
                <a
                  href="tel:+639204786075"
                  className="text-lg font-display font-bold text-cyan-600 hover:text-cyan-700 transition-colors"
                >
                  +63 920 478 6075
                </a>
              </div>

              {/* Process steps */}
              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "Discovery Call",
                    desc: "30-minute conversation to understand your challenges",
                  },
                  {
                    num: "02",
                    title: "Technical Assessment",
                    desc: "We evaluate your requirements and propose an approach",
                  },
                  {
                    num: "03",
                    title: "Proposal & Kickoff",
                    desc: "Detailed scope, timeline, and team composition",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <span className="font-mono-tech text-xs font-bold text-teal-600">
                        {item.num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-teal-900 text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(11,31,42,0.08)] border border-teal-50">
              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      s <= step ? "bg-cyan-400" : "bg-teal-100"
                    }`}
                  />
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                {/* Step 1: Project Type */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-teal-900 mb-1">
                        What type of project?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Select the service that best matches your needs
                      </p>
                    </div>
                    <div className="space-y-3">
                      {projectTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => handleProjectType(type.id)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            formData.projectType === type.id
                              ? "border-cyan-400 bg-cyan-50"
                              : "border-teal-100 hover:border-teal-200 bg-white"
                          }`}
                        >
                          <div className="font-display font-medium text-sm text-teal-900">
                            {type.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {type.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Requirements */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-teal-900 mb-1">
                        Tell us more
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Help us understand the scope and requirements
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-2">
                        Project Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        rows={4}
                        className="w-full rounded-xl border border-teal-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                        placeholder="Briefly describe your project goals, challenges, and desired outcomes..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-2">
                        Budget Range
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetRanges.map((range) => (
                          <button
                            key={range}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                budget: range,
                              }))
                            }
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              formData.budget === range
                                ? "border-cyan-400 bg-cyan-50 text-teal-900"
                                : "border-teal-100 text-muted-foreground hover:border-teal-200"
                            }`}
                          >
                            {range}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-2">
                        Timeline
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {timelines.map((tl) => (
                          <button
                            key={tl}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, timeline: tl }))
                            }
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              formData.timeline === tl
                                ? "border-cyan-400 bg-cyan-50 text-teal-900"
                                : "border-teal-100 text-muted-foreground hover:border-teal-200"
                            }`}
                          >
                            {tl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-teal-900 mb-1">
                        Your Details
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        How can we reach you?
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-teal-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-teal-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-teal-800 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-teal-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                        placeholder="Your company (optional)"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-teal-700 hover:text-teal-900 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canProceed()}
                      className="inline-flex items-center px-6 py-2.5 text-sm font-display font-medium text-teal-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canProceed() || isSubmitting}
                      className="inline-flex items-center px-6 py-2.5 text-sm font-display font-medium text-teal-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          Sending...
                          <div className="w-4 h-4 ml-2 border-2 border-teal-900 border-t-transparent rounded-full animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
