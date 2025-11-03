import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Barrios A2I | Schedule Demo",
  description: "Book a 30-minute technical consultation to see how Barrios A2I orchestrates your AI agents.",
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
