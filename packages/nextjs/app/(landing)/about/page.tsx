"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Handshake, Leaf, Lightbulb, Search, Target } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

// Social Media Icon Components
const LinkedInIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.91.58.1.79-.25.79-.56v-2.18c-3.2.69-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.21 1.8 1.21 1.04 1.79 2.72 1.28 3.38.98.1-.76.4-1.28.73-1.57-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.01 11.01 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.57.23 2.73.11 3.02.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.26 5.7.41.35.78 1.03.78 2.08v3.09c0 .31.21.67.8.56A10.996 10.996 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
  </svg>
);

const About = () => {
  const teamMembers = [
    {
      name: "Sebera Jonas",
      role: "CEO & Founder",
      bio: "Visionary leader with extensive experience in blockchain technology and mineral supply chain innovation. Driving StoneProof's mission to revolutionize transparency in the mining industry.",
      image: "/team/sebera-jonas.webp",
      socials: {
        twitter: "https://x.com/0xJonaseb11",
        linkedin: "https://linkedin.com/in/jonassebera",
        telegram: "https://t.me/OxJonaseb11",
        github: "https://github.com/0xJonaseb11",
      },
    },
    {
      name: "NYUMBAYIRE Laurent",
      role: "Co-Founder & COO",
      bio: "Operations expert with deep knowledge of mining operations and supply chain management. Ensures seamless execution of StoneProof's platform across global markets.",
      image: "/team/nyumbayire-laurent.jpg",
      socials: {
        twitter: "https://x.com/Lau_lanez",
        linkedin: "https://www.linkedin.com/in/nyumbayire-laurent-b11251299/",
        telegram: "https://t.me/laulanez",
        github: "https://github.com/NyLaurent",
      },
    },
    {
      name: "KWIZERA Aimable",
      role: "CFO",
      bio: "Financial strategist with expertise in blockchain economics and mineral trading. Manages StoneProof's financial operations and strategic investments.",
      image: "/team/kwizera-aimable.jpg",
      socials: {
        twitter: "https://x.com/Aimable44",
        linkedin: "https://linkedin.com/in/aimable01",
        telegram: "https://t.me/aimableK",
        github: "https://github.com/Aimable01",
      },
    },
    {
      name: "Nshimiyimana Ihirwe Patrick",
      role: "Sales Lead",
      bio: "Sales and business development specialist with strong relationships in the mining industry. Drives growth and partnerships for StoneProof's expanding market presence.",
      image: "/team/ihirwe-patrick.jpg",
      socials: {
        twitter: "https://x.com/Ihirwe1916574",
        linkedin: "https://www.linkedin.com/in/ihirwe-patrick/",
        github: "https://github.com/ihirwepatrick",
      },
    },
  ];

  const values = [
    {
      title: "Transparency",
      description: "We believe in complete transparency across the entire mineral supply chain, from mine to market.",
      icon: Search,
    },
    {
      title: "Trust",
      description: "Building trust through immutable blockchain records and verifiable data at every step.",
      icon: Handshake,
    },
    {
      title: "Sustainability",
      description: "Promoting responsible mining practices and environmental stewardship in the industry.",
      icon: Leaf,
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge blockchain technology to solve real-world supply chain challenges.",
      icon: Lightbulb,
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description:
        "StoneProof was founded with a vision to revolutionize mineral traceability using blockchain technology.",
    },
    {
      year: "2024 Q1",
      title: "First MVP Launch",
      description: "Launched our first blockchain-based mineral tracking prototype with 5 pilot mining companies.",
    },
    {
      year: "2024 Q2",
      title: "Series A Funding",
      description: "Raised $5M in Series A funding to accelerate platform development and team expansion.",
    },
    {
      year: "2024 Q3",
      title: "Platform Launch",
      description: "Officially launched StoneProof platform with full role-based access control and smart contracts.",
    },
    {
      year: "2024 Q4",
      title: "Global Expansion",
      description: "Expanded operations to 15 countries with partnerships across 50+ mining enterprises.",
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Plans for AI integration, advanced analytics, and carbon footprint tracking capabilities.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                StoneProof
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing mineral supply chains through blockchain technology, ensuring transparency, trust,
              and traceability from mine to market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  StoneProof was born from a simple observation: the mineral supply chain is one of the most opaque and
                  complex systems in global commerce. Despite being the backbone of modern technology, from smartphones
                  to electric vehicles, the journey of minerals from mine to market remained largely invisible.
                </p>
                <p>
                  Our founders, having witnessed firsthand the challenges of supply chain transparency in both
                  blockchain and mining industries, envisioned a solution that could bring the same level of
                  transparency and trust to mineral trading that blockchain brought to digital transactions.
                </p>
                <p>
                  Today, StoneProof stands as the first comprehensive blockchain platform dedicated to mineral
                  traceability, serving mining companies, refineries, transporters, and buyers worldwide with
                  unprecedented transparency and security.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#0A77FF]/10 to-[#0A77FF]/5 rounded-2xl p-8 border border-[#23262F]">
                <div className="text-center">
                  <div className="w-24 h-24 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src="/dashboard/stone_proof_logo.svg" alt="Stone Proof" className="h-12 w-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Built for the Future</h3>
                  <p className="text-gray-300">
                    Our platform is designed to scale with the growing demands of the global mineral industry, ensuring
                    that transparency and trust become the standard, not the exception.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F]"
            >
              <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#0A77FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300">
                To create a transparent, secure, and efficient mineral supply chain ecosystem that empowers all
                stakeholders with verifiable data, reduces fraud, and promotes sustainable mining practices through
                cutting-edge blockchain technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F]"
            >
              <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-[#0A77FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To become the global standard for mineral traceability, where every mineral transaction is transparent,
                every stakeholder is empowered, and trust is built into the very foundation of the supply chain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to transforming the mineral industry.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="text-4xl mb-4">
                  <value.icon className="w-10 h-10 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Meet Our <span className="text-[#0A77FF]">Leadership Team</span>
            </motion.h2>
            <motion.p
              className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The passionate individuals driving StoneProof's mission to revolutionize transparency in the mineral
              supply chain industry
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#23262F] hover:border-[#0A77FF]/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Member Photo */}
                  <div className="w-full sm:w-2/5 lg:w-1/3 h-72 sm:h-auto relative">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="w-full sm:w-3/5 lg:w-2/3 p-4 sm:p-6 lg:p-8">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-[#0A77FF] mb-3 text-xs sm:text-sm lg:text-base">{member.role}</p>
                    <p className="text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-2 sm:space-x-3">
                      {member.socials.twitter && (
                        <Link
                          href={member.socials.twitter}
                          target="_blank"
                          className="text-gray-400 hover:text-[#0A77FF] transition-colors"
                        >
                          <FaXTwitter />
                        </Link>
                      )}
                      {member.socials.linkedin && (
                        <Link
                          href={member.socials.linkedin}
                          target="_blank"
                          className="text-gray-400 hover:text-[#0A77FF] transition-colors"
                        >
                          <LinkedInIcon />
                        </Link>
                      )}
                      {member.socials.telegram && (
                        <Link
                          href={member.socials.telegram}
                          target="_blank"
                          className="text-gray-400 hover:text-[#0A77FF] transition-colors"
                        >
                          <TelegramIcon />
                        </Link>
                      )}
                      {member.socials.github && (
                        <Link
                          href={member.socials.github}
                          target="_blank"
                          className="text-gray-400 hover:text-[#0A77FF] transition-colors"
                        >
                          <GitHubIcon />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-4">
              Want to join our team or collaborate?
            </h3>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#0A77FF] to-[#0047CC] text-white px-6 sm:px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              From a bold idea to a global platform, here's how we've been transforming the mineral industry.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0A77FF] to-[#0A77FF]/30"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F]">
                      <div className="text-[#0A77FF] font-bold text-sm mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-[#0A77FF] rounded-full flex items-center justify-center relative z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0A77FF]/10 to-[#0A77FF]/5 rounded-2xl p-8 border border-[#23262F]"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Be part of the transformation. Whether you're a mining company, refiner, transporter, or buyer, StoneProof
              is here to revolutionize your supply chain operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/welcome"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Get Started
              </a>
              <a
                href="/services"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
