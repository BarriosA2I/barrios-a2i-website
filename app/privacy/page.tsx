import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Barrios A2I',
  description: 'Privacy policy for Barrios A2I services. Learn how we collect, use, and protect your data.',
  openGraph: {
    title: 'Privacy Policy | Barrios A2I',
    description: 'Learn how we handle and protect your data.',
    url: 'https://barrios-a2i-website.vercel.app/privacy',
  },
}

export default function PrivacyPage() {
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
                  Privacy Policy
                </h1>
                <p className="text-slate-400">
                  Last updated: November 6, 2025
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-cyan max-w-none">
                <div className="space-y-8 text-slate-300">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                    <p className="leading-relaxed mb-4">
                      At Barrios A2I, we collect information that you provide directly to us when using our AI orchestration platform and services. This includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Account information (name, email, company details)</li>
                      <li>Usage data and analytics</li>
                      <li>API usage and query logs</li>
                      <li>Technical information (IP address, browser type, device information)</li>
                      <li>Communication preferences and support inquiries</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                    <p className="leading-relaxed mb-4">
                      We use the collected information for the following purposes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Process transactions and send related information</li>
                      <li>Send technical notices, updates, and security alerts</li>
                      <li>Respond to customer support requests</li>
                      <li>Monitor and analyze usage patterns and trends</li>
                      <li>Detect, prevent, and address technical issues</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                    <p className="leading-relaxed mb-4">
                      We implement industry-standard security measures to protect your data:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>End-to-end encryption for data in transit</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>SOC 2 Type II compliance</li>
                      <li>Role-based access controls (RBAC)</li>
                      <li>Multi-factor authentication (MFA) for all accounts</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
                    <p className="leading-relaxed">
                      We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. When you close your account, we will delete or anonymize your data within 90 days, except where we are required to retain it for legal compliance.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                    <p className="leading-relaxed mb-4">
                      We may share your information with third-party service providers who assist us in operating our platform, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Cloud infrastructure providers (AWS, Google Cloud)</li>
                      <li>Analytics services</li>
                      <li>Payment processors</li>
                      <li>Customer support platforms</li>
                    </ul>
                    <p className="leading-relaxed mt-4">
                      All third-party providers are contractually obligated to maintain the confidentiality and security of your information.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                    <p className="leading-relaxed mb-4">
                      You have the following rights regarding your personal data:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Access and receive a copy of your data</li>
                      <li>Correct inaccurate or incomplete data</li>
                      <li>Request deletion of your data</li>
                      <li>Object to or restrict processing of your data</li>
                      <li>Data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">7. GDPR & CCPA Compliance</h2>
                    <p className="leading-relaxed">
                      Barrios A2I is committed to compliance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). We respect your privacy rights and provide mechanisms to exercise those rights through our platform or by contacting us directly.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                    <p className="leading-relaxed">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
                      <p className="leading-relaxed">
                        <strong className="text-white">Email:</strong> privacy@barriosa2i.com<br />
                        <strong className="text-white">Address:</strong> Barrios A2I Systems<br />
                        <strong className="text-white">Data Protection Officer:</strong> dpo@barriosa2i.com
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
