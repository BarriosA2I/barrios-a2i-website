"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const positions = [
  {
    title: "Senior Backend Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Engineering",
    description:
      "Build scalable distributed systems for multi-agent AI orchestration. Work with RabbitMQ, Redis, Qdrant, and modern cloud infrastructure.",
  },
  {
    title: "AI/ML Research Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Research",
    description:
      "Research and implement novel agent coordination patterns. Explore new frontiers in multi-agent communication and optimization.",
  },
  {
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    department: "Infrastructure",
    description:
      "Build and maintain our Kubernetes infrastructure. Implement observability with Jaeger, Prometheus, and Grafana.",
  },
];

export default function CareersPositions() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0B1220] to-[#0E1626]">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Open Positions
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We&apos;re actively hiring across engineering, research, and product.
            </p>
          </motion.div>

          {/* Positions List */}
          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Title & Department */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {position.title}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                        {position.department}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 leading-relaxed mb-4">
                      {position.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{position.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all whitespace-nowrap"
                    >
                      Apply Now
                      <ArrowRight size={18} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* General Application CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white">
                Don&apos;t See a Perfect Fit?
              </h3>
              <p className="text-slate-400 max-w-md">
                We&apos;re always looking for exceptional talent. Send us your resume and let&apos;s talk.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
