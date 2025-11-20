/**
 * CTASection Component - Barrios A2I
 *
 * Contact section with service selector buttons
 * Final conversion point with form submission
 */

'use client'

import React, { useState } from 'react'
import { Video, Brain, Globe, Smartphone, ArrowRight, CheckCircle } from 'lucide-react'

export default function CTASection() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const services = [
    { id: 'commercial', icon: Video, label: 'Business Commercial', color: 'cyan' },
    { id: 'rag', icon: Brain, label: 'RAG Agent System', color: 'amber' },
    { id: 'website', icon: Globe, label: 'Premium Website', color: 'cyan' },
    { id: 'app', icon: Smartphone, label: 'Mobile/Web App', color: 'amber' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with backend API or Resend email service
    setFormSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-[#0B1220]">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-400/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <span className="text-cyan-400 font-medium text-sm uppercase tracking-wider">Get Started</span>
          </div>

          <h2 className="font-space text-5xl font-bold text-slate-50 mb-6">
            Let's Build <span className="bg-gradient-to-r from-cyan-400 to-amber-500 bg-clip-text text-transparent">Something Great</span>
          </h2>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Book a 30-min discovery call. We&apos;ll scope your project, provide instant pricing, and outline delivery timelines.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 bg-slate-900/50 backdrop-blur border border-cyan-400/30 rounded-2xl hover:shadow-[0_20px_60px_rgba(0,217,255,0.3)] transition-all duration-300">
            {formSubmitted ? (
              // Success State
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-cyan-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} className="text-cyan-400" />
                </div>
                <h3 className="text-3xl font-space font-bold text-slate-50 mb-4">
                  Thank You!
                </h3>
                <p className="text-slate-300 text-lg mb-6">
                  We&apos;ll review your request and get back to you within 4 hours during business hours.
                </p>
                <p className="text-slate-400 text-sm">
                  Check your email for a confirmation message.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                >
                  Submit another request →
                </button>
              </div>
            ) : (
              // Form State
              <form onSubmit={handleSubmit}>
                {/* Service Selector */}
                <div className="mb-8">
                  <label className="block text-slate-200 font-medium mb-4 text-lg">
                    Which service are you interested in?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service) => {
                      const Icon = service.icon
                      const isSelected = selectedService === service.id
                      const isAmber = service.color === 'amber'
                      const borderColor = isAmber ? 'border-amber-500/30' : 'border-cyan-400/30'
                      const selectedBorder = isAmber ? 'border-amber-500' : 'border-cyan-400'
                      const iconBg = isAmber ? 'bg-amber-500/10' : 'bg-cyan-400/10'
                      const iconColor = isAmber ? 'text-amber-500' : 'text-cyan-400'

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setSelectedService(service.id)}
                          className={`p-4 bg-slate-900/50 border ${isSelected ? selectedBorder + ' border-2' : borderColor} rounded-lg hover:scale-105 transition-all duration-300 text-center`}
                        >
                          <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                            <Icon size={24} className={iconColor} />
                          </div>
                          <span className="text-slate-200 text-sm font-medium block">
                            {service.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-slate-200 font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-slate-200 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="company" className="block text-slate-200 font-medium mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-slate-200 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div className="mb-6">
                  <label htmlFor="details" className="block text-slate-200 font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="details"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  />
                </div>

                {/* Budget Range */}
                <div className="mb-8">
                  <label htmlFor="budget" className="block text-slate-200 font-medium mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k+">$50,000+</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedService}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Book Discovery Call
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <p className="text-slate-500 text-xs text-center mt-4">
                  By submitting this form, you agree to receive communications from Barrios A2I.
                  We respect your privacy and never share your information.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">4-Hour</div>
            <div className="text-sm text-slate-400">Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-400 mb-2">100%</div>
            <div className="text-sm text-slate-400">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400 mb-2">30-Day</div>
            <div className="text-sm text-slate-400">Support Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  )
}
