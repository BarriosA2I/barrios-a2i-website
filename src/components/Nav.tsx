"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { href: "#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/documentation", label: "Docs" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav
          className={`flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-300 ${
            scrolled
              ? "glass border-glow-cyan"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo Image */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-110 duration-300">
              <Image
                src="/logo.png"
                alt="Barrios A2I Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(0,194,255,0.5)]"
              />
            </div>
            {/* Text Logo */}
            <div className="hidden sm:block">
              <div className="text-white font-display font-bold text-lg tracking-wide">
                BARRIOS <span className="text-cyber-cyan">A2I</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-cyber-cyan font-medium text-sm transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-cyan group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#pricing"
              className="px-6 py-2.5 bg-cyber-cyan text-navy-deep font-bold text-sm rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
            >
              Start Your Build
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-cyber-cyan"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-2 glass rounded-2xl p-6 border-glow-cyan"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-slate-300 hover:text-cyber-cyan font-medium py-2 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#pricing"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-6 py-3 bg-cyber-cyan text-navy-deep font-bold text-center rounded-lg"
                >
                  Start Your Build
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
