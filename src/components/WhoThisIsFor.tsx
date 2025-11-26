"use client";
import { motion } from "framer-motion";
import { Building2, Store, Briefcase } from "lucide-react";

const audience = [
  {
    icon: Store,
    title: "Local Businesses",
    description: "Restaurants, salons, gyms, contractors. Need more customers walking through the door."
  },
  {
    icon: Building2,
    title: "Service Companies",
    description: "HVAC, plumbing, landscaping. Tired of being booked out but still broke."
  },
  {
    icon: Briefcase,
    title: "Consultants & Agencies",
    description: "Selling expertise but your site looks like a Squarespace template from 2016."
  }
];

export function WhoThisIsFor() {
  return (
    <section className="py-24 bg-[#0B1220]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Who This Is For</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {audience.map((aud, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C2FF]/20 to-[#F59E0B]/20 border border-[#00C2FF]/30 flex items-center justify-center mx-auto mb-6">
                <aud.icon className="w-8 h-8 text-[#00C2FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{aud.title}</h3>
              <p className="text-slate-400">{aud.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
