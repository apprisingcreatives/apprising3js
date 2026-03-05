import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AboutSection from "@/components/about-section";

export const metadata: Metadata = {
  title: "About NexusAI - Our Mission, Team & Expertise in AI Solutions",
  description:
    "Learn about NexusAI's mission to transform business complexity into intelligent, scalable systems. Discover our team's expertise in AI, machine learning, and enterprise solutions.",
  keywords:
    "about NexusAI, AI company, machine learning experts, enterprise solutions, technology consulting, AI innovation",
};

export default function AboutPage() {
  return (
    <>
      <Navbar user={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
                About <span className="text-cyan-500">NexusAI</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Transforming complexity into intelligent, scalable systems for
                forward-thinking organizations.
              </p>
            </div>

            <AboutSection />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
