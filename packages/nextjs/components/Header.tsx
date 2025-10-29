"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ContactUsButton from "./landing/Header/ContactUsButton";
import StoneProof from "./landing/Header/StoneProof";
import { Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add effect to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Add styles to body to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position and remove fixed positioning
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#060910]/80 backdrop-blur-md shadow-lg" : "bg-[#060910]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <StoneProof />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-2 lg:gap-10">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-xs lg:text-base transition-colors duration-200 whitespace-nowrap px-1 lg:px-0 ${
                      isActive
                        ? "text-[#0A77FF] opacity-100"
                        : "text-white opacity-70 hover:text-[#0A77FF] hover:opacity-100"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white fixed top-4 right-4 z-50 transition-transform duration-300"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          style={{ transform: mobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Contact Us button - hidden on mobile and small tablets */}
        <div className="hidden lg:block">
          <ContactUsButton />
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-[#060910] z-40 flex flex-col items-center justify-center lg:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "translate-y-4"
          }`}
        >
          <ul className="flex flex-col gap-6 text-center">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.name}
                  className={`transition-all duration-300 ${
                    mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <a
                    href={link.href}
                    className={`text-lg transition-colors duration-200 ${
                      isActive
                        ? "text-[#0A77FF] opacity-100"
                        : "text-white opacity-70 hover:text-[#0A77FF] hover:opacity-100"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
            <li
              className={`mt-4 transition-all duration-300 ${
                mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${navLinks.length * 50}ms` }}
            >
              <ContactUsButton />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
