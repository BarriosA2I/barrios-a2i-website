"use client";

import type { Metadata } from 'next'; // Using type import for Metadata
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Github, Zap, Code2 } from 'lucide-react';
import { useState } from 'react';

// Metadata for the Contact page
export const metadata: Metadata = {
  title: 'Barrios A2I | Get in Touch',
  description: 'Contact Barrios A2I for enterprise-grade AI orchestration and multi-agent systems. Schedule a demo or reach out with your inquiries.',
  openGraph: {
    title: 'Barrios A2I | Get in Touch',
    description: 'Contact Barrios A2I for enterprise-grade AI orchestration and multi-agent systems.',
    url: 'https://barrios-a2i-website.vercel.app/contact',
    images: [
      {
        url: 'https://barrios-a2i-website.vercel.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // In a real application, you'd send this to an API endpoint
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({ name: '', email: '', company: '', message: '' }); // Clear form
  };

  return (
    <div className="relative bg-[var(--ink)] overflow-hidden">
      <Navigation />

      <main>
        {/* Contact Hero Section - Reusing Hero styles */}
        <section className="relative min-h-[calc(100vh-120px)] flex items-center justify-center pt-20 pb-12 overflow-hidden bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
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
                Get in{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-amber-400 bg-clip-text text-transparent">
                  Touch
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
              >
                Have questions about scaling your AI agents, multi-agent orchestration, or enterprise deployments? We're here to help.
              </motion.p>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1220] to-transparent pointer-events-none" />
        </section>

        {/* Contact Form and Details Section */}
        <section className="relative py-20 bg-[var(--ink)] z-20">
          <div className="container mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className="bg-[#0E1626] p-8 md:p-12 rounded-xl shadow-2xl border border-white/10"
              >
                <h2 className="text-3xl font-bold text-white mb-8">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors resize-y"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all w-full justify-center"
                  >
                    Send Message
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Information & CTAs */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-12"
              >
                {/* Contact Methods */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-8">Reach us directly</h2>
                  <div className="space-y-6 text-slate-300">
                    <div className="flex items-start gap-4">
                      <Mail size={24} className="text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white text-lg">Email Us</h3>
                        <p className="text-slate-400">Our team is available to answer your questions.</p>
                        <a href="mailto:info@barrios-a2i.com" className="text-cyan-300 hover:text-cyan-400 transition-colors">info@barrios-a2i.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone size={24} className="text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white text-lg">Call Us</h3>
                        <p className="text-slate-400">Speak to an expert about your AI orchestration needs.</p>
                        <a href="tel:+1-555-123-4567" className="text-cyan-300 hover:text-cyan-400 transition-colors">+1 (555) 123-4567</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin size={24} className="text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white text-lg">Our Location</h3>
                        <p className="text-slate-400">Headquarters in Silicon Valley.</p>
                        <address className="not-italic text-cyan-300">
                          123 AI Boulevard<br />
                          Suite 400<br />
                          Menlo Park, CA 94025
                        </address>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Connect with us</h3>
                  <div className="flex gap-6">
                    <Link href="https://linkedin.com/company/barrios-a2i" target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Linkedin size={32} className="text-slate-400 hover:text-cyan-400 transition-colors" />
                      </motion.div>
                    </Link>
                    <Link href="https://twitter.com/barrios-a2i" target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Twitter size={32} className="text-slate-400 hover:text-cyan-400 transition-colors" />
                      </motion.div>
                    </Link>
                    <Link href="https://github.com/barrios-a2i" target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Github size={32} className="text-slate-400 hover:text-cyan-400 transition-colors" />
                      </motion.div>
                    </Link>
                  </div>
                </div>

                {/* Book a Demo CTA */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-white mb-6">Ready to see Barrios A2I in action?</h3>
                  <Link href="/contact"> {/* Link to current page, or a specific demo page if it existed */}
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
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}