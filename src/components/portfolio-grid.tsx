"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

interface Project {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
  status: string;
}

interface PortfolioGridProps {
  projects: Project[];
}

const techTags = ["All", "Featured", "Active"];

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeTag, setActiveTag] = useState("All");

  const filteredProjects =
    activeTag === "All"
      ? projects
      : activeTag === "Featured"
        ? projects.slice(0, Math.ceil(projects.length / 2))
        : projects.filter((p) => p.status === activeTag.toLowerCase());

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Placeholder colors for projects
  const colors = [
    "from-cyan-400 to-teal-400",
    "from-blue-400 to-cyan-400",
    "from-purple-400 to-blue-400",
    "from-pink-400 to-purple-400",
    "from-orange-400 to-pink-400",
    "from-green-400 to-emerald-400",
  ];

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 bg-[#F9FAFB] dark:bg-background"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-cyan-400" />
              <span className="font-mono-tech text-xs text-teal-500 tracking-widest uppercase">
                Our Work
              </span>
            </div>
            <h2 className="font-display text-h2-mobile md:text-h2 font-bold text-teal-900 dark:text-cyan-400 mb-4">
              Featured Projects
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-[600px]">
              Explore the projects created by our community members and showcase
              your own work.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Tags */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2 mb-12">
            {techTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-teal-500 dark:bg-cyan-500 text-white"
                    : "bg-white dark:bg-gray-800 text-teal-700 dark:text-cyan-400 border border-teal-100 dark:border-gray-700 hover:bg-teal-50 dark:hover:bg-gray-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Project Grid */}
        {filteredProjects.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No projects found.</p>
              <p className="text-sm text-muted-foreground">
                Check back soon as community members add their projects!
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 100}>
                <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(11,31,42,0.08)] dark:shadow-none dark:border dark:border-gray-700 hover:shadow-[0_8px_32px_rgba(11,31,42,0.12)] dark:hover:shadow-lg dark:hover:shadow-cyan-500/10 transition-all duration-300">
                  {/* Image/Gradient */}
                  <div
                    className={`relative h-52 overflow-hidden bg-gradient-to-br ${colors[i % colors.length]}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="text-6xl font-bold text-white">
                        {i + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                      {formatDate(project.created_at)}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-teal-900 dark:text-cyan-400 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description || "No description provided"}
                    </p>

                    {/* Status Tag */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-0.5 text-[11px] font-mono-tech rounded capitalize ${
                          project.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {project.status}
                      </span>

                      {/* CTA */}
                      <div className="flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-500 transition-colors">
                        View
                        <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
