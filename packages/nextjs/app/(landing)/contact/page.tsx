"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  User,
  Users,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@stoneproof.com",
      description: "Send us an email anytime",
      action: "mailto:hello@stoneproof.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 5pm",
      action: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Blockchain Street",
      description: "Tech City, TC 12345",
      action: "#",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security for your mineral data",
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "24/7 support across all time zones",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated blockchain and mining specialists",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060910]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in{" "}
              <span className="text-[#0A77FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to revolutionize your mineral supply chain? Let's discuss how StoneProof can transform your
              operations with blockchain technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#060910] to-[#10131A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-xl p-6 border border-[#23262F] hover:border-[#0A77FF]/30 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-[#0A77FF]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-[#0A77FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                <p className="text-[#0A77FF] font-semibold mb-2">{info.details}</p>
                <p className="text-gray-300 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#181B20] to-[#10131A] rounded-2xl p-8 border border-[#23262F]"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#252525] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#252525] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#252525] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[#252525] border border-[#23262F] text-white focus:outline-none focus:border-[#0A77FF] transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="demo">Request Demo</option>
                    <option value="pricing">Pricing Information</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-[#252525] border border-[#23262F] text-white placeholder-gray-400 focus:outline-none focus:border-[#0A77FF] transition-colors resize-none"
                    placeholder="Tell us about your mineral supply chain challenges and how we can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0A77FF] to-[#0A77FF]/80 hover:from-[#0A77FF]/90 hover:to-[#0A77FF]/70 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-[#0A77FF]/25"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>

            {/* Features & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Why Choose StoneProof?</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Join hundreds of companies already using StoneProof to revolutionize their mineral supply chains with
                  blockchain technology.
                </p>
              </div>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-[#0A77FF]/5 border border-[#0A77FF]/10"
                  >
                    <div className="w-12 h-12 bg-[#0A77FF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#0A77FF]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-[#0A77FF]/10 to-[#0A77FF]/5 rounded-xl p-6 border border-[#0A77FF]/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#0A77FF]" />
                  Response Time
                </h3>
                <p className="text-gray-300 mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="flex items-center text-[#0A77FF] font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Average response: 4 hours</span>
                </div>
              </div>
            </motion.div>
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
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a personalized demo to see how StoneProof can transform your mineral supply chain operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/welcome"
                className="bg-[#0A77FF] hover:bg-[#0A77FF]/80 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Schedule Demo</span>
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

export default Contact;
