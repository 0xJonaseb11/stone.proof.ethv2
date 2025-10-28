"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle,
  ExternalLink,
  Globe,
  Handshake,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const Partners = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Partners", count: 25 },
    { id: "mining", name: "Mining Companies", count: 8 },
    { id: "technology", name: "Technology Partners", count: 6 },
    { id: "logistics", name: "Logistics Partners", count: 5 },
    { id: "certification", name: "Certification Bodies", count: 4 },
    { id: "financial", name: "Financial Partners", count: 2 },
  ];

  const partners = [
    {
      id: 1,
      name: "Global Mining Corp",
      category: "mining",
      logo: "/partners/global-mining.png",
      description: "Leading mining company with operations across 15 countries",
      partnership: "Strategic mineral supply partnership",
      benefits: ["Direct mineral sourcing", "Quality assurance", "Volume discounts"],
      featured: true,
      website: "https://globalmining.com",
    },
    {
      id: 2,
      name: "Blockchain Solutions Inc",
      category: "technology",
      logo: "/partners/blockchain-solutions.png",
      description: "Enterprise blockchain infrastructure provider",
      partnership: "Technology integration partnership",
      benefits: ["Infrastructure support", "Technical expertise", "Co-development"],
      featured: true,
      website: "https://blockchainsolutions.com",
    },
    {
      id: 3,
      name: "Secure Logistics Ltd",
      category: "logistics",
      logo: "/partners/secure-logistics.png",
      description: "Specialized mineral transportation and security",
      partnership: "Transportation and security partnership",
      benefits: ["Secure transport", "Real-time tracking", "Insurance coverage"],
      featured: false,
      website: "https://securelogistics.com",
    },
    {
      id: 4,
      name: "International Standards Bureau",
      category: "certification",
      logo: "/partners/standards-bureau.png",
      description: "Global certification and compliance authority",
      partnership: "Certification and compliance partnership",
      benefits: ["Quality certification", "Compliance support", "Audit services"],
      featured: false,
      website: "https://standardsbureau.org",
    },
    {
      id: 5,
      name: "TechFlow Systems",
      category: "technology",
      logo: "/partners/techflow.png",
      description: "Supply chain management software provider",
      partnership: "Software integration partnership",
      benefits: ["System integration", "Data synchronization", "Workflow automation"],
      featured: false,
      website: "https://techflow.com",
    },
    {
      id: 6,
      name: "Mining Finance Group",
      category: "financial",
      logo: "/partners/mining-finance.png",
      description: "Specialized mining industry financial services",
      partnership: "Financial services partnership",
      benefits: ["Trade finance", "Risk management", "Market insights"],
      featured: false,
      website: "https://miningfinance.com",
    },
  ];

  const partnershipTypes = [
    {
      icon: Handshake,
      title: "Strategic Partners",
      description: "Long-term strategic relationships with key industry players",
      benefits: ["Joint development", "Market expansion", "Shared resources"],
    },
    {
      icon: Building2,
      title: "Technology Partners",
      description: "Integration with leading technology providers",
      benefits: ["API integration", "Co-development", "Technical support"],
    },
    {
      icon: Globe,
      title: "Global Partners",
      description: "International partners for global market reach",
      benefits: ["Local expertise", "Market access", "Regulatory compliance"],
    },
    {
      icon: Award,
      title: "Certification Partners",
      description: "Partnerships with certification and compliance bodies",
      benefits: ["Quality assurance", "Compliance support", "Industry standards"],
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Market Expansion",
      description: "Access new markets and customer segments through our partner network",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Leverage partner expertise for improved security and compliance",
    },
    {
      icon: Zap,
      title: "Faster Integration",
      description: "Accelerate your implementation with pre-built integrations",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get dedicated support from our partner ecosystem",
    },
  ];

  const filteredPartners =
    activeCategory === "all" ? partners : partners.filter(partner => partner.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Partners
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our growing ecosystem of industry leaders working together to revolutionize mineral supply chain
              transparency through blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Partnership Types</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We work with various types of partners to create a comprehensive ecosystem for mineral traceability.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <type.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{type.description}</p>
                <ul className="space-y-1">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-gray-400 text-xs flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-[#0A77FF]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Partners</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Meet the industry leaders who are part of our ecosystem.</p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80 text-white shadow-lg shadow-[#0A77FF]/25"
                    : "bg-gradient-to-br from-[#181B20] to-[#10131A] text-gray-300 hover:bg-[#23262F] border border-[#23262F] hover:border-[#0A77FF]/30"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    activeCategory === category.id ? "bg-white/20" : "bg-[#0A77FF]/20 text-[#0A77FF]"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border transition-colors ${
                  partner.featured
                    ? "border-[#0A77FF] shadow-lg shadow-[#0A77FF]/25"
                    : "border-[#23262F] hover:border-[#0A77FF]/30"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  {partner.featured && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="bg-[#0A77FF] text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                  <span className="bg-[#0A77FF]/20 text-[#0A77FF] px-3 py-1 rounded-full text-sm capitalize">
                    {partner.category}
                  </span>
                </div>

                <div className="w-16 h-16 bg-[#0A77FF]/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-8 h-8 text-[#0A77FF]" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{partner.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[#0A77FF] mb-2">Partnership:</h4>
                  <p className="text-gray-300 text-sm">{partner.partnership}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {partner.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-gray-400 text-xs flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-[#0A77FF]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#0A77FF] hover:text-white transition-colors text-sm font-semibold"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Partnership Benefits</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover the advantages of partnering with StoneProof and joining our ecosystem.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0A77FF]/10 to-[#0A77FF]/5 rounded-2xl p-8 border border-[#23262F]"
          >
            <div className="w-20 h-20 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-10 h-10 text-[#0A77FF]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Become a Partner</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our ecosystem and help revolutionize mineral supply chain transparency. We're looking for partners
              who share our vision of a more transparent and sustainable mining industry.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Target className="w-8 h-8 text-[#0A77FF] mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Strategic Alignment</h3>
                <p className="text-gray-300 text-sm">Shared vision for industry transformation</p>
              </div>
              <div className="text-center">
                <Lightbulb className="w-8 h-8 text-[#0A77FF] mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Innovation Focus</h3>
                <p className="text-gray-300 text-sm">Commitment to technological advancement</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 text-[#0A77FF] mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">Sustainability</h3>
                <p className="text-gray-300 text-sm">Environmental and social responsibility</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Partnership Team</span>
              </a>
              <a
                href="/services"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Services</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
