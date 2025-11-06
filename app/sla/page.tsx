import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Clock, TrendingUp, Zap, HeadphonesIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Service Level Agreement | Barrios A2I',
  description: 'SLA commitments, uptime guarantees, and support response times for Barrios A2I services.',
  openGraph: {
    title: 'Service Level Agreement | Barrios A2I',
    description: 'Review our SLA commitments and uptime guarantees.',
    url: 'https://barrios-a2i-website.vercel.app/sla',
  },
}

export default function SLAPage() {
  const slaTiers = [
    {
      tier: 'Starter',
      uptime: '99.5%',
      support: '12-hour response',
      credits: '5% per hour of downtime',
    },
    {
      tier: 'Professional',
      uptime: '99.9%',
      support: '4-hour response',
      credits: '10% per hour of downtime',
    },
    {
      tier: 'Enterprise',
      uptime: '99.95%',
      support: '1-hour response',
      credits: '25% per hour of downtime',
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
                <Clock size={14} className="text-cyan-400" />
                Service Level Agreement
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                SLA Commitments
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed">
                We guarantee high availability, fast support response times, and transparent service credits for any downtime. Your uptime is our priority.
              </p>
            </div>

            {/* SLA Tiers */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {slaTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">{tier.tier}</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-cyan-400" />
                        <span className="text-sm text-slate-400">Uptime Guarantee</span>
                      </div>
                      <div className="text-3xl font-bold text-cyan-400">{tier.uptime}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <HeadphonesIcon size={16} className="text-amber-400" />
                        <span className="text-sm text-slate-400">Support Response</span>
                      </div>
                      <div className="text-lg font-semibold text-white">{tier.support}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={16} className="text-emerald-400" />
                        <span className="text-sm text-slate-400">Service Credits</span>
                      </div>
                      <div className="text-sm font-medium text-slate-300">{tier.credits}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed SLA Terms */}
        <section className="relative py-12 bg-[#0B1220]">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Uptime Guarantee</h2>
                  <p className="leading-relaxed mb-4">
                    Barrios A2I commits to maintaining the following uptime percentages for our services:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-white font-semibold">Tier</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Monthly Uptime</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Downtime Allowance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4">Starter</td>
                          <td className="py-3 px-4">99.5%</td>
                          <td className="py-3 px-4">~3.6 hours/month</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4">Professional</td>
                          <td className="py-3 px-4">99.9%</td>
                          <td className="py-3 px-4">~43 minutes/month</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">Enterprise</td>
                          <td className="py-3 px-4">99.95%</td>
                          <td className="py-3 px-4">~21 minutes/month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="leading-relaxed mt-4 text-sm">
                    Uptime is measured as the percentage of time our API endpoints are available and responsive within normal performance parameters (response time &lt; 1000ms for 95th percentile).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Exclusions from SLA</h2>
                  <p className="leading-relaxed mb-4">
                    The following events are excluded from uptime calculations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Scheduled maintenance (notified 72 hours in advance)</li>
                    <li>Emergency security patches (notified as soon as possible)</li>
                    <li>Downtime caused by factors outside our control (ISP outages, DDoS attacks, force majeure)</li>
                    <li>Issues caused by customer misconfigurations or violations of acceptable use policy</li>
                    <li>Beta or preview features explicitly marked as non-production</li>
                    <li>Third-party service failures (unless integrated as part of our managed services)</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Support Response Times</h2>
                  <p className="leading-relaxed mb-4">
                    Support response times vary by plan tier and issue severity:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-white font-semibold">Severity</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Starter</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Professional</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4 font-medium">Critical (P1)</td>
                          <td className="py-3 px-4">12 hours</td>
                          <td className="py-3 px-4">4 hours</td>
                          <td className="py-3 px-4">1 hour</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4 font-medium">High (P2)</td>
                          <td className="py-3 px-4">24 hours</td>
                          <td className="py-3 px-4">8 hours</td>
                          <td className="py-3 px-4">4 hours</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4 font-medium">Medium (P3)</td>
                          <td className="py-3 px-4">48 hours</td>
                          <td className="py-3 px-4">24 hours</td>
                          <td className="py-3 px-4">8 hours</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Low (P4)</td>
                          <td className="py-3 px-4">5 business days</td>
                          <td className="py-3 px-4">3 business days</td>
                          <td className="py-3 px-4">2 business days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-lg text-sm">
                    <p className="mb-2"><strong className="text-white">Severity Definitions:</strong></p>
                    <ul className="space-y-1">
                      <li><strong>P1 (Critical):</strong> Complete service outage affecting production</li>
                      <li><strong>P2 (High):</strong> Major feature unavailable, significant performance degradation</li>
                      <li><strong>P3 (Medium):</strong> Minor feature issues, workarounds available</li>
                      <li><strong>P4 (Low):</strong> General questions, feature requests, documentation</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Service Credits</h2>
                  <p className="leading-relaxed mb-4">
                    If we fail to meet our uptime commitments, you may be eligible for service credits:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left py-3 px-4 text-white font-semibold">Actual Uptime</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Starter</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Professional</th>
                          <th className="text-left py-3 px-4 text-white font-semibold">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4">&lt; 99.5%</td>
                          <td className="py-3 px-4">5%</td>
                          <td className="py-3 px-4">10%</td>
                          <td className="py-3 px-4">25%</td>
                        </tr>
                        <tr className="border-b border-white/10">
                          <td className="py-3 px-4">&lt; 99.0%</td>
                          <td className="py-3 px-4">10%</td>
                          <td className="py-3 px-4">25%</td>
                          <td className="py-3 px-4">50%</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">&lt; 95.0%</td>
                          <td className="py-3 px-4">25%</td>
                          <td className="py-3 px-4">50%</td>
                          <td className="py-3 px-4">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="leading-relaxed mt-4">
                    <strong className="text-white">To Request Service Credits:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                    <li>Submit a support ticket within 30 days of the incident</li>
                    <li>Include dates and times of downtime experienced</li>
                    <li>Credits will be applied to your next monthly invoice</li>
                    <li>Credits cannot be refunded as cash</li>
                    <li>Maximum credit per month: 100% of monthly fees</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Performance Targets</h2>
                  <p className="leading-relaxed mb-4">
                    In addition to uptime, we commit to the following performance targets:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">API Latency</h4>
                      <p className="text-sm">95th percentile response time &lt; 500ms</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Query Processing</h4>
                      <p className="text-sm">Fast path: &lt; 100ms | Full path: &lt; 3s</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Event Delivery</h4>
                      <p className="text-sm">99.99% delivery rate within 5 seconds</p>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Data Sync</h4>
                      <p className="text-sm">Cross-region replication &lt; 1 minute</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Monitoring & Status</h2>
                  <p className="leading-relaxed mb-4">
                    Stay informed about our service status:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Real-time status page: <a href="https://status.barriosa2i.com" className="text-cyan-400 hover:text-cyan-300 underline">status.barriosa2i.com</a></li>
                    <li>Subscribe to status updates via email, SMS, or Slack</li>
                    <li>Historical uptime data publicly available</li>
                    <li>Incident post-mortems published within 5 business days</li>
                    <li>Monthly SLA compliance reports for Enterprise customers</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Contact & Escalation</h2>
                  <p className="leading-relaxed">
                    For SLA-related questions or escalations:
                  </p>
                  <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-lg">
                    <p className="leading-relaxed">
                      <strong className="text-white">Support:</strong> support@barriosa2i.com<br />
                      <strong className="text-white">Emergency (P1):</strong> emergency@barriosa2i.com<br />
                      <strong className="text-white">SLA Questions:</strong> sla@barriosa2i.com<br />
                      <strong className="text-white">Phone (Enterprise only):</strong> Available in customer portal
                    </p>
                  </div>
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
