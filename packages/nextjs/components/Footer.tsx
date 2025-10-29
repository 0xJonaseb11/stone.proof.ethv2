import React from "react";
import Link from "next/link";
import StoneProof from "./landing/Header/StoneProof";
import {
  ArrowRight,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Shield,
  Twitter,
  Users,
} from "lucide-react";

// Footer data structure
const footerData = {
  description:
    "Revolutionizing mineral supply chains through blockchain technology, ensuring transparency, trust, and traceability from mine to market.",
  sections: [
    {
      title: "Solutions",
      links: [
        { name: "Mining Operations", href: "/services#mining" },
        { name: "Refining & Processing", href: "/services#refining" },
        { name: "Transportation", href: "/services#transport" },
        { name: "Trading Platform", href: "/services#trading" },
        { name: "Analytics & Reporting", href: "/services#analytics" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/about#team" },
        { name: "Success Stories", href: "/portfolio" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Documentation", href: "/docs" },
        { name: "Help Center", href: "/help" },
        { name: "API Reference", href: "/api" },
        { name: "Partners", href: "/partners" },
      ],
    },
  ],
  contact: {
    email: "hello@stoneproof.com",
    phone: "+1 (555) 123-4567",
    address: "123 Blockchain Street, Tech City, TC 12345",
  },
  social: {
    twitter: "https://x.com/stoneproof",
    linkedin: "https://linkedin.com/company/stoneproof",
    github: "https://github.com/stoneproof",
  },
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#060910] to-[#0A0F1A] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <StoneProof />
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">{footerData.description}</p>

            {/* Newsletter Subscription */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#0A77FF]" />
                Stay Updated
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#181B20] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
                  />
                </div>
                <button className="bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80 hover:from-[#0A77FF]/90 hover:to-[#0A77FF]/70 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-[#0A77FF]/25">
                  <Send className="w-4 h-4" />
                  <span>Subscribe</span>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-[#0A77FF]" />
                <a href={`mailto:${footerData.contact.email}`} className="hover:text-white transition-colors">
                  {footerData.contact.email}
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-[#0A77FF]" />
                <a href={`tel:${footerData.contact.phone}`} className="hover:text-white transition-colors">
                  {footerData.contact.phone}
                </a>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-[#0A77FF] flex-shrink-0" />
                <span>{footerData.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                {section.title === "Solutions" && <Shield className="w-5 h-5 mr-2 text-[#0A77FF]" />}
                {section.title === "Company" && <Users className="w-5 h-5 mr-2 text-[#0A77FF]" />}
                {section.title === "Resources" && <BookOpen className="w-5 h-5 mr-2 text-[#0A77FF]" />}
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#0A77FF] transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#23262F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 StoneProof. All Rights Reserved. | Privacy Policy | Terms of Service
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              <a
                href={footerData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 rounded-lg flex items-center justify-center text-[#0A77FF] hover:text-white transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={footerData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 rounded-lg flex items-center justify-center text-[#0A77FF] hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={footerData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 rounded-lg flex items-center justify-center text-[#0A77FF] hover:text-white transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
