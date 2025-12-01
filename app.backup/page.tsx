import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TechStackMarquee from "@/components/TechStackMarquee";
import ServicesGrid from "@/components/ServicesGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <TechStackMarquee />
      <ServicesGrid />
      <ContactSection />
      <Footer />
    </main>
  );
}
