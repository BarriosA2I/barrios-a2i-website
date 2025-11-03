"use client";

import ContactForm from "./ContactForm";
import ParticleParallax from "./ParticleParallax";

export default function ContactSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220] min-h-screen">
      {/* Interactive parallax background */}
      <ParticleParallax />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 lg:flex-row lg:items-stretch lg:gap-10">
        {/* LEFT: Form Section */}
        <div className="flex-1">
          <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100">
            ✨ Contact Barrios A2I
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            See Barrios A2I Handle{" "}
            <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Your Agent Load
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-slate-300 leading-relaxed">
            We&apos;ll map your current system, identify scaling bottlenecks, and show exactly
            how Barrios A2I eliminates them. 30 minutes, no sales pitch.
          </p>

          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        {/* RIGHT: Info Card */}
        <div className="w-full max-w-md lg:w-96">
          <div className="relative h-full overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-white/5 to-white/0 p-8 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,194,255,0.12)]">
            {/* Badge */}
            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100 uppercase tracking-widest">
              Production-Ready
            </div>

            {/* Title */}
            <h2 className="mt-4 text-2xl font-bold text-white">
              AI Orchestration Platform
            </h2>

            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Event-driven, fault-tolerant multi-agent orchestration with
              OpenTelemetry, RabbitMQ, Redis, and LangGraph.
            </p>

            {/* Social Proof Stats */}
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Enterprise Deployments</span>
                <span className="font-semibold text-cyan-300">10+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">ARR Orchestrated</span>
                <span className="font-semibold text-cyan-300">$100M+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Avg Deployment</span>
                <span className="font-semibold text-amber-400">18 days</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <div>
                <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Email</p>
                <a
                  href="mailto:alienation2innovation@gmail.com"
                  className="text-white hover:text-cyan-300 transition-colors break-all text-sm"
                >
                  alienation2innovation@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Phone</p>
                <a
                  href="tel:+13049191193"
                  className="text-white hover:text-cyan-300 transition-colors text-sm"
                >
                  +1 (304) 919-1193
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Response Time</p>
                <p className="text-white text-sm">Under 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
