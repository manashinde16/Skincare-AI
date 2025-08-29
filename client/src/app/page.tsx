import Header from "../components/LandingPage/header";
import HeroSection from "../components/LandingPage/hero-section";
import HowItWorks from "../components/LandingPage/how-it-works";
import WhyDifferent from "../components/LandingPage/why-different";
import PersonalizedRoutine from "../components/LandingPage/personalized-routine";
import Testimonials from "../components/LandingPage/testimonials";
import SkincareMeetsAI from "../components/LandingPage/skincare-meets-ai";
import FAQSection from "../components/LandingPage/faq-section";
import FinalCTA from "../components/LandingPage/final-cta";
import Footer from "../components/LandingPage/footer";
import TrustedPartners from "../components/LandingPage/trusted-partners";
import AuthGuard from "../components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard requireGuest={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Premium background shapes with enhanced gradients */}
        <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="fixed top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/50 via-blue-100/30 to-cyan-100/40 rounded-full blur-3xl pointer-events-none translate-x-1/3 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="fixed bottom-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-purple-100/40 via-pink-100/30 to-rose-100/50 rounded-full blur-3xl pointer-events-none translate-y-1/2 animate-pulse" style={{ animationDelay: '4s' }} />
        
        {/* Additional floating elements for premium feel */}
        <div className="fixed top-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-2xl pointer-events-none animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="fixed bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-2xl pointer-events-none animate-bounce" style={{ animationDelay: '3s' }} />

        {/* Subtle mesh pattern overlay for texture */}
        <div
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Content with relative positioning and enhanced container */}
        <div className="relative z-10">
          <Header />
          <div className="pt-20">
            <HeroSection />
          </div>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <HowItWorks />
            <TrustedPartners />
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
    </AuthGuard>
  );
}
