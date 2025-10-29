"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Battery,
  Bolt,
  Building,
  Building2,
  CheckCircle,
  Diamond,
  
  Filter,
  Gem,
  Globe,
  HardHat,
  MapPin,
  Quote,
  Settings,
  Star,
  
  Zap,
} from "lucide-react";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Projects", count: 12 },
    { id: "mining", name: "Mining Operations", count: 4 },
    { id: "refining", name: "Refining & Processing", count: 3 },
    { id: "transport", name: "Transportation", count: 3 },
    { id: "trading", name: "Trading Platforms", count: 2 },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Global Mining Corporation",
      category: "mining",
      industry: "Gold Mining",
      location: "Australia",
      challenge: "Lack of transparency in gold supply chain affecting market trust and regulatory compliance.",
      solution: "Implemented complete blockchain-based tracking system for gold extraction and processing.",
      results: [
        "95% reduction in compliance documentation time",
        "40% increase in market trust scores",
        "100% traceability from mine to market",
        "30% reduction in audit costs",
      ],
      image: "/portfolio/global-mining.jpg",
      testimonial:
        "StoneProof transformed our operations. We now have complete transparency and our customers trust our gold's provenance completely.",
      author: "Sarah Johnson, CEO",
      company: "Global Mining Corporation",
    },
    {
      id: 2,
      title: "Silver Stream Refinery",
      category: "refining",
      industry: "Silver Refining",
      location: "Canada",
      challenge: "Complex multi-stage refining process with poor documentation and quality control issues.",
      solution: "Deployed automated quality tracking and blockchain documentation for all refining stages.",
      results: [
        "99.8% quality accuracy achieved",
        "50% reduction in processing errors",
        "Real-time quality monitoring",
        "Automated compliance reporting",
      ],
      image: "/portfolio/silver-stream.jpg",
      testimonial:
        "The automated quality tracking has revolutionized our operations. We've never had such precise control over our refining process.",
      author: "Michael Chen, Operations Director",
      company: "Silver Stream Refinery",
    },
    {
      id: 3,
      title: "TransGlobal Logistics",
      category: "transport",
      industry: "Mineral Transportation",
      location: "Global",
      challenge: "Lost shipments, poor tracking, and customer complaints about delivery transparency.",
      solution: "Implemented real-time tracking system with blockchain-based delivery confirmations.",
      results: [
        "Zero lost shipments in 6 months",
        "98% on-time delivery rate",
        "Real-time customer visibility",
        "40% reduction in insurance claims",
      ],
      image: "/portfolio/transglobal.jpg",
      testimonial:
        "Our customers love the real-time tracking. We've eliminated delivery disputes and improved customer satisfaction significantly.",
      author: "David Rodriguez, Logistics Manager",
      company: "TransGlobal Logistics",
    },
    {
      id: 4,
      title: "Platinum Peak Trading",
      category: "trading",
      industry: "Precious Metals Trading",
      location: "Switzerland",
      challenge: "Difficulty verifying mineral authenticity and provenance in trading operations.",
      solution: "Integrated blockchain verification system for all trading transactions and asset verification.",
      results: [
        "100% verified transactions",
        "Zero counterfeit incidents",
        "Enhanced market reputation",
        "25% increase in trading volume",
      ],
      image: "/portfolio/platinum-peak.jpg",
      testimonial:
        "The verification system has given us a competitive edge. Our clients trust us completely and our trading volume has increased significantly.",
      author: "Anna Schmidt, Trading Director",
      company: "Platinum Peak Trading",
    },
    {
      id: 5,
      title: "Copper Valley Mining",
      category: "mining",
      industry: "Copper Mining",
      location: "Chile",
      challenge: "Environmental compliance and sustainability reporting requirements.",
      solution: "Implemented comprehensive environmental tracking and automated sustainability reporting.",
      results: [
        "Full environmental compliance",
        "Automated sustainability reports",
        "Reduced environmental impact",
        "Enhanced ESG ratings",
      ],
      image: "/portfolio/copper-valley.jpg",
      testimonial:
        "StoneProof helped us meet all environmental requirements while improving our sustainability practices. Our ESG ratings have never been better.",
      author: "Carlos Mendez, Environmental Manager",
      company: "Copper Valley Mining",
    },
    {
      id: 6,
      title: "Iron Works Processing",
      category: "refining",
      industry: "Iron Processing",
      location: "Brazil",
      challenge: "Complex supply chain with multiple suppliers and quality inconsistencies.",
      solution: "Deployed end-to-end supply chain tracking with automated quality control integration.",
      results: [
        "Standardized quality across suppliers",
        "Automated quality control",
        "Reduced processing time by 35%",
        "Improved supplier relationships",
      ],
      image: "/portfolio/iron-works.jpg",
      testimonial:
        "The automated quality control has standardized our entire supply chain. We now have consistent quality from all our suppliers.",
      author: "Roberto Silva, Quality Manager",
      company: "Iron Works Processing",
    },
  ];

  const stats = [
    { number: "500+", label: "Companies Served", icon: Building2 },
    { number: "1M+", label: "Minerals Tracked", icon: Gem },
    { number: "99.9%", label: "Uptime Guarantee", icon: Zap },
    { number: "50+", label: "Countries Active", icon: Globe },
  ];

  const filteredCaseStudies =
    activeCategory === "all" ? caseStudies : caseStudies.filter(study => study.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real success stories from companies that have transformed their mineral supply chains with StoneProof's
              blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover how companies across different industries have revolutionized their operations with StoneProof.
            </p>
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
                <Filter className="w-4 h-4" />
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

          {/* Case Studies Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                    <span className="bg-[#0A77FF]/20 text-[#0A77FF] px-3 py-1 rounded-full text-sm">
                      {study.industry}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{study.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span className="capitalize">{study.category}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Challenge</h4>
                    <p className="text-gray-300 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Solution</h4>
                    <p className="text-gray-300 text-sm">{study.solution}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Results</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="flex items-center p-2 rounded-lg bg-[#0A77FF]/5 border border-[#0A77FF]/10"
                      >
                        <CheckCircle className="w-4 h-4 text-[#0A77FF] mr-3 flex-shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#0A77FF]/10 to-[#0A77FF]/5 rounded-lg p-4 border border-[#0A77FF]/20">
                  <div className="flex items-start space-x-3">
                    <Quote className="w-5 h-5 text-[#0A77FF] mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm italic mb-3">"{study.testimonial}"</p>
                      <div className="text-sm">
                        <span className="text-white font-semibold">{study.author}</span>
                        <span className="text-gray-400">, {study.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              StoneProof's blockchain technology is transforming operations across diverse mineral industries.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Precious Metals",
                description: "Gold, Silver, Platinum tracking",
                icon: Award,
                count: "150+ companies",
              },
              {
                name: "Industrial Minerals",
                description: "Copper, Iron, Aluminum processing",
                icon: Settings,
                count: "200+ companies",
              },
              {
                name: "Rare Earth Elements",
                description: "Lithium, Cobalt, Nickel mining",
                icon: Battery,
                count: "75+ companies",
              },
              {
                name: "Gemstones",
                description: "Diamond, Ruby, Emerald certification",
                icon: Diamond,
                count: "50+ companies",
              },
              { name: "Energy Minerals", description: "Coal, Uranium, Oil sands", icon: Bolt, count: "100+ companies" },
              {
                name: "Construction Materials",
                description: "Sand, Gravel, Limestone tracking",
                icon: HardHat,
                count: "125+ companies",
              },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0A77FF]/30 transition-colors">
                  <industry.icon className="w-6 h-6 text-[#0A77FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{industry.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-[#0A77FF] text-sm font-semibold">{industry.count}</div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0A77FF] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Hear from industry leaders who have transformed their operations with StoneProof.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "StoneProof has revolutionized our supply chain transparency. We've never had such complete visibility into our mineral operations.",
                author: "Jennifer Walsh",
                role: "Supply Chain Director",
                company: "MiningCorp International",
              },
              {
                quote:
                  "The blockchain technology has given our customers complete confidence in our mineral authenticity. Our market share has increased by 40%.",
                author: "Marcus Thompson",
                role: "CEO",
                company: "Precious Metals Trading Co.",
              },
              {
                quote:
                  "Implementation was seamless and the results were immediate. Our compliance costs have dropped by 60% while improving our audit scores.",
                author: "Dr. Elena Rodriguez",
                role: "Compliance Officer",
                company: "Global Refining Solutions",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="w-6 h-6 text-[#0A77FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-white font-semibold">{testimonial.author}</div>
                      <div className="text-gray-400 text-sm">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your mineral supply chain operations and become the next success story in our portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/welcome"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Start Your Journey
              </a>
              <a
                href="/services"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
