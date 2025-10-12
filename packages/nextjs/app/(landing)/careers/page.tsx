"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Clock,
  Coffee,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

const Careers = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Positions", count: 12 },
    { id: "engineering", name: "Engineering", count: 5 },
    { id: "product", name: "Product", count: 3 },
    { id: "marketing", name: "Marketing", count: 2 },
    { id: "operations", name: "Operations", count: 2 },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Senior Blockchain Developer",
      category: "engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead the development of our blockchain infrastructure for mineral traceability.",
      requirements: [
        "5+ years of blockchain development experience",
        "Expertise in Solidity and smart contracts",
        "Experience with Layer 2 solutions",
        "Strong understanding of supply chain systems",
      ],
      benefits: ["Competitive salary", "Equity options", "Remote work", "Health insurance"],
      featured: true,
    },
    {
      id: 2,
      title: "Product Manager - Supply Chain",
      category: "product",
      location: "New York, NY",
      type: "Full-time",
      experience: "4+ years",
      description: "Drive product strategy for our mineral supply chain platform.",
      requirements: [
        "4+ years of product management experience",
        "Background in supply chain or logistics",
        "Experience with B2B SaaS products",
        "Strong analytical skills",
      ],
      benefits: ["Competitive salary", "Equity options", "Flexible hours", "Learning budget"],
      featured: false,
    },
    {
      id: 3,
      title: "Frontend Developer",
      category: "engineering",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Build beautiful and intuitive user interfaces for our platform.",
      requirements: [
        "3+ years of React/Next.js experience",
        "Strong TypeScript skills",
        "Experience with modern CSS frameworks",
        "Portfolio of previous work",
      ],
      benefits: ["Competitive salary", "Remote work", "Health insurance", "Equipment budget"],
      featured: false,
    },
    {
      id: 4,
      title: "Marketing Manager",
      category: "marketing",
      location: "Remote / London",
      type: "Full-time",
      experience: "3+ years",
      description: "Lead our marketing efforts in the mining and blockchain space.",
      requirements: [
        "3+ years of B2B marketing experience",
        "Knowledge of blockchain/crypto industry",
        "Experience with content marketing",
        "Strong communication skills",
      ],
      benefits: ["Competitive salary", "Remote work", "Marketing budget", "Conference attendance"],
      featured: false,
    },
    {
      id: 5,
      title: "DevOps Engineer",
      category: "engineering",
      location: "Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Manage and scale our cloud infrastructure for global operations.",
      requirements: [
        "4+ years of DevOps experience",
        "Expertise in AWS/GCP",
        "Experience with Kubernetes",
        "Strong security knowledge",
      ],
      benefits: ["Competitive salary", "Remote work", "Health insurance", "Certification budget"],
      featured: false,
    },
    {
      id: 6,
      title: "Business Development Manager",
      category: "operations",
      location: "Remote / Singapore",
      type: "Full-time",
      experience: "5+ years",
      description: "Build partnerships with mining companies and industry stakeholders.",
      requirements: [
        "5+ years of B2B sales experience",
        "Background in mining or commodities",
        "Strong relationship building skills",
        "International experience preferred",
      ],
      benefits: ["Competitive salary", "Commission", "Travel budget", "Health insurance"],
      featured: false,
    },
  ];

  const companyValues = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security and integrity of mineral data above all else.",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Our work helps create more transparent and sustainable supply chains worldwide.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible with blockchain technology.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives.",
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Above-market salaries and equity participation",
    },
    {
      icon: Globe,
      title: "Remote-First Culture",
      description: "Work from anywhere in the world",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness programs",
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Annual learning budget and conference attendance",
    },
    {
      icon: Coffee,
      title: "Flexible Schedule",
      description: "Work-life balance with flexible hours",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career paths and growth opportunities",
    },
  ];

  const filteredJobs =
    activeCategory === "all" ? jobOpenings : jobOpenings.filter(job => job.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Join Our{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Mission
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Help us revolutionize mineral supply chains through blockchain technology. Join a team of passionate
              innovators building the future of transparency and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Work With Us?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We offer competitive benefits and a supportive environment to help you thrive.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#0A77FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Join our team and help build the future of mineral supply chain transparency.
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
                <Briefcase className="w-4 h-4" />
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

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border transition-colors ${
                  job.featured
                    ? "border-[#0A77FF] shadow-lg shadow-[#0A77FF]/25"
                    : "border-[#23262F] hover:border-[#0A77FF]/30"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      {job.featured && (
                        <div className="flex items-center mr-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="bg-[#0A77FF] text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                      <span className="bg-[#0A77FF]/20 text-[#0A77FF] px-3 py-1 rounded-full text-sm capitalize">
                        {job.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {job.experience}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
            <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your resume and let us know how
              you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Resume</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/about"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Learn About Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
