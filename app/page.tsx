import { Hero } from '@/src/components/Hero'
import { ProblemsISolve } from '@/src/components/ProblemsISolve'
import { WhoThisIsFor } from '@/src/components/WhoThisIsFor'
import { HowItWorks } from '@/src/components/HowItWorks'
import { Pricing } from '@/src/components/Pricing'
import { CTA } from '@/src/components/CTA'
import { SeoBlurb } from '@/src/components/SeoBlurb'
import { StatusToaster } from '@/src/components/StatusToaster'

export default function HomePage() {
  return (
    <div className="relative">
      <SeoBlurb />
      <StatusToaster />
      <Hero />
      <ProblemsISolve />
      <WhoThisIsFor />
      <HowItWorks />
      <Pricing />
      <CTA />
    </div>
  )
}
