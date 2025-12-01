'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-blue-950/20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 blur-[120px] rounded-full"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 relative z-10 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          Ready to <span className="text-outline">Innovate?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Stop letting legacy systems alienate your potential. Let&apos;s architect the future.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="mailto:contact@barriosa2i.com" 
            className="px-10 py-5 bg-white text-navy-950 font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Schedule Discovery
          </a>
          <a 
            href="#" 
            className="px-10 py-5 border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors backdrop-blur-sm"
          >
            View Documentation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
