"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MessageSquare, Calendar, ArrowRight, Send, Building, User, Briefcase, Bot } from "lucide-react"
import Link from "next/link"
import { Nav } from "@/components/Nav"
import { Footer } from "@/components/Footer"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    action: "hello@barriosa2i.com",
    href: "mailto:hello@barriosa2i.com",
    color: "cyan"
  },
  {
    icon: Calendar,
    title: "Book a Call",
    description: "Schedule a 30-min discovery call",
    action: "Schedule Now",
    href: "https://calendly.com/barriosa2i",
    color: "gold"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Talk to our AI assistant 24/7",
    action: "Start Chat",
    href: "#chat",
    color: "cyan"
  }
]

const services = [
  "AI-Powered Websites",
  "RAG Architecture",
  "Multi-Agent Systems",
  "Automation Workflows",
  "Video Production",
  "Enterprise Solutions",
  "Other"
]

const agentCounts = [
  "1-3 Agents",
  "4-10 Agents",
  "10-50 Agents",
  "50+ Agents",
  "Not Sure Yet"
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    service: "",
    agentCount: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-navy-deep">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Let&apos;s Build <span className="gradient-text">Together</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Ready to automate your operations? Tell us about your project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-6 pb-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              const isCyan = method.color === "cyan"

              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-2xl p-6 hover:border-cyber-cyan/30 transition-all group text-center"
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                      isCyan ? "bg-cyber-cyan/20" : "bg-cyber-gold/20"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        isCyan ? "text-cyber-cyan" : "text-cyber-gold"
                      }`}
                    />
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    {method.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4">
                    {method.description}
                  </p>

                  <span
                    className={`inline-flex items-center gap-1 font-medium ${
                      isCyan ? "text-cyber-cyan" : "text-cyber-gold"
                    }`}
                  >
                    {method.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-8 lg:p-12"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Tell Us About Your Project
            </h2>
            <p className="text-slate-400 mb-8">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan/50"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Company & Role Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <Building className="w-4 h-4" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan/50"
                    placeholder="Acme Inc"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <Briefcase className="w-4 h-4" />
                    Your Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan/50"
                    placeholder="CTO, Marketing Director, etc."
                  />
                </div>
              </div>

              {/* Service & Agents Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyber-cyan/50 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-navy-deep">Select a service...</option>
                    {services.map(service => (
                      <option key={service} value={service} className="bg-navy-deep">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <Bot className="w-4 h-4" />
                    Expected Agent Count
                  </label>
                  <select
                    name="agentCount"
                    value={formData.agentCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyber-cyan/50 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-navy-deep">Select agent count...</option>
                    {agentCounts.map(count => (
                      <option key={count} value={count} className="bg-navy-deep">
                        {count}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Tell Us More
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan/50 resize-none"
                  placeholder="Describe your project, challenges, and goals..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyber-cyan text-navy-deep font-bold rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Alternative CTA */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-slate-400 mb-4">
              Prefer to talk directly?
            </p>
            <Link
              href="https://calendly.com/barriosa2i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyber-cyan font-medium hover:underline"
            >
              <Calendar className="w-5 h-5" />
              Schedule a 30-minute discovery call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
