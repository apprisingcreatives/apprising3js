import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PortfolioGrid from "@/components/portfolio-grid";
import { createClient } from "../../../supabase/server";

export const metadata: Metadata = {
  title: "Portfolio - AI Projects & Case Studies | NexusAI",
  description:
    "Explore NexusAI's portfolio of successful AI-powered projects, case studies, and intelligent systems implementations. See how we've transformed businesses with machine learning solutions.",
  keywords:
    "AI projects, case studies, portfolio, machine learning applications, AI implementation, successful projects, enterprise AI solutions",
};

export default async function PortfolioPage() {
  const supabase = await createClient();

  // Fetch all projects from the database
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar user={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
                Our <span className="text-cyan-500">Portfolio</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Discover how we've helped organizations transform their
                operations with intelligent AI solutions and cutting-edge
                technology.
              </p>
            </div>

            {/* Portfolio Grid */}
            <PortfolioGrid projects={projects || []} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
