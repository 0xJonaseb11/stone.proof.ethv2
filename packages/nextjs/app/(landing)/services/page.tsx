"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BarChart3,
  Brain,
  CheckCircle,
  DollarSign,
  Factory,
  FileText,
  Globe,
  Link,
  Pickaxe,
  Search,
  Shield,
  Smartphone,
  Truck,
  Users,
  Zap,
} from "lucide-react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("mining");

  const services = [
    {
      id: "mining",
      title: "Mining Operations",
      description: "Complete mineral registration and tracking from extraction to initial processing.",
      features: [
        "Mineral Registration & Tokenization",
        "Origin Verification & Documentation",
        "Quality Assessment & Certification",
        "Blockchain-based Ownership Records",
        "Real-time Status Updates",
        "Compliance & Regulatory Reporting",
      ],
      icon: Pickaxe,
      color: "from-[#FF6B35] to-[#FF8E53]",
    },
    {
      id: "refining",
      title: "Refining & Processing",
      description: "Advanced processing workflows with complete traceability and quality control.",
      features: [
        "Processing Stage Documentation",
        "Quality Control & Testing",
        "Batch Tracking & Management",
        "Refinement Certification",
        "Chain of Custody Records",
        "Automated Compliance Checks",
      ],
      icon: Factory,
      color: "from-[#4ECDC4] to-[#44A08D]",
    },
    {
      id: "transport",
      title: "Transportation & Logistics",
      description: "Secure transportation tracking with real-time location and condition monitoring.",
      features: [
        "Real-time Location Tracking",
        "Condition Monitoring",
        "Secure Transfer Protocols",
        "Route Optimization",
        "Delivery Confirmation",
        "Insurance & Risk Management",
      ],
      icon: Truck,
      color: "from-[#667eea] to-[#764ba2]",
    },
    {
      id: "inspection",
      title: "Inspection & Validation",
      description: "Comprehensive inspection services ensuring quality and compliance standards.",
      features: [
        "Third-party Inspections",
        "Quality Verification",
        "Compliance Auditing",
        "Documentation Review",
        "Risk Assessment",
        "Certification Services",
      ],
      icon: Search,
      color: "from-[#f093fb] to-[#f5576c]",
    },
    {
      id: "trading",
      title: "Trading & Marketplace",
      description: "Transparent trading platform with verified mineral assets and secure transactions.",
      features: [
        "Verified Asset Listings",
        "Secure Trading Platform",
        "Price Discovery Mechanisms",
        "Transaction Settlement",
        "Dispute Resolution",
        "Market Analytics",
      ],
      icon: DollarSign,
      color: "from-[#4facfe] to-[#00f2fe]",
    },
    {
      id: "analytics",
      title: "Analytics & Reporting",
      description: "Advanced analytics and reporting tools for data-driven decision making.",
      features: [
        "Supply Chain Analytics",
        "Performance Dashboards",
        "Custom Reporting",
        "Predictive Analytics",
        "Compliance Monitoring",
        "Business Intelligence",
      ],
      icon: BarChart3,
      color: "from-[#43e97b] to-[#38f9d7]",
    },
  ];

  const roleBenefits = [
    {
      role: "Miners",
      benefits: [
        "Streamlined mineral registration process",
        "Automated compliance documentation",
        "Enhanced market access and pricing",
        "Reduced administrative overhead",
        "Improved traceability and provenance",
      ],
      icon: Pickaxe,
    },
    {
      role: "Refiners",
      benefits: [
        "Automated processing workflows",
        "Quality control integration",
        "Batch tracking and management",
        "Compliance automation",
        "Enhanced customer trust",
      ],
      icon: Factory,
    },
    {
      role: "Transporters",
      benefits: [
        "Real-time tracking capabilities",
        "Route optimization tools",
        "Automated documentation",
        "Risk management features",
        "Customer transparency",
      ],
      icon: Truck,
    },
    {
      role: "Buyers",
      benefits: [
        "Verified mineral provenance",
        "Quality assurance guarantees",
        "Transparent pricing information",
        "Secure transaction processing",
        "Comprehensive asset history",
      ],
      icon: Users,
    },
    {
      role: "Inspectors",
      benefits: [
        "Digital inspection tools",
        "Automated reporting systems",
        "Quality assessment frameworks",
        "Compliance verification tools",
        "Documentation management",
      ],
      icon: Search,
    },
    {
      role: "Auditors",
      benefits: [
        "Comprehensive audit trails",
        "Automated compliance checking",
        "Risk assessment tools",
        "Documentation verification",
        "Regulatory reporting",
      ],
      icon: FileText,
    },
  ];

  const successMetrics = [
    {
      metric: "50+",
      label: "Countries Served",
      description: "Global reach across major mining regions",
      icon: Globe,
    },
    {
      metric: "10,000+",
      label: "Minerals Tracked",
      description: "Successfully registered and monitored",
      icon: CheckCircle,
    },
    {
      metric: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable platform availability",
      icon: Shield,
    },
    {
      metric: "500+",
      label: "Enterprise Clients",
      description: "Trusted by industry leaders",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive blockchain-powered solutions for every stakeholder in the mineral supply chain, from
              extraction to final sale.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Complete Supply Chain Solutions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform provides end-to-end services for every participant in the mineral supply chain, ensuring
              transparency, security, and efficiency at every step.
            </p>
          </motion.div>

          {/* Service Tabs Carousel */}
          <div className="mb-12">
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={() => {
                  const currentIndex = services.findIndex(s => s.id === activeTab);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : services.length - 1;
                  setActiveTab(services[prevIndex].id);
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 rounded-full flex items-center justify-center text-[#0A77FF] transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const currentIndex = services.findIndex(s => s.id === activeTab);
                  const nextIndex = currentIndex < services.length - 1 ? currentIndex + 1 : 0;
                  setActiveTab(services[nextIndex].id);
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 rounded-full flex items-center justify-center text-[#0A77FF] transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Tab Carousel Container */}
              <div className="overflow-hidden mx-12">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${services.findIndex(s => s.id === activeTab) * 100}%)`,
                  }}
                >
                  {services.map(service => (
                    <div key={service.id} className="min-w-full flex-shrink-0">
                      <button
                        onClick={() => setActiveTab(service.id)}
                        className={`w-full p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                          activeTab === service.id
                            ? "bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80 text-white shadow-lg shadow-[#0A77FF]/25"
                            : "bg-gradient-to-br from-[#181B20] to-[#10131A] text-gray-300 hover:bg-[#23262F] border border-[#23262F] hover:border-[#0A77FF]/30"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              activeTab === service.id ? "bg-white/20" : "bg-[#0A77FF]/20"
                            }`}
                          >
                            <service.icon
                              className={`w-6 h-6 ${activeTab === service.id ? "text-white" : "text-[#0A77FF]"}`}
                            />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                            <p className="text-sm opacity-80 line-clamp-2">{service.description}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeTab === service.id ? "bg-[#0A77FF] scale-125" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active Service Details */}
          {services.map(
            service =>
              activeTab === service.id && (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-3xl p-8 border border-[#23262F] shadow-2xl"
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#0A77FF] to-[#0A77FF]/80 rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-[#0A77FF]/25">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
                          <div className="w-20 h-1 bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/50 rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-8 text-lg leading-relaxed">{service.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {service.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 rounded-lg bg-[#0A77FF]/5 border border-[#0A77FF]/10 hover:bg-[#0A77FF]/10 transition-colors"
                          >
                            <div className="w-2 h-2 bg-[#0A77FF] rounded-full mr-4 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`bg-gradient-to-br ${service.color} rounded-3xl p-8 text-center relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative text-white">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                          <service.icon className="w-12 h-12 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold mb-3">Get Started Today</h4>
                        <p className="text-sm opacity-90 mb-6">
                          Join thousands of companies already using our platform
                        </p>
                        <button className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </div>
      </section>

      {/* Role-Based Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Benefits by Role</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover how StoneProof transforms operations for each stakeholder in the mineral supply chain.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleBenefits.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center mb-4">
                  <role.icon className="w-6 h-6 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{role.role}</h3>
                <ul className="space-y-2">
                  {role.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-[#0A77FF] rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Powered by Advanced Technology</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Built on cutting-edge blockchain technology with enterprise-grade security and scalability.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Base Layer 2", description: "Low-cost, high-speed transactions", icon: Link },
              { name: "Smart Contracts", description: "Automated business logic execution", icon: FileText },
              { name: "NFT Technology", description: "Unique digital asset representation", icon: Award },
              { name: "IPFS Storage", description: "Decentralized file storage", icon: Shield },
              { name: "Zero-Knowledge Proofs", description: "Privacy-preserving verification", icon: Shield },
              { name: "Real-time APIs", description: "Instant data synchronization", icon: Zap },
              { name: "Mobile Apps", description: "On-the-go access and management", icon: Smartphone },
              { name: "AI Analytics", description: "Intelligent insights and predictions", icon: Brain },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] text-center hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <tech.icon className="w-6 h-6 text-[#0A77FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-300 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform has proven its value across the global mineral supply chain with impressive results.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] text-center hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{metric.metric}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{metric.label}</h3>
                <p className="text-gray-300 text-sm">{metric.description}</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Supply Chain?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using StoneProof to revolutionize their mineral supply chain
              operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/welcome"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Start Free Trial
              </a>
              <a
                href="/about"
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

export default Services;
