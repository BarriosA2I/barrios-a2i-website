import { Particles } from "@/components/Particles"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Problems } from "@/components/Problems"
import NeuralCoreDemo from "@/components/NeuralCoreDemo"
import { Audience } from "@/components/Audience"
import { Process } from "@/components/Process"
import { Pricing } from "@/components/Pricing"
import { CTA } from "@/components/CTA"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a1e] overflow-x-hidden">
      {/* Layer 1: Animated Particles Background */}
      <Particles />

      {/* Layer 2: Static Gradient Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left cyan glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#00C2FF] opacity-[0.08] blur-[150px] rounded-full" />
        {/* Bottom-right gold glow */}
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#F59E0B] opacity-[0.05] blur-[150px] rounded-full" />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C2FF] opacity-[0.03] blur-[200px] rounded-full" />
      </div>

      {/* Layer 3: Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 194, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 194, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Layer 4: Content (Z-10 to sit above visual layers) */}
      <div className="relative z-10">
        <Nav />
        
        <main className="flex flex-col">
          <Hero />
          <Problems />
          <NeuralCoreDemo />
          <Audience />
          <Process />
          <Pricing />
          <CTA />
        </main>

        <Footer />
      </div>
    </div>
  )
}
