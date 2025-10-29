"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import StoneProof from "../../components/landing/Header/StoneProof";
import { motion } from "framer-motion";

const ROLES = [
  {
    title: "Miner",
    description: "Access mining operations, track resources, and manage your mining activities.",
    icon: "/landing/pic1.svg",
    route: "/miner",
  },
  {
    title: "Refiner",
    description: "Process and refine minerals with advanced tracking and quality control.",
    icon: "/landing/pic2.svg",
    route: "/refiner",
  },
  {
    title: "Buyer",
    description: "Purchase verified minerals with complete transparency and traceability.",
    icon: "/landing/pic3.svg",
    route: "/buyer",
  },
  {
    title: "Transporter",
    description: "Manage and track mineral transportation with real-time logistics monitoring.",
    icon: "/landing/verified.png",
    route: "/transporter",
  },
  {
    title: "Auditor",
    description: "Conduct thorough audits and ensure compliance with industry standards.",
    icon: "/landing/pic1.svg",
    route: "/auditor",
  },
  {
    title: "Inspector",
    description: "Perform detailed inspections and quality assessments of mineral products.",
    icon: "/landing/pic2.svg",
    route: "/inspector",
  },
  {
    title: "Super Admin",
    description: "Full system access with comprehensive management and oversight capabilities.",
    icon: "/landing/pic3.svg",
    route: "/admin",
  },
];

const CARD_GRADIENT = "linear-gradient(180deg, rgba(42,47,61,0.20) 0%, rgba(10,15,27,0.40) 100%)";

const RoleCard = ({
  title,
  description,
  icon,
  route,
  isVerified,
  userRole,
  onNavigate,
}: {
  title: string;
  description: string;
  icon: string;
  route: string;
  isVerified: boolean;
  userRole: string;
  onNavigate?: (role: string, route: string) => void;
}) => {
  const router = useRouter();
  const isActive = userRole && userRole.toLowerCase() === title.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={isActive ? { scale: 1.04, boxShadow: "0 0 0 4px #0A77FF33" } : {}}
      className={`rounded-xl border shadow-xl flex flex-col items-center justify-between p-4 min-h-[240px] relative group transition-all duration-200
        ${isActive ? "border-[#0A77FF] bg-[#0A77FF]/5" : "border-[#23262F]"}
      `}
      style={{
        backdropFilter: "blur(2px)",
        background: CARD_GRADIENT,
        boxShadow: isActive ? "0 0 16px 2px #0A77FF33" : undefined,
      }}
    >
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <span
            className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${isVerified ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
          >
            {isVerified ? "Verified" : "Unverified"}
          </span>
        </div>
        <p className="text-gray-400 text-xs text-center max-w-xs mb-3">{description}</p>
      </div>

      <div className="w-full flex justify-center relative mb-3">
        <img
          src={icon}
          alt={title}
          className="w-16 h-16 select-none pointer-events-none object-contain drop-shadow-2xl z-20"
        />
      </div>

      <div className="w-full flex justify-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (onNavigate) onNavigate(title, route);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors border bg-[#0A77FF]/10 hover:bg-[#0A77FF]/20 text-[#0A77FF] border-[#0A77FF]/20 text-sm font-medium`}
        >
          <span>Enter</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const Page = () => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigateMessage, setNavigateMessage] = useState("");

  if (isNavigating) {
    return (
      <div className="min-h-screen bg-[#060910]">
        <div className="h-screen flex items-center justify-center text-white">{navigateMessage}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060910] flex flex-col lg:flex-row">
      <div className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-12">
            <div className="mb-4 sm:mb-6">
              <StoneProof size="lg" />
            </div>
            <div
              className="relative mb-4 sm:mb-6 p-4 sm:p-8 rounded-xl overflow-hidden backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(10,119,255,0.08) 0%, rgba(10,119,255,0.03) 100%)",
                border: "1px solid rgba(10,119,255,0.15)",
                boxShadow: "0 0 20px rgba(10,119,255,0.05)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A77FF]/5 via-transparent to-[#0A77FF]/5"></div>
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Welcome to StoneProof</h2>
                <p className="text-base sm:text-xl text-gray-300 font-medium">
                  Your gateway to transparent mineral trading
                </p>
              </div>
            </div>
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Choose Your Portal</h1>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Select a portal below to explore role-specific workflows and dashboards.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ROLES.map((role, index) => (
              <RoleCard
                key={index}
                title={role.title}
                description={role.description}
                icon={role.icon}
                route={role.route}
                isVerified={false}
                userRole={""}
                onNavigate={(roleTitle, route) => {
                  setIsNavigating(true);
                  setNavigateMessage(`Navigating to your ${roleTitle.toLowerCase()} portal...`);
                  setTimeout(() => {
                    router.push(route);
                  }, 800);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* No sidebar on public page */}
    </div>
  );
};

export default Page;
