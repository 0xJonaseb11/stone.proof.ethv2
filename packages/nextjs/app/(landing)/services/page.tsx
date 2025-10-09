"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      icon: "⛏️",
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
      icon: "🏭",
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
      icon: "🚛",
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
      icon: "🔍",
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
      icon: "💱",
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
      icon: "📊",
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
      icon: "⛏️",
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
      icon: "🏭",
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
      icon: "🚛",
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
      icon: "🛒",
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
      icon: "🔍",
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
      icon: "📋",
    },
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small mining operations",
      features: [
        "Up to 100 mineral registrations",
        "Basic tracking and documentation",
        "Standard support",
        "Mobile app access",
        "Basic reporting",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "Ideal for growing enterprises",
      features: [
        "Up to 1,000 mineral registrations",
        "Advanced analytics and reporting",
        "Priority support",
        "API access",
        "Custom integrations",
        "Multi-user management",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored for large organizations",
      features: [
        "Unlimited registrations",
        "Custom workflows and integrations",
        "Dedicated account manager",
        "On-premise deployment options",
        "Advanced security features",
        "Custom training and onboarding",
      ],
      popular: false,
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

          {/* Service Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === service.id
                      ? "bg-[#0A77FF] text-white"
                      : "bg-[#181B20] text-gray-300 hover:bg-[#23262F]"
                  }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Active Service Details */}
            {services.map(
              service =>
                activeTab === service.id && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F]"
                  >
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center mb-4">
                          <span className="text-4xl mr-4">{service.icon}</span>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        </div>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-[#0A77FF] rounded-full mr-3"></div>
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={`bg-gradient-to-br ${service.color} rounded-xl p-8 text-center`}>
                        <div className="text-white">
                          <div className="text-6xl mb-4">{service.icon}</div>
                          <h4 className="text-xl font-bold mb-2">Get Started Today</h4>
                          <p className="text-sm opacity-90">Join thousands of companies already using our platform</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
            )}
          </div>
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
                <div className="text-4xl mb-4">{role.icon}</div>
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
              { name: "Base Layer 2", description: "Low-cost, high-speed transactions", icon: "⛓️" },
              { name: "Smart Contracts", description: "Automated business logic execution", icon: "📜" },
              { name: "NFT Technology", description: "Unique digital asset representation", icon: "🎫" },
              { name: "IPFS Storage", description: "Decentralized file storage", icon: "💾" },
              { name: "Zero-Knowledge Proofs", description: "Privacy-preserving verification", icon: "🔐" },
              { name: "Real-time APIs", description: "Instant data synchronization", icon: "⚡" },
              { name: "Mobile Apps", description: "On-the-go access and management", icon: "📱" },
              { name: "AI Analytics", description: "Intelligent insights and predictions", icon: "🤖" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] text-center hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-300 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your organization's needs. All plans include our core blockchain features.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border ${
                  tier.popular ? "border-[#0A77FF]" : "border-[#23262F]"
                } hover:border-[#0A77FF]/30 transition-colors`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#0A77FF] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400 ml-1">{tier.period}</span>
                  </div>
                  <p className="text-gray-300">{tier.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-[#0A77FF] rounded-full mr-3"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    tier.popular
                      ? "bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white"
                      : "border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10"
                  }`}
                >
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
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
