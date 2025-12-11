"use client"

import Link from "next/link"
import { Twitter, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Websites", href: "#pricing" },
    { label: "Video Production", href: "#pricing" },
    { label: "AI Automation", href: "#pricing" },
    { label: "Enterprise", href: "#pricing" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/barriosa2i", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/barriosa2i", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@barriosa2i.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-navy-deep">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-gold" />
                <div className="absolute inset-1 rounded-full bg-navy-deep flex items-center justify-center">
                  <span className="text-cyber-cyan font-display font-bold text-sm">A2I</span>
                </div>
              </div>
              <div className="text-white font-display font-bold text-lg">
                BARRIOS <span className="text-cyber-cyan">A2I</span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Automated operations. Engineered attention. The complete ROI stack for businesses that want to grow.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan/30 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-bold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyber-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-display font-bold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@barriosa2i.com"
                  className="text-slate-400 hover:text-cyber-cyan transition-colors text-sm"
                >
                  hello@barriosa2i.com
                </a>
              </li>
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyber-cyan transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Barrios A2I Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Built with</span>
            <span className="text-cyber-cyan">Next.js</span>
            <span>+</span>
            <span className="text-cyber-gold">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
