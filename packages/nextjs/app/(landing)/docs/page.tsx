"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Code,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Play,
  Search,
  Shield,
  Users,
  Zap,
} from "lucide-react";

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const documentationSections = [
    {
      title: "Getting Started",
      icon: Play,
      color: "from-[#0A77FF] to-[#0A77FF]/80",
      articles: [
        {
          title: "Quick Start Guide",
          description: "Get up and running with StoneProof in minutes",
          time: "5 min read",
          difficulty: "Beginner",
        },
        {
          title: "Platform Overview",
          description: "Understanding the StoneProof ecosystem",
          time: "10 min read",
          difficulty: "Beginner",
        },
        {
          title: "Account Setup",
          description: "Creating and configuring your account",
          time: "8 min read",
          difficulty: "Beginner",
        },
      ],
    },
    {
      title: "API Reference",
      icon: Code,
      color: "from-[#4ECDC4] to-[#44A08D]",
      articles: [
        {
          title: "Authentication",
          description: "API keys and authentication methods",
          time: "12 min read",
          difficulty: "Intermediate",
        },
        {
          title: "Mineral Registration",
          description: "Register and track minerals on the blockchain",
          time: "15 min read",
          difficulty: "Intermediate",
        },
        {
          title: "Supply Chain Tracking",
          description: "Track minerals through the supply chain",
          time: "18 min read",
          difficulty: "Advanced",
        },
      ],
    },
    {
      title: "Integration Guides",
      icon: FileText,
      color: "from-[#667eea] to-[#764ba2]",
      articles: [
        {
          title: "Mining Company Integration",
          description: "Integrate with existing mining operations",
          time: "25 min read",
          difficulty: "Advanced",
        },
        {
          title: "Refinery Integration",
          description: "Connect refineries to the platform",
          time: "20 min read",
          difficulty: "Advanced",
        },
        {
          title: "Transportation Integration",
          description: "Track shipments and logistics",
          time: "22 min read",
          difficulty: "Advanced",
        },
      ],
    },
  ];

  const quickLinks = [
    {
      title: "SDK Downloads",
      description: "Get our SDKs for popular languages",
      icon: Download,
      href: "#downloads",
    },
    {
      title: "API Playground",
      description: "Test API endpoints in your browser",
      icon: Play,
      href: "#playground",
    },
    {
      title: "Community Forum",
      description: "Get help from the community",
      icon: Users,
      href: "#forum",
    },
    {
      title: "Status Page",
      description: "Check platform status and uptime",
      icon: Shield,
      href: "#status",
    },
  ];

  const codeExample = `// Initialize StoneProof SDK
import { StoneProofSDK } from '@stoneproof/sdk';

const sdk = new StoneProofSDK({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Register a new mineral
const mineral = await sdk.minerals.register({
  type: 'gold',
  weight: 1000, // grams
  origin: {
    mine: 'Mine Name',
    coordinates: [lat, lng],
    timestamp: new Date()
  },
  quality: {
    purity: 99.9,
    certification: 'ISO-9001'
  }
});

console.log('Mineral registered:', mineral.id);`;

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Developer{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Everything you need to integrate StoneProof's blockchain-powered mineral traceability into your
              applications.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#181B20] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quick Links</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Get started quickly with these essential resources.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors cursor-pointer group"
              >
                <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0A77FF]/30 transition-colors">
                  <link.icon className="w-6 h-6 text-[#0A77FF]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{link.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{link.description}</p>
                <div className="flex items-center text-[#0A77FF] font-semibold text-sm">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Documentation</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive guides and references for developers and integrators.
            </p>
          </motion.div>

          <div className="space-y-8">
            {documentationSections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F]"
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center mr-6 shadow-lg`}
                  >
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                    <p className="text-gray-300">Essential guides and references</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.articles.map((article, articleIndex) => (
                    <motion.div
                      key={articleIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.1 + articleIndex * 0.05 }}
                      className="bg-[#0A0F1A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white group-hover:text-[#0A77FF] transition-colors">
                          {article.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#0A77FF] transition-colors" />
                      </div>
                      <p className="text-gray-300 text-sm mb-4">{article.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{article.time}</span>
                        <span
                          className={`px-2 py-1 rounded-full ${
                            article.difficulty === "Beginner"
                              ? "bg-green-500/20 text-green-400"
                              : article.difficulty === "Intermediate"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {article.difficulty}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quick Example</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">See how easy it is to get started with our SDK.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0A0F1A] rounded-2xl p-8 border border-[#23262F]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5 text-[#0A77FF]" />
                <span className="text-white font-semibold">JavaScript SDK Example</span>
              </div>
              <button
                onClick={() => copyToClipboard(codeExample, "example")}
                className="flex items-center space-x-2 px-4 py-2 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 text-[#0A77FF] rounded-lg transition-colors"
              >
                {copiedCode === "example" ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="bg-[#060910] rounded-lg p-6 overflow-x-auto">
              <code className="text-gray-300 text-sm leading-relaxed">{codeExample}</code>
            </pre>
          </motion.div>
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
            <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our developer support team is here to help you integrate StoneProof
              successfully.
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

export default Docs;
