import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 border-t border-teal-800">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-display font-bold text-lg text-white mb-4 block">
              Apprising Creatives
            </span>
            <p className="text-sm text-white/40 leading-relaxed max-w-[240px]">
              Transforming complexity into intelligent, scalable systems for
              forward-thinking organizations.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="#services"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  AI Integration
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  Custom Development
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  System Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  Technical Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-white/40 hover:text-cyan-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="text-sm text-white/30 mb-4 md:mb-0">
            © {currentYear} Apprising Creatives. All rights reserved.
          </div>

          <div className="flex space-x-5">
            <a
              href="#"
              className="text-white/30 hover:text-cyan-400 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-cyan-400 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-white/30 hover:text-cyan-400 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
