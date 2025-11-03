'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      label: 'Solutions',
      dropdown: [
        { label: 'SMB Automation', href: '/solutions/smb', icon: '⚡' },
        { label: 'AI Infrastructure', href: '/solutions/enterprise', icon: '🏗️' },
        { label: 'Multi-Agent Systems', href: '/solutions/agents', icon: '🤖' },
      ],
    },
    { label: 'Products', href: '/products' },
    { label: 'Case Studies', href: '/case-studies' },
    {
      label: 'Resources',
      dropdown: [
        { label: 'Blog', href: '/blog', icon: '📝' },
        { label: 'Documentation', href: '/docs', icon: '📚' },
        { label: 'Guides', href: '/guides', icon: '🗺️' },
      ],
    },
    { label: 'Pricing', href: '/pricing' },
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
              <Link href="/" className="flex items-center gap-3 group">
                {/* NEW LOGO - NO BACKGROUND */}
                <div className="relative h-16 w-16">
                  <img
                    src="/logos/ChatGPT Image Oct 31, 2025, 10_32_50 AM.png"
                    alt="Barrios A2I"
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(0, 217, 255, 0.6))',
                    }}
                  />
                </div>

                <div className="hidden sm:block">
                  <div className="text-cyan-400 font-orbitron font-bold text-2xl tracking-wide leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                    BARRIOS
                  </div>
                  <div className="text-amber-500 font-inter text-xs font-semibold tracking-[0.2em] leading-none mt-1.5 uppercase opacity-90">
                    A2I SYSTEMS
                  </div>
                </div>
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-cyan-400 font-medium transition-colors duration-300 relative group"
                      >
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-amber-500 group-hover:w-full transition-all duration-300" />
                      </Link>
                    ) : (
                      <button className="text-slate-300 hover:text-cyan-400 font-medium transition-colors duration-300 flex items-center gap-1 group">
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${
                            activeDropdown === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}

                    <AnimatePresence>
                      {link.dropdown && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,217,255,0.2)]"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-cyan-400/10 transition-colors border-b border-slate-800 last:border-0"
                            >
                              <span className="text-2xl">{item.icon}</span>
                              <span className="text-slate-300 hover:text-cyan-400 transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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
                      <div key={link.label}>
                        {link.href ? (
                          <Link
                            href={link.href}
                            className="block text-slate-300 hover:text-cyan-400 font-medium py-2 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                setActiveDropdown(
                                  activeDropdown === link.label ? null : link.label
                                )
                              }
                              className="flex items-center justify-between w-full text-slate-300 hover:text-cyan-400 font-medium py-2 transition-colors"
                            >
                              {link.label}
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-300 ${
                                  activeDropdown === link.label ? 'rotate-180' : ''
                                }`}
                              />
                            </button>

                            {activeDropdown === link.label && link.dropdown && (
                              <div className="pl-4 mt-2 space-y-2">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 py-2 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
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
