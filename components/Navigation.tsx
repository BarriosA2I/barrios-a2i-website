'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative rounded-2xl border transition-all duration-300 ${
              scrolled
                ? 'bg-slate-950/90 backdrop-blur-xl border-cyan-400/30 shadow-[0_0_30px_rgba(0,217,255,0.2)]'
                : 'bg-slate-950/50 backdrop-blur-md border-slate-800/50'
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3 group" aria-label="Barrios A2I Home">
                {/* Barrios A2I Logo */}
                <div className="relative h-12 w-auto">
                  <img
                    src="/images/Logo/Barrios_a2i_logo-removebg-preview.png"
                    alt="Barrios A2I"
                    className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    style={{ maxWidth: '180px' }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement
                      target.src = '/logos/barrios-a2i-logo.png'
                    }}
                  />
                </div>

                {/* Text labels - shown on desktop */}
                <div className="hidden lg:block">
                  <div className="text-cyan-400 font-orbitron font-bold text-xl tracking-wider leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    BARRIOS
                  </div>
                  <div className="text-amber-500 font-inter text-xs font-semibold tracking-[0.2em] leading-none mt-1 uppercase opacity-90">
                    A2I SYSTEMS
                  </div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-slate-300 hover:text-cyan-400 font-medium transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-amber-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}

                <div className="flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 text-slate-300 hover:text-cyan-400 font-medium transition-colors"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/qualify/smb"
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-950 font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden border-t border-slate-800 overflow-hidden"
                >
                  <div className="px-6 py-4 space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block text-slate-300 hover:text-cyan-400 font-medium py-2 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <div className="pt-4 space-y-3 border-t border-slate-800">
                      <Link
                        href="/contact"
                        className="block text-center px-6 py-3 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>

                      <Link
                        href="/qualify/smb"
                        className="block text-center px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-950 font-bold rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
