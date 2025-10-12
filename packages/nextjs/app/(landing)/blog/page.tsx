"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import {
  ArrowRight,
  
  Calendar,
  ChevronRight,
  Clock,
  
  FileText,
  Filter,
  Mail,
  
  Settings,
  Star,
  Tag,
  TrendingUp,
  User,
} from "lucide-react";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts", count: 24 },
    { id: "blockchain", name: "Blockchain", count: 8 },
    { id: "mining", name: "Mining", count: 6 },
    { id: "industry", name: "Industry News", count: 5 },
    { id: "technology", name: "Technology", count: 5 },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Mineral Traceability: How Blockchain is Revolutionizing Supply Chains",
      excerpt:
        "Explore how blockchain technology is transforming mineral supply chains, ensuring transparency and trust from mine to market.",
      content:
        "Blockchain technology is revolutionizing mineral traceability by providing immutable records of mineral journeys from extraction to final sale. This transparency builds trust among all stakeholders and helps combat fraud in the industry.",
      author: "Alex Chen",
      role: "CEO & Co-Founder",
      date: "March 15, 2025",
      readTime: "5 min read",
      category: "blockchain",
      image: "/blog/blockchain-traceability.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "Sustainable Mining Practices: The Role of Technology in Environmental Stewardship",
      excerpt:
        "Discover how modern technology is helping mining companies reduce their environmental impact while maintaining profitability.",
      content:
        "Sustainable mining practices are becoming increasingly important as environmental regulations tighten and consumer demand for ethically sourced minerals grows. Technology plays a crucial role in achieving these goals.",
      author: "Dr. Michael Thompson",
      role: "Head of Mining Operations",
      date: "March 12, 2025",
      readTime: "7 min read",
      category: "mining",
      image: "/blog/sustainable-mining.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Regulatory Compliance in the Digital Age: What Mining Companies Need to Know",
      excerpt:
        "Navigate the complex landscape of mineral trading regulations with our comprehensive guide to digital compliance.",
      content:
        "As regulations become more complex and enforcement more stringent, mining companies must adapt to digital compliance solutions to stay competitive and avoid penalties.",
      author: "Maria Santos",
      role: "Head of Compliance",
      date: "March 10, 2025",
      readTime: "6 min read",
      category: "industry",
      image: "/blog/regulatory-compliance.jpg",
      featured: false,
    },
    {
      id: 4,
      title: "Smart Contracts in Mineral Trading: Automating Trust and Transparency",
      excerpt:
        "Learn how smart contracts are automating mineral trading processes, reducing costs and increasing efficiency.",
      content:
        "Smart contracts are revolutionizing mineral trading by automating complex processes that previously required manual intervention and multiple intermediaries.",
      author: "Sarah Rodriguez",
      role: "CTO & Co-Founder",
      date: "March 8, 2025",
      readTime: "4 min read",
      category: "technology",
      image: "/blog/smart-contracts.jpg",
      featured: true,
    },
    {
      id: 5,
      title: "The Rise of ESG in Mining: How Companies are Adapting to New Standards",
      excerpt:
        "Environmental, Social, and Governance (ESG) factors are reshaping the mining industry. Here's how companies are responding.",
      content:
        "ESG considerations are no longer optional for mining companies. Investors, consumers, and regulators are demanding greater transparency and accountability in mining operations.",
      author: "Lisa Wang",
      role: "Head of Product",
      date: "March 5, 2025",
      readTime: "8 min read",
      category: "industry",
      image: "/blog/esg-mining.jpg",
      featured: false,
    },
    {
      id: 6,
      title: "NFT Technology in Mineral Certification: Creating Digital Twins of Physical Assets",
      excerpt:
        "Discover how NFT technology is being used to create digital certificates for physical mineral assets, ensuring authenticity and provenance.",
      content:
        "NFT technology is being leveraged to create digital twins of physical mineral assets, providing immutable proof of authenticity and complete provenance tracking.",
      author: "James O'Connor",
      role: "Head of Security",
      date: "March 3, 2025",
      readTime: "5 min read",
      category: "technology",
      image: "/blog/nft-minerals.jpg",
      featured: false,
    },
    {
      id: 7,
      title: "Global Mineral Supply Chain Disruptions: Lessons from Recent Events",
      excerpt:
        "Analyze recent supply chain disruptions and learn how blockchain technology can help build more resilient supply chains.",
      content:
        "Recent global events have highlighted the fragility of traditional supply chains. Blockchain technology offers solutions for building more resilient and transparent supply networks.",
      author: "Alex Chen",
      role: "CEO & Co-Founder",
      date: "March 1, 2025",
      readTime: "6 min read",
      category: "industry",
      image: "/blog/supply-chain-disruptions.jpg",
      featured: false,
    },
    {
      id: 8,
      title: "The Economics of Mineral Traceability: ROI and Cost-Benefit Analysis",
      excerpt:
        "Understand the economic benefits of implementing mineral traceability solutions and how to calculate ROI.",
      content:
        "While implementing traceability solutions requires upfront investment, the long-term benefits in terms of efficiency, compliance, and market access often far outweigh the costs.",
      author: "Dr. Michael Thompson",
      role: "Head of Mining Operations",
      date: "February 28, 2025",
      readTime: "7 min read",
      category: "mining",
      image: "/blog/traceability-economics.jpg",
      featured: false,
    },
  ];

  const filteredPosts =
    activeCategory === "all" ? blogPosts : blogPosts.filter(post => post.category === activeCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              StoneProof{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Insights, trends, and innovations in blockchain-powered mineral traceability and supply chain
              transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Featured Articles</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our most popular and impactful articles on blockchain technology and mineral supply chains.
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="bg-[#0A77FF] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 ml-3 text-gray-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-gray-300 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-[#0A77FF]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{post.author}</div>
                      <div className="text-gray-400 text-sm">{post.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
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
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-[#0A77FF]" />
                      <span className="bg-[#0A77FF]/20 text-[#0A77FF] px-3 py-1 rounded-full text-sm capitalize">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-[#0A77FF]" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{post.author}</div>
                      <div className="flex items-center space-x-1 text-gray-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 text-[#0A77FF] hover:text-[#0A77FF]/80 text-sm font-semibold group">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#10131A] to-[#060910]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0A77FF]/10 to-[#0A77FF]/5 rounded-2xl p-8 border border-[#23262F]"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on blockchain technology, mineral traceability, and
              supply chain innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#181B20] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
                />
              </div>
              <button className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Insights Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Industry Insights</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Expert analysis and commentary on the latest trends in mineral supply chains and blockchain technology.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Trends",
                description: "Analysis of current market conditions and future outlook for mineral trading",
                icon: TrendingUp,
                posts: "12 articles",
              },
              {
                title: "Technology Updates",
                description: "Latest developments in blockchain and supply chain technology",
                icon: Settings,
                posts: "8 articles",
              },
              {
                title: "Regulatory News",
                description: "Updates on regulations affecting mineral trading and compliance",
                icon: FileText,
                posts: "6 articles",
              },
            ].map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0A77FF]/30 transition-colors">
                  <insight.icon className="w-6 h-6 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{insight.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{insight.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-[#0A77FF] text-sm font-semibold">{insight.posts}</div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#0A77FF] transition-colors" />
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

export default Blog;
