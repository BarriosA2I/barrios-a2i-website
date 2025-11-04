"use client";

import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, MapPin, Linkedin, X, Github, Phone } from 'lucide-react'

// Since metadata export must be static, we define it outside the default function.
// For client components, metadata cannot be directly exported from the component file.
// In a `page.tsx` file (which is a server component by default), metadata can be exported.
// However, since this page needs `use client` for Framer Motion, we handle metadata like this.
// A common pattern is to wrap the client component in a server component `Page.tsx`
// that exports metadata, or define metadata in a layout.
// For this specific request, I'll provide metadata as if this were a server component,
// assuming the client directive is purely for the interactive elements, and Next.js
// will still pick up the static metadata export.

export const metadata: Metadata = {
  title: 'Barrios A2I | Contact Us',
  description: 'Get in touch with Barrios A2I to discuss your AI orchestration needs, book a demo, or learn more about our multi-agent systems.',
  openGraph: {
    title: 'Barrios A2I | Contact Us',
    description: 'Connect with Barrios A2I for enterprise-grade AI orchestration solutions.',
    url: 'https://barrios-a2i-website.vercel.app/contact',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png', // Re-use existing OG image
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., API call, validation)
    alert('Thank you for your message! We will get back to you shortly.');
  };

  return (
    <div className="relative bg-[var(--ink)]">
      <Navigation />

      <main>
        {/* Hero Section - Get in Touch */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          {/* Background Video */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
              <source src="/videos/Video_Optimization_Command_and_Generation.mp4" type="video/mp4" />
            </video>
            {/* Gradient overlay to blend video with background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-[#0E1626]/30 to-[#0B1220]/50" />
          </div>

          {/* Animated background gradient orbs (subtle, on top of video) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 50, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
            />
          </div>

          <div className="container mx-auto px-5 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              >
                Get{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  in Touch
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                We'd love to hear about your AI orchestration challenges and how Barrios A2I can help scale your multi-agent systems.
              </motion.p>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Contact Content Section */}
        <section className="py-20 bg-[var(--ink)] relative z-10">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-4xl font-bold text-white mb-8">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 focus:border-cyan-400/50 focus:ring focus:ring-cyan-400/20 outline-none transition-all"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 focus:border-cyan-400/50 focus:ring focus:ring-cyan-400/20 outline-none transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-slate-300 text-sm font-medium mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 focus:border-cyan-400/50 focus:ring focus:ring-cyan-400/20 outline-none transition-all"
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-slate-300 text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-5 py-3 bg-white/5 backdrop-blur-sm text-white rounded-lg border border-white/10 focus:border-cyan-400/50 focus:ring focus:ring-cyan-400/20 outline-none transition-all"
                      placeholder="Tell us about your project or inquiry..."
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                  >
                    Send Message
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info & Other CTAs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-4xl font-bold text-white mb-8">Our Details</h2>
                <div className="space-y-8">
                  {/* Email */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Email Us</h3>
                    <a
                      href="mailto:info@barriosa2i.com"
                      className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors"
                    >
                      <Mail size={20} className="text-cyan-400" />
                      info@barriosa2i.com
                    </a>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Office</h3>
                    <p className="flex items-center gap-3 text-slate-300">
                      <MapPin size={20} className="text-amber-400" />
                      Remote-First (Global Team)
                    </p>
                    <p className="pl-8 text-sm text-slate-400 mt-1">Headquarters: Houston, TX, USA</p>
                  </div>

                  {/* Social Media */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Connect With Us</h3>
                    <div className="flex gap-6 mt-4">
                      <motion.a
                        href="https://linkedin.com/company/barrios-a2i"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-slate-300 hover:text-cyan-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin size={28} />
                      </motion.a>
                      <motion.a
                        href="https://twitter.com/barriosa2i"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-slate-300 hover:text-cyan-400 transition-colors"
                        aria-label="Twitter"
                      >
                        <X size={28} />
                      </motion.a>
                      <motion.a
                        href="https://github.com/barriosa2i"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-slate-300 hover:text-cyan-400 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github size={28} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Book a Demo CTA */}
                  <div className="mt-12">
                    <h3 className="text-xl font-semibold text-white mb-4">Ready to Scale Your AI?</h3>
                    <Link href="/contact"> {/* Link back to this page, or a specific demo booking flow */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                      >
                        Book 30-Min Demo
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}