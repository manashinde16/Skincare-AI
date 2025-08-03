import Header from "../components/header";
import HeroSection from "../components/hero-section";
import HowItWorks from "../components/how-it-works";
import TrustedPartners from "../components/trusted-partners";
import RoutineShowcase from "../components/routine.showcase";
import WhyChooseUs from "../components/why-choose-us";
import Testimonials from "../components/testimonials";
import FinalCTA from "../components/final-cta";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Subtle background enhancements */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-purple-50/20 to-lavender-50/30 pointer-events-none" />

      {/* Organic background shapes */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-100/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-gradient-to-bl from-lavender-100/40 to-purple-100/20 rounded-full blur-3xl pointer-events-none translate-x-1/3" />
      <div className="fixed bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-pink-100/30 to-purple-100/25 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      {/* Subtle mesh pattern overlay */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 69, 19, 0.3) 1px, transparent 0)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <HowItWorks />
          <TrustedPartners />
          <RoutineShowcase />
          <WhyChooseUs />
          <Testimonials />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}
