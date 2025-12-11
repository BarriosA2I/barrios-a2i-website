"use client"

import { motion } from "framer-motion"
import { Check, Zap, TrendingUp, Sparkles, ShoppingCart, Video, Bot, Settings } from "lucide-react"
import Link from "next/link"

// Website Packages
const websitePackages: Array<{
  name: string
  price: string
  features: string[]
  icon: React.ElementType
  popular: boolean
  color: "cyan" | "gold"
}> = [
  {
    name: "Starter Site",
    price: "$1,500",
    features: ["5 Pages", "Mobile Ready", "Contact Form"],
    icon: Zap,
    popular: false,
    color: "cyan",
  },
  {
    name: "Growth Site",
    price: "$3,500",
    features: ["8-12 Pages", "SEO Setup", "Blog Ready"],
    icon: TrendingUp,
    popular: true,
    color: "gold",
  },
  {
    name: "Lead Gen",
    price: "$5,000",
    features: ["15 Pages", "CRM Hookup", "Ad Landing Page"],
    icon: Sparkles,
    popular: false,
    color: "cyan",
  },
  {
    name: "E-Commerce",
    price: "$4,000",
    features: ["Shopify Setup", "25 Products", "Payments"],
    icon: ShoppingCart,
    popular: false,
    color: "cyan",
  },
]

// Video & Automation Packages
const videoPackages: Array<{
  name: string
  price: string
  unit?: string
  features: string[]
  icon: React.ElementType
  popular?: boolean
  color: "cyan" | "gold"
}> = [
  {
    name: "Local Spot",
    price: "$500",
    unit: "/ vid",
    features: ["20-30 Sec", "AI + Human Edit", "Vertical/Horizontal"],
    icon: Video,
    color: "cyan",
  },
  {
    name: "Smart Bot",
    price: "$199",
    unit: "/ mo",
    features: ["$1k Setup", "RAG Training", "Booking Handoff"],
    icon: Bot,
    popular: true,
    color: "gold",
  },
  {
    name: "Ops Sprint",
    price: "$3,500",
    unit: "",
    features: ["Map Bottlenecks", "Build Workflow", "ROI Report"],
    icon: Settings,
    color: "cyan",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function PricingCard({
  name,
  price,
  unit = "",
  features,
  icon: Icon,
  popular = false,
  color = "cyan",
}: {
  name: string
  price: string
  unit?: string
  features: string[]
  icon: React.ElementType
  popular?: boolean
  color?: "cyan" | "gold"
}) {
  const isCyan = color === "cyan"
  
  return (
    <motion.div
      variants={itemVariants}
      className={`relative glass rounded-2xl p-6 flex flex-col ${
        popular
          ? isCyan
            ? "border-2 border-cyber-cyan border-glow-cyan"
            : "border-2 border-cyber-gold border-glow-gold"
          : ""
      }`}
    >
      {/* Popular Badge */}
      {popular && (
        <div
          className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold rounded-full ${
            isCyan ? "bg-cyber-cyan text-navy-deep" : "bg-cyber-gold text-navy-deep"
          }`}
        >
          POPULAR
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isCyan ? "bg-cyber-cyan/20" : "bg-cyber-gold/20"
          }`}
        >
          <Icon className={`w-5 h-5 ${isCyan ? "text-cyber-cyan" : "text-cyber-gold"}`} />
        </div>
        <h3 className="text-lg font-display font-bold text-white">{name}</h3>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className={`text-3xl font-bold ${isCyan ? "text-cyber-cyan" : "text-cyber-gold"}`}>
          {price}
        </span>
        {unit && <span className="text-slate-400 text-sm ml-1">{unit}</span>}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-slate-300 text-sm">
            <Check className={`w-4 h-4 ${isCyan ? "text-cyber-cyan" : "text-cyber-gold"}`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="#contact"
        className={`block w-full py-3 text-center font-bold rounded-xl transition-all duration-300 ${
          popular
            ? isCyan
              ? "bg-cyber-cyan text-navy-deep hover:shadow-glow-cyan"
              : "bg-cyber-gold text-navy-deep hover:shadow-glow-gold"
            : "border-2 border-white/20 text-white hover:border-white/40"
        }`}
      >
        Book
      </Link>
    </motion.div>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-navy-deep">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
            Straightforward <span className="gradient-text">Pricing</span>
          </h2>
        </motion.div>

        {/* Website Packages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {websitePackages.map((pkg, index) => (
            <PricingCard key={index} {...pkg} />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
          <h3 className="text-xl font-display font-bold text-white">Video & Automation</h3>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyber-gold/30 to-transparent" />
        </div>

        {/* Video & Automation Packages */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          {videoPackages.map((pkg, index) => (
            <PricingCard key={index} {...pkg} />
          ))}
        </motion.div>

        {/* Enterprise CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            Enterprise / Industrial
          </h3>
          <p className="text-slate-400 mb-6">
            RAG Architecture, Multi-Agent Fabrics, and Manufacturing Pilots available.
            Scoped engineering from <span className="text-cyber-gold font-bold">$8,000+</span>.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-cyber-cyan text-navy-deep font-bold rounded-lg hover:shadow-glow-cyan hover:scale-105 transition-all"
          >
            Discuss Enterprise
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
