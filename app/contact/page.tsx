import type { Metadata } from 'next'
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Barrios A2I | Schedule Demo",
  description: "Book a 30-minute technical consultation with our AI orchestration experts. Discuss your multi-agent architecture and scaling challenges.",
  openGraph: {
    title: "Contact Barrios A2I | Schedule Demo",
    description: "Get in touch with Barrios A2I to discuss your AI orchestration needs.",
    url: 'https://barrios-a2i-website.vercel.app/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0B1220]">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
