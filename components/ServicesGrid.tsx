'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Layers, Palette, Gauge, Database, Workflow } from 'lucide-react';

const services = [
  { 
    title: "AI Orchestration", 
    desc: "Custom RAG agents and autonomous workflows built on n8n.", 
    icon: Bot 
  },
  { 
    title: "Full-Stack Architecture", 
    desc: "Production-grade Next.js 15 & React 19 applications.", 
    icon: Layers 
  },
  { 
    title: "UI/UX Design", 
    desc: "Futuristic, high-conversion interfaces with glassmorphism.", 
    icon: Palette 
  },
  { 
    title: "Performance Engineering", 
    desc: "Core Web Vitals optimization and lazy-loading strategies.", 
    icon: Gauge 
  },
  { 
    title: "Database Design", 
    desc: "Scalable schema design using Supabase and PostgreSQL.", 
    icon: Database 
  },
  { 
    title: "Automation Strategy", 
    desc: "Replacing manual legacy processes with intelligent scripts.", 
    icon: Workflow 
  },
];

export default function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = gridRef.current?.querySelectorAll('.glass-card');
      cards?.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="capabilities" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="text-gradient-cyber">Scale.</span>
          </h2>
          <div className="h-1 w-20 bg-neon-gold rounded-full"></div>
        </motion.div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="spotlight-overlay"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center mb-6 text-neon-cyan group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-neon-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
