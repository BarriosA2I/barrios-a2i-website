"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Gary Barrios",
    role: "Founder & CEO",
    bio: "Former AI architect at Fortune 500 companies. Passionate about making AI orchestration accessible.",
    image: "/team/placeholder-1.jpg",
    social: {
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export default function AboutTeam() {
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
              Meet the Team
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              We&apos;re a distributed team of engineers and researchers united by a passion for AI.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
              >
                {/* Placeholder Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={member.social.github}
                      className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-400/20 hover:text-cyan-400 text-slate-400 transition-all"
                    >
                      <Github size={16} />
                    </Link>
                    <Link
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-400/20 hover:text-cyan-400 text-slate-400 transition-all"
                    >
                      <Linkedin size={16} />
                    </Link>
                    <Link
                      href={member.social.twitter}
                      className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-400/20 hover:text-cyan-400 text-slate-400 transition-all"
                    >
                      <Twitter size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Join CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white">
                Want to Join Us?
              </h3>
              <p className="text-slate-400 max-w-md">
                We&apos;re always looking for talented engineers and researchers passionate about AI.
              </p>
              <Link href="/careers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all"
                >
                  View Open Positions
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
