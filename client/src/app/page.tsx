import Header from "../components/header";
import HeroSection from "../components/hero-section";
import HowItWorks from "../components/how-it-works";
import WhyDifferent from "../components/why-different";
import PersonalizedRoutine from "../components/personalized-routine";
import Testimonials from "../components/testimonials";
import SkincareMeetsAI from "../components/skincare-meets-ai";
import FAQSection from "../components/faq-section";
import FinalCTA from "../components/final-cta";
import Footer from "../components/footer";
import TrustedPartners from "../components/trusted-partners"; // Import the TrustedPartners component

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Organic background shapes for dynamic feel */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-lavender-100/30 to-pink-100/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-peach-100/40 to-lavender-100/20 rounded-full blur-3xl pointer-events-none translate-x-1/3" />
      <div className="fixed bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-pink-100/30 to-peach-100/25 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Subtle mesh pattern overlay for texture */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.3) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content with relative positioning and centered container */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <main className="max-w-screen-xl mx-auto">
          <HowItWorks />
          <TrustedPartners /> {/* Render the TrustedPartners component here */}
          <WhyDifferent />
          <PersonalizedRoutine />
          <Testimonials />
          <SkincareMeetsAI />
          <FAQSection />
        </main>
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
