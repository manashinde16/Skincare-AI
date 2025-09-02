import { Sparkles, Linkedin, Instagram, Youtube, X, Heart, Mail, Phone } from "lucide-react";

const footerSections = [
  {
    title: "Get Started",
    links: [
      { name: "Free Skin Analysis", href: "/analyze" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Sample Results", href: "/routine" },
      { name: "Voice Demo", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Our Story", href: "#" },
      { name: "The Science", href: "#" },
      { name: "Dermatologist Team", href: "#" },
      { name: "Press & Media", href: "#" },
    ],
  },
  {
    title: "Partner With Us",
    links: [
      { name: "Brand Partnerships", href: "#" },
      { name: "Affiliate Program", href: "#" },
      { name: "API Access", href: "#" },
      { name: "Bulk Licensing", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Medical Disclaimer", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skincare AI
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-sm leading-relaxed">
              AI-powered skincare analysis that helps you discover your perfect
              routine. Trusted by over 1 million users worldwide.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">support@skincareai.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-600 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-pink-600 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-blue-400 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-800 hover:bg-red-600 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-6 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 mb-16 border border-gray-700">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stay Updated with Skincare Tips
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Get the latest skincare insights, AI updates, and personalized recommendations delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Skincare AI. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for healthier skin</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
