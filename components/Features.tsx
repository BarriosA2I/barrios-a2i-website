"use client";

import { motion } from "framer-motion";
import { Shield, Activity, TrendingUp } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "Reliability First",
      description:
        "Circuit breakers, retries, and dead letter queues ensure your agents never cascade failures across your system.",
      color: "cyan",
    },
    {
      icon: Activity,
      title: "Full Visibility",
      description:
        "OpenTelemetry traces every agent interaction. Jaeger UI shows exactly where time and tokens are spent.",
      color: "amber",
    },
    {
      icon: TrendingUp,
      title: "Scale on Demand",
      description:
        "Horizontal scaling with RabbitMQ queues. Add agent workers as needed without touching your core application.",
      color: "cyan",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]"
    >
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-100 mb-6">
            Why Barrios A2I
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-amber-400 via-cyan-400 to-cyan-300 bg-clip-text text-transparent">
              Production
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Not just another agent framework. A full orchestration platform for distributed
            AI systems.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const iconColor = feature.color === "cyan" ? "text-cyan-400" : "text-amber-400";
            const borderColor =
              feature.color === "cyan" ? "border-cyan-400/20" : "border-amber-400/20";
            const hoverShadow =
              feature.color === "cyan"
                ? "hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                : "hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative group p-8 rounded-2xl border ${borderColor} bg-white/5 backdrop-blur-sm ${hoverShadow} transition-all duration-300 hover:-translate-y-2`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                    feature.color === "cyan" ? "bg-cyan-400/10" : "bg-amber-400/10"
                  } group-hover:scale-110 transition-transform`}
                >
                  <Icon size={28} className={iconColor} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>

                {/* Hover border glow */}
                <div
                  className={`absolute inset-0 rounded-2xl border ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
