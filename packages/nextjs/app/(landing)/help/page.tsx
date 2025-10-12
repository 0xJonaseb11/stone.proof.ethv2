"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  Lightbulb,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Star,
  Users,
  Video,
} from "lucide-react";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", count: 45 },
    { id: "getting-started", name: "Getting Started", count: 12 },
    { id: "account", name: "Account & Billing", count: 8 },
    { id: "technical", name: "Technical Issues", count: 15 },
    { id: "integration", name: "Integration", count: 10 },
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I get started with StoneProof?",
      answer:
        "Getting started with StoneProof is easy! First, create an account on our platform, then complete the onboarding process where you'll set up your company profile and verify your identity. Once verified, you can start registering minerals and tracking them through your supply chain.",
      type: "info",
    },
    {
      id: 2,
      category: "account",
      question: "How do I update my billing information?",
      answer:
        "You can update your billing information by going to your account settings and selecting 'Billing'. From there, you can update your payment method, billing address, and view your invoice history. All changes are applied immediately.",
      type: "info",
    },
    {
      id: 3,
      category: "technical",
      question: "Why is my mineral registration taking so long?",
      answer:
        "Mineral registration typically takes 2-5 minutes to complete on the blockchain. If it's taking longer, this could be due to network congestion or high gas fees. You can check the transaction status in your dashboard or contact support if it's been more than 30 minutes.",
      type: "warning",
    },
    {
      id: 4,
      category: "integration",
      question: "How do I integrate StoneProof with my existing systems?",
      answer:
        "StoneProof offers comprehensive APIs and SDKs for popular programming languages. You can find detailed integration guides in our documentation, or contact our technical team for custom integration support. We also offer white-label solutions for enterprise clients.",
      type: "info",
    },
    {
      id: 5,
      category: "getting-started",
      question: "What types of minerals can I track on StoneProof?",
      answer:
        "StoneProof supports tracking for all major minerals including precious metals (gold, silver, platinum), base metals (copper, zinc, lead), and industrial minerals (lithium, cobalt, rare earth elements). Our platform is designed to handle any mineral type with custom attributes.",
      type: "info",
    },
    {
      id: 6,
      category: "technical",
      question: "How secure is my data on StoneProof?",
      answer:
        "StoneProof uses enterprise-grade security including end-to-end encryption, multi-factor authentication, and blockchain immutability. All data is stored on decentralized networks with multiple backup systems. We're SOC 2 compliant and regularly audited by third-party security firms.",
      type: "success",
    },
  ];

  const helpResources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API references",
      href: "/docs",
      color: "from-[#0A77FF] to-[#0A77FF]/80",
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      href: "#tutorials",
      color: "from-[#4ECDC4] to-[#44A08D]",
    },
    {
      icon: FileText,
      title: "Knowledge Base",
      description: "Detailed articles and guides",
      href: "#knowledge-base",
      color: "from-[#667eea] to-[#764ba2]",
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users",
      href: "#forum",
      color: "from-[#f093fb] to-[#f5576c]",
    },
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 5 minutes",
      href: "#chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "24/7",
      responseTime: "< 4 hours",
      href: "/contact",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 8AM-6PM",
      responseTime: "Immediate",
      href: "tel:+15551234567",
    },
  ];

  const filteredFaqs = selectedCategory === "all" ? faqs : faqs.filter(faq => faq.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-[#0A77FF]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Help{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Center
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to your questions and get the support you need to make the most of StoneProof.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#181B20] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Help Resources</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive help resources to find the information you need.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center text-[#0A77FF] font-semibold text-sm">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Find quick answers to the most common questions about StoneProof.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80 text-white shadow-lg shadow-[#0A77FF]/25"
                    : "bg-gradient-to-br from-[#181B20] to-[#10131A] text-gray-300 hover:bg-[#23262F] border border-[#23262F] hover:border-[#0A77FF]/30"
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="font-medium">{category.name}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    selectedCategory === category.id ? "bg-white/20" : "bg-[#0A77FF]/20 text-[#0A77FF]"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl border border-[#23262F] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#23262F]/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {getTypeIcon(faq.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{faq.question}</h3>
                    </div>
                  </div>
                  {expandedFaq === faq.id ? (
                    <ChevronDown className="w-5 h-5 text-[#0A77FF] flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="pl-9">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get Support</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Still need help? Our support team is here to assist you with any questions or issues.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-8 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <option.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{option.title}</h3>
                <p className="text-gray-300 mb-6">{option.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{option.availability}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>Response: {option.responseTime}</span>
                  </div>
                </div>
                <a
                  href={option.href}
                  className="inline-block bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Get Help</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
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
            <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is ready to help you succeed with StoneProof.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/docs"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Help;
