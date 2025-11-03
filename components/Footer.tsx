import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] border-t border-cyan-400/20 overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      <div className="container mx-auto px-5 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 relative">
                <Image
                  src="/logos/ChatGPT Image Oct 31, 2025, 10_32_50 AM.png"
                  alt="Barrios A2I"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(0, 217, 255, 0.3))",
                  }}
                />
              </div>
              <div>
                <div className="text-cyan-400 font-orbitron font-bold text-lg tracking-wide drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                  BARRIOS
                </div>
                <div className="text-amber-500 font-inter text-[10px] font-semibold tracking-[0.2em] uppercase opacity-90">
                  A2I SYSTEMS
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Production-grade AI orchestration for distributed multi-agent systems.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:alienation2innovation@gmail.com"
                className="w-9 h-9 bg-white/5 border border-white/10 rounded flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#features"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#architecture"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/sla"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  SLA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Barrios A2I. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <span className="text-cyan-400">Next.js</span>
            <span>+</span>
            <span className="text-amber-500">TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
