"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Code,
  Copy,
  Database,
  ExternalLink,
  FileText,
  Globe,
  Key,
  Lock,
  Play,
  Settings,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";

const API = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeEndpoint, setActiveEndpoint] = useState("authentication");
  const [expandedSection, setExpandedSection] = useState<string | null>("getting-started");

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const apiEndpoints = [
    {
      id: "authentication",
      title: "Authentication",
      method: "POST",
      path: "/api/v1/auth/login",
      description: "Authenticate and get access token",
      color: "from-green-500 to-green-600",
    },
    {
      id: "register-mineral",
      title: "Register Mineral",
      method: "POST",
      path: "/api/v1/minerals/register",
      description: "Register a new mineral on the blockchain",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "get-mineral",
      title: "Get Mineral",
      method: "GET",
      path: "/api/v1/minerals/{id}",
      description: "Retrieve mineral information by ID",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "update-mineral",
      title: "Update Mineral",
      method: "PUT",
      path: "/api/v1/minerals/{id}",
      description: "Update mineral information",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "track-supply-chain",
      title: "Track Supply Chain",
      method: "GET",
      path: "/api/v1/supply-chain/{mineralId}",
      description: "Get complete supply chain history",
      color: "from-pink-500 to-pink-600",
    },
  ];

  const codeExamples = {
    authentication: `// Authentication Example
curl -X POST https://api.stoneproof.com/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "your@email.com",
    "password": "your-password"
  }'

// Response
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "token_type": "Bearer"
  }
}`,
    "register-mineral": `// Register Mineral Example
curl -X POST https://api.stoneproof.com/v1/minerals/register \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "type": "gold",
    "weight": 1000,
    "purity": 99.9,
    "origin": {
      "mine": "Sunrise Mine",
      "coordinates": [40.7128, -74.0060],
      "timestamp": "2024-01-15T10:30:00Z"
    },
    "certification": {
      "standard": "ISO-9001",
      "certificate_number": "CERT-2024-001"
    }
  }'

// Response
{
  "success": true,
  "data": {
    "mineral_id": "MIN-2024-001",
    "blockchain_hash": "0x1234567890abcdef...",
    "transaction_id": "0xabcdef1234567890...",
    "status": "registered"
  }
}`,
    "get-mineral": `// Get Mineral Example
curl -X GET https://api.stoneproof.com/v1/minerals/MIN-2024-001 \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

// Response
{
  "success": true,
  "data": {
    "mineral_id": "MIN-2024-001",
    "type": "gold",
    "weight": 1000,
    "purity": 99.9,
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "blockchain_hash": "0x1234567890abcdef...",
    "supply_chain": [
      {
        "stage": "mining",
        "location": "Sunrise Mine",
        "timestamp": "2024-01-15T10:30:00Z",
        "verified": true
      }
    ]
  }
}`,
  };

  const apiFeatures = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with OAuth 2.0 and JWT tokens",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Sub-second response times with 99.9% uptime SLA",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Fast API responses from edge locations worldwide",
    },
    {
      icon: Database,
      title: "Real-time Data",
      description: "Live blockchain data with WebSocket support",
    },
  ];

  const sdkLanguages = [
    { name: "JavaScript", version: "v2.1.0", downloads: "10K+" },
    { name: "Python", version: "v1.8.2", downloads: "8K+" },
    { name: "Java", version: "v1.5.1", downloads: "5K+" },
    { name: "Go", version: "v1.2.0", downloads: "3K+" },
    { name: "PHP", version: "v1.1.5", downloads: "2K+" },
    { name: "Ruby", version: "v1.0.8", downloads: "1K+" },
  ];

  const documentationSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Play,
      items: ["API Overview", "Authentication", "Rate Limits", "Error Handling"],
    },
    {
      id: "minerals",
      title: "Minerals API",
      icon: Database,
      items: ["Register Mineral", "Get Mineral", "Update Mineral", "List Minerals"],
    },
    {
      id: "supply-chain",
      title: "Supply Chain API",
      icon: Globe,
      items: ["Track Supply Chain", "Add Stage", "Verify Stage", "Get History"],
    },
    {
      id: "webhooks",
      title: "Webhooks",
      icon: Activity,
      items: ["Setup Webhooks", "Event Types", "Security", "Testing"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              API{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Reference
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Integrate StoneProof's blockchain-powered mineral traceability into your applications with our
              comprehensive REST API.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#getting-started"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/docs"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Full Documentation</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Features</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Built for developers, with enterprise-grade features and comprehensive documentation.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Endpoints</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our RESTful API endpoints for mineral registration and supply chain tracking.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Endpoint List */}
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveEndpoint(endpoint.id)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all ${
                    activeEndpoint === endpoint.id
                      ? "bg-gradient-to-br from-[#181B20] to-[#10131A] border-[#0A77FF] shadow-lg shadow-[#0A77FF]/25"
                      : "bg-gradient-to-br from-[#181B20] to-[#10131A] border-[#23262F] hover:border-[#0A77FF]/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{endpoint.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${endpoint.color}`}
                    >
                      {endpoint.method}
                    </span>
                  </div>
                  <code className="text-[#0A77FF] text-sm font-mono bg-[#0A0F1A] px-3 py-1 rounded">
                    {endpoint.path}
                  </code>
                  <p className="text-gray-300 text-sm mt-3">{endpoint.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Code Example */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-[#0A77FF]" />
                  <span className="text-white font-semibold">Code Example</span>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(codeExamples[activeEndpoint as keyof typeof codeExamples] || "", activeEndpoint)
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-[#0A77FF]/20 hover:bg-[#0A77FF]/30 text-[#0A77FF] rounded-lg transition-colors"
                >
                  {copiedCode === activeEndpoint ? (
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
                <code className="text-gray-300 text-sm leading-relaxed">
                  {codeExamples[activeEndpoint as keyof typeof codeExamples] ||
                    "Select an endpoint to view code example"}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SDK Downloads */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">SDK Downloads</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get started quickly with our official SDKs for popular programming languages.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdkLanguages.map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{sdk.name}</h3>
                  <span className="text-[#0A77FF] text-sm font-semibold">{sdk.version}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{sdk.downloads} downloads</p>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
                    Download
                  </button>
                  <button className="px-4 py-2 border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 rounded-lg transition-colors text-sm">
                    Docs
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Navigation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">API Documentation</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comprehensive guides and references for all API endpoints and features.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentationSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl border border-[#23262F] overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[#23262F]/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <section.icon className="w-5 h-5 text-[#0A77FF]" />
                    <span className="text-white font-semibold">{section.title}</span>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronDown className="w-5 h-5 text-[#0A77FF]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href="#"
                          className="block text-gray-300 hover:text-[#0A77FF] transition-colors text-sm py-1"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Integrate?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start building with our API today. Get your API key and begin integrating StoneProof into your
              applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Key className="w-4 h-4" />
                <span>Get API Key</span>
              </a>
              <a
                href="/docs"
                className="border border-[#0A77FF] text-[#0A77FF] hover:bg-[#0A77FF]/10 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Docs</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default API;
