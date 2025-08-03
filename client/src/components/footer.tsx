import { Sparkles, Linkedin, Instagram, Youtube } from "lucide-react";

const footerSections = [
  {
    title: "Get Started",
    links: [
      { name: "Free Skin Analysis", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Sample Results", href: "#" },
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
    <footer className="bg-gray-50 border-t border-purple-100/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-400">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skincare AI
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-sm">
              AI-powered skincare analysis that helps you discover your perfect
              routine. Trusted by over 1 million users worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-600 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Skincare AI. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Made with ❤️ for healthier skin
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
