import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Shield, Lock, Eye, CheckCircle2, AlertTriangle, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security | Barrios A2I',
  description: 'Security practices, compliance certifications, and data protection measures at Barrios A2I.',
  openGraph: {
    title: 'Security | Barrios A2I',
    description: 'Enterprise-grade security for AI orchestration.',
    url: 'https://barrios-a2i-website.vercel.app/security',
  },
}

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'AES-256 encryption for data at rest and TLS 1.3 for data in transit.',
    },
    {
      icon: Shield,
      title: 'SOC 2 Type II Certified',
      description: 'Independently audited security controls and compliance frameworks.',
    },
    {
      icon: Eye,
      title: 'Continuous Monitoring',
      description: '24/7 security monitoring with automated threat detection and response.',
    },
    {
      icon: CheckCircle2,
      title: 'Regular Audits',
      description: 'Quarterly penetration testing and annual third-party security audits.',
    },
    {
      icon: AlertTriangle,
      title: 'Incident Response',
      description: 'Dedicated security team with sub-60-minute incident response time.',
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      description: 'Multi-region redundancy with automated failover and DDoS protection.',
    },
  ]

  return (
    <div className="relative bg-[#0B1220]">
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#0B1220] via-[#0E1626] to-[#0B1220]">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-medium text-cyan-100 mb-8">
                <Shield size={14} className="text-cyan-400" />
                Enterprise Security
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Security & Compliance
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                Barrios A2I is built with enterprise-grade security from the ground up. We protect your data with industry-leading encryption, compliance certifications, and security practices.
              </p>
            </div>

            {/* Security Features Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {securityFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Detailed Security Information */}
        <section className="relative py-12 bg-[#0B1220]">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
                  <p className="leading-relaxed mb-4">
                    Your data security is our top priority. We implement multiple layers of protection:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>AES-256 encryption for all data at rest</li>
                    <li>TLS 1.3 for all data in transit</li>
                    <li>Zero-knowledge encryption options for sensitive workloads</li>
                    <li>Encrypted backups with 30-day retention</li>
                    <li>Secure key management with hardware security modules (HSM)</li>
                    <li>Data residency options in US, EU, and APAC regions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Compliance Certifications</h2>
                  <p className="leading-relaxed mb-4">
                    Barrios A2I maintains compliance with industry standards:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">SOC 2 Type II</h4>
                      <p className="text-sm">Audited security, availability, and confidentiality controls</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">GDPR Compliant</h4>
                      <p className="text-sm">Full compliance with European data protection regulations</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">CCPA Compliant</h4>
                      <p className="text-sm">California Consumer Privacy Act compliance</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">HIPAA Ready</h4>
                      <p className="text-sm">Available for healthcare customers with BAA</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Access Control</h2>
                  <p className="leading-relaxed mb-4">
                    We enforce strict access controls across all systems:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Multi-factor authentication (MFA) required for all accounts</li>
                    <li>Role-based access control (RBAC) with least privilege principle</li>
                    <li>SSO integration (SAML 2.0, OAuth 2.0, OpenID Connect)</li>
                    <li>Session management with automatic timeouts</li>
                    <li>IP whitelisting and geo-restrictions</li>
                    <li>Comprehensive audit logs for all access events</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Infrastructure Security</h2>
                  <p className="leading-relaxed mb-4">
                    Our infrastructure is designed for resilience and security:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Multi-region deployment with automatic failover</li>
                    <li>DDoS protection and rate limiting</li>
                    <li>Web Application Firewall (WAF) with OWASP top 10 protection</li>
                    <li>Network segmentation and microsegmentation</li>
                    <li>Intrusion detection and prevention systems (IDS/IPS)</li>
                    <li>Regular vulnerability scanning and patch management</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Incident Response</h2>
                  <p className="leading-relaxed mb-4">
                    Our security team follows a proven incident response protocol:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>24/7 security operations center (SOC)</li>
                    <li>Sub-60-minute incident response time</li>
                    <li>Automated threat detection and alerting</li>
                    <li>Incident communication within 4 hours of detection</li>
                    <li>Post-incident analysis and remediation</li>
                    <li>Transparent security advisories for affected customers</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Security Testing</h2>
                  <p className="leading-relaxed mb-4">
                    We continuously test and validate our security posture:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Quarterly penetration testing by third-party firms</li>
                    <li>Annual security audits and compliance assessments</li>
                    <li>Continuous automated vulnerability scanning</li>
                    <li>Bug bounty program for responsible disclosure</li>
                    <li>Security training for all employees</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Responsible Disclosure</h2>
                  <p className="leading-relaxed mb-4">
                    If you discover a security vulnerability, we appreciate responsible disclosure:
                  </p>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="leading-relaxed mb-4">
                      <strong className="text-white">Email:</strong> security@barriosa2i.com<br />
                      <strong className="text-white">PGP Key:</strong> Available on request<br />
                      <strong className="text-white">Response Time:</strong> Within 48 hours
                    </p>
                    <p className="text-sm">
                      We commit to acknowledging your report within 48 hours and keeping you informed throughout the remediation process.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">Request Security Documentation</h2>
                  <p className="leading-relaxed mb-4">
                    Enterprise customers can request additional security documentation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>SOC 2 Type II report</li>
                    <li>Penetration test results</li>
                    <li>Security questionnaires (SIG, CAIQ, etc.)</li>
                    <li>Data Processing Agreements (DPA)</li>
                    <li>Business Associate Agreements (BAA) for HIPAA</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Contact your account manager or email <a href="mailto:security@barriosa2i.com" className="text-cyan-400 hover:text-cyan-300 underline">security@barriosa2i.com</a> to request documentation.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
