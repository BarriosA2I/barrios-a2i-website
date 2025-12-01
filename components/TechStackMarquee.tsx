'use client';

import { Zap } from 'lucide-react';

const techStack = [
  "Next.js 15",
  "React 19", 
  "Tailwind v4",
  "TypeScript",
  "OpenAI",
  "Anthropic",
  "n8n",
  "LangChain",
  "Supabase",
  "Stripe",
  "Vercel"
];

export default function TechStackMarquee() {
  // Triple the array for seamless infinite scroll
  const extendedStack = [...techStack, ...techStack, ...techStack];

  return (
    <section className="py-10 border-y border-white/5 bg-black/20 overflow-hidden">
      <div className="flex gap-16 whitespace-nowrap animate-marquee">
        {extendedStack.map((tech, index) => (
          <div 
            key={`${tech}-${index}`}
            className="flex items-center gap-2 text-gray-500 font-mono text-sm font-bold uppercase tracking-widest px-8"
          >
            <Zap className="w-3 h-3 text-neon-gold" />
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}
