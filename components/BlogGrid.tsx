"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Scaling AI Agents to 10,000+ Concurrent Workers",
    excerpt:
      "Learn how we architected a multi-agent system that handles millions of queries per day with RabbitMQ and horizontal scaling.",
    date: "2025-11-01",
    readTime: "8 min read",
    category: "Architecture",
    slug: "scaling-ai-agents",
  },
  {
    title: "Building Fault-Tolerant AI Orchestration with Circuit Breakers",
    excerpt:
      "Explore patterns for building resilient multi-agent systems that gracefully handle failures and prevent cascading issues.",
    date: "2025-10-28",
    readTime: "6 min read",
    category: "Best Practices",
    slug: "fault-tolerant-orchestration",
  },
  {
    title: "From Monolith to Multi-Agent: A Migration Guide",
    excerpt:
      "A step-by-step guide to migrating your existing AI system to a distributed multi-agent architecture without downtime.",
    date: "2025-10-22",
    readTime: "12 min read",
    category: "Tutorial",
    slug: "monolith-to-multi-agent",
  },
];

export default function BlogGrid() {
  return (
    <section className="relative py-24 bg-[#0B1220]">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
              >
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                    {post.category}
                  </span>
                </div>

                {/* Placeholder Image */}
                <div className="h-48 bg-gradient-to-br from-cyan-400/20 to-amber-500/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white">
                More Articles Coming Soon
              </h3>
              <p className="text-slate-400 max-w-md">
                We publish new technical content every week. Subscribe to our newsletter to stay updated.
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                >
                  Get Notified
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
