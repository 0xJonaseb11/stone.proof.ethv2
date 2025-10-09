"use client";

import React from "react";
import Image from "next/image";
import StoneProof from "../../../components/landing/Header/StoneProof";
import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Blockchain expert with 10+ years in supply chain technology. Former lead at IBM's blockchain division.",
      image: "/team/alex-chen.jpg",
      linkedin: "#",
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Full-stack developer specializing in Web3 applications. Previously built DeFi protocols at ConsenSys.",
      image: "/team/sarah-rodriguez.jpg",
      linkedin: "#",
    },
    {
      name: "Dr. Michael Thompson",
      role: "Head of Mining Operations",
      bio: "Geologist with 15+ years in mineral extraction. Expert in sustainable mining practices and compliance.",
      image: "/team/michael-thompson.jpg",
      linkedin: "#",
    },
    {
      name: "Lisa Wang",
      role: "Head of Product",
      bio: "Product strategist focused on user experience in enterprise blockchain applications. Former product lead at Chainlink.",
      image: "/team/lisa-wang.jpg",
      linkedin: "#",
    },
    {
      name: "James O'Connor",
      role: "Head of Security",
      bio: "Cybersecurity expert specializing in blockchain security. Former security consultant for Fortune 500 companies.",
      image: "/team/james-oconnor.jpg",
      linkedin: "#",
    },
    {
      name: "Maria Santos",
      role: "Head of Compliance",
      bio: "Legal expert in international trade and mineral regulations. Ensures full compliance across all jurisdictions.",
      image: "/team/maria-santos.jpg",
      linkedin: "#",
    },
  ];

  const values = [
    {
      title: "Transparency",
      description: "We believe in complete transparency across the entire mineral supply chain, from mine to market.",
      icon: "🔍",
    },
    {
      title: "Trust",
      description: "Building trust through immutable blockchain records and verifiable data at every step.",
      icon: "🤝",
    },
    {
      title: "Sustainability",
      description: "Promoting responsible mining practices and environmental stewardship in the industry.",
      icon: "🌱",
    },
    {
      title: "Innovation",
      description: "Leveraging cutting-edge blockchain technology to solve real-world supply chain challenges.",
      icon: "💡",
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
                    <span className="text-3xl">🏗️</span>
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
                <span className="text-2xl">🎯</span>
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
                <span className="text-2xl">🔮</span>
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
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our diverse team of experts brings together decades of experience in blockchain technology, mining
              operations, and supply chain management.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="w-20 h-20 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-[#0A77FF] text-center mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
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

