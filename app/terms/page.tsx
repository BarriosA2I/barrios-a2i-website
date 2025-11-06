import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Barrios A2I',
  description: 'Terms of Service for Barrios A2I platform. Review our user agreement and service terms.',
  openGraph: {
    title: 'Terms of Service | Barrios A2I',
    description: 'Review our terms of service and user agreement.',
    url: 'https://barrios-a2i-website.vercel.app/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="relative bg-[#0B1220]">
      <Navigation />

      <main className="min-h-screen">
        <section className="relative pt-32 pb-20 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Terms of Service
                </h1>
                <p className="text-slate-400">
                  Last updated: November 6, 2025
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-cyan max-w-none">
                <div className="space-y-8 text-slate-300">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                    <p className="leading-relaxed">
                      By accessing or using Barrios A2I&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. These terms apply to all users, including enterprises, developers, and individual users.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
                    <p className="leading-relaxed mb-4">
                      Barrios A2I provides an AI orchestration platform for distributed multi-agent systems. Our services include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Multi-agent orchestration and coordination</li>
                      <li>Event-driven architecture with RabbitMQ</li>
                      <li>Vector database integration (Qdrant)</li>
                      <li>Distributed tracing and observability</li>
                      <li>API access and SDK tools</li>
                      <li>Technical support and documentation</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Account Registration</h2>
                    <p className="leading-relaxed mb-4">
                      To use our services, you must:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide accurate and complete registration information</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Notify us immediately of any unauthorized access</li>
                      <li>Be at least 18 years old or have legal capacity to enter contracts</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use Policy</h2>
                    <p className="leading-relaxed mb-4">
                      You agree NOT to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Use our services for illegal activities</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Interfere with or disrupt our services</li>
                      <li>Reverse engineer or decompile our software</li>
                      <li>Resell or redistribute our services without authorization</li>
                      <li>Use our services to develop competing products</li>
                      <li>Violate intellectual property rights</li>
                      <li>Transmit malware, viruses, or harmful code</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Billing and Payment</h2>
                    <p className="leading-relaxed mb-4">
                      For paid services:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Fees are billed in advance on a monthly or annual basis</li>
                      <li>All fees are non-refundable unless otherwise stated</li>
                      <li>You are responsible for all taxes</li>
                      <li>We may change pricing with 30 days notice</li>
                      <li>Late payments may result in service suspension</li>
                      <li>Usage exceeding plan limits will be billed at overage rates</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">6. Intellectual Property</h2>
                    <p className="leading-relaxed mb-4">
                      <strong className="text-white">Barrios A2I IP:</strong> All software, documentation, trademarks, and content provided by Barrios A2I remain our exclusive property. We grant you a limited, non-exclusive, non-transferable license to use our services.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-white">Your IP:</strong> You retain all rights to your data, models, and content. By using our services, you grant us a license to host, process, and transmit your content solely to provide our services.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">7. Service Level Agreement</h2>
                    <p className="leading-relaxed">
                      Our SLA commitments, uptime guarantees, and support response times are detailed in our separate <a href="/sla" className="text-cyan-400 hover:text-cyan-300 underline">Service Level Agreement</a>. Enterprise customers may negotiate custom SLAs.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
                    <p className="leading-relaxed">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, BARRIOS A2I SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, REVENUE, OR DATA. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">9. Termination</h2>
                    <p className="leading-relaxed mb-4">
                      Either party may terminate this agreement:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>You may cancel your account at any time</li>
                      <li>We may suspend or terminate for violation of these terms</li>
                      <li>We may terminate with 30 days notice for any reason</li>
                      <li>Upon termination, you must cease using our services</li>
                      <li>We will provide a data export period of 30 days</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">10. Modifications to Terms</h2>
                    <p className="leading-relaxed">
                      We may modify these terms at any time. We will notify you of material changes via email or platform notification at least 30 days before they take effect. Continued use of our services after changes constitutes acceptance.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
                    <p className="leading-relaxed">
                      These terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
                    <p className="leading-relaxed">
                      For questions about these Terms of Service:
                    </p>
                    <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
                      <p className="leading-relaxed">
                        <strong className="text-white">Email:</strong> legal@barriosa2i.com<br />
                        <strong className="text-white">Support:</strong> support@barriosa2i.com<br />
                        <strong className="text-white">Website:</strong> https://barriosa2i.com
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
