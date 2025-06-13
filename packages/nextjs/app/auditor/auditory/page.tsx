"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AlertCircle, ChevronDown, Copy, Loader2 } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ConnectWalletView = ({ isLoading, role }: { isLoading: boolean; role: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
    <div className="max-w-md w-full p-8 rounded-xl bg-[#1A1A1A] border border-[#323539] shadow-xl">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Connect Your {role} Wallet</h2>
      <p className="text-gray-400 text-center mb-6">Please connect your wallet to audit minerals</p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
    {isLoading && (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-accentBlue" />
        <p className="text-sm text-gray-400">Connecting wallet...</p>
      </div>
    )}
  </div>
);

export default function AuditMinerals() {
  const { address, isConnected, isConnecting } = useAccount();
  const [form, setForm] = useState({ mineralId: "", report: "" });
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [inputMethod, setInputMethod] = useState<"select" | "manual">("select");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const validateForm = useCallback(() => {
    return isConnected && form.mineralId.trim() && form.report.trim();
  }, [isConnected, form.mineralId, form.report]);

  const { writeContractAsync } = useScaffoldWriteContract("RolesManager");

  const resetForm = () => {
    setForm({ mineralId: "", report: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectMineral = (mineralId: string) => {
    setForm(prev => ({ ...prev, mineralId }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !validateForm()) return;

    setIsTransactionPending(true);
    try {
      const tx = await writeContractAsync({
        functionName: "_auditMineral",
        args: [form.mineralId.trim(), form.report.trim()],
      });

      console.log("Transaction submitted:", tx);
      resetForm();
    } catch (err: any) {
      console.error("Transaction error:", err);
    } finally {
      setIsTransactionPending(false);
    }
  };

  const pendingMinerals = [
    {
      id: "GOLD-0x8e07d295",
      name: "Gold",
      date: "15/05/2025",
      purity: 92,
      quantity: "150 KG",
      price: "$45,000",
      image: "/dashboard/gold.jpeg",
      description: "Pure gold bar with certified authenticity",
    },
    {
      id: "COBALT-0xa3f5e1d2",
      name: "Cobalt",
      date: "15/05/2025",
      purity: 88,
      quantity: "200 KG",
      price: "$6,000",
      image: "/dashboard/cobalt.png",
      description: "Pure cobalts bar with certified authenticity",
    },
    {
      id: "IRON-0xb2c4e3f1",
      name: "Iron",
      date: "15/05/2025",
      purity: 90,
      quantity: "100 KG",
      price: "$8,000",
      image: "/dashboard/gold.jpeg",
      description: "Pure iron bar with certified authenticity",
    },
    {
      id: "SILVER-0xa3f5e1d2",
      name: "Silver Bullion",
      type: "Silver",
      purity: 99.5,
      weight: "5 kg",
      price: "3,800",
      origin: "Mexico",
      image: "/dashboard/gold.jpeg",
      description: "Investment-grade silver bullion with assay certificate",
    },
    {
      id: "COPPER-0xb2c4e3f1",
      name: "Copper Cathode",
      type: "Copper",
      purity: 99.99,
      weight: "100 kg",
      price: "900",
      origin: "Chile",
      image: "/dashboard/gold.jpeg",
      description: "High-grade copper cathode for industrial use",
    },
    {
      id: "LITHIUM-0xc5d6e7f8",
      name: "Lithium Carbonate",
      type: "Lithium",
      purity: 99.5,
      weight: "500 kg",
      price: "12,000",
      origin: "Australia",
      image: "/dashboard/gold.jpeg",
      description: "Battery-grade lithium carbonate for EV production",
    },
    {
      id: "COBALT-0xd9e8f7a6",
      name: "Cobalt Ingot",
      type: "Cobalt",
      purity: 99.8,
      weight: "25 kg",
      price: "18,750",
      origin: "DR Congo",
      image: "/dashboard/gold.jpeg",
      description: "High-purity cobalt for aerospace and battery applications",
    },
    {
      id: "PLATINUM-0xe1f2a3b4",
      name: "Platinum Bar",
      type: "Platinum",
      purity: 99.95,
      weight: "1 kg",
      price: "32,000",
      origin: "Russia",
      image: "/dashboard/gold.jpeg",
      description: "Certified platinum bar with unique serial number",
    },
  ];

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} role="Auditor" />;
  }

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent">
            Audit Minerals
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mt-3">
            Submit audit reports for minerals in the supply chain. Provide detailed information about your findings.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Minerals List */}
          <div className="w-full lg:w-2/5">
            <div className="bg-[#1A1A1A] rounded-xl p-5 border border-[#323539] shadow-lg">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold">Minerals waiting for Auditory</h2>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-[#252525] hover:bg-[#2A2A2A] rounded-lg px-4 py-2 text-sm transition-colors"
                  >
                    {inputMethod === "select" ? "Select Mineral" : "Enter ID Manually"}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#252525] rounded-md shadow-lg z-10 border border-[#323539]">
                      <button
                        onClick={() => {
                          setInputMethod("select");
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "select" ? "bg-accentBlue text-white" : "text-gray-200 hover:bg-[#2A2A2A]"
                        }`}
                      >
                        Select Mineral
                      </button>
                      <button
                        onClick={() => {
                          setInputMethod("manual");
                          setIsDropdownOpen(false);
                          setForm(prev => ({ ...prev, mineralId: "" }));
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          inputMethod === "manual" ? "bg-accentBlue text-white" : "text-gray-200 hover:bg-[#2A2A2A]"
                        }`}
                      >
                        Enter ID Manually
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {inputMethod === "select" ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                  {pendingMinerals.map(mineral => (
                    <div
                      key={mineral.id}
                      onClick={() => handleSelectMineral(mineral.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        form.mineralId === mineral.id
                          ? "border-accentBlue bg-accentBlue/10"
                          : "border-[#323539] hover:border-[#404040] bg-[#252525] hover:bg-[#2A2A2A]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image width={48} height={48} alt={mineral.name} src={mineral.image} className="rounded-md" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg">{mineral.name}</h3>
                            <span className="text-xs text-gray-400">{mineral.date}</span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs mb-1 flex justify-between">
                              <span>Purity: {mineral.purity}%</span>
                              <span className="text-accentBlue">{form.mineralId === mineral.id ? "Selected" : ""}</span>
                            </div>
                            <div className="h-2 bg-[#323539] rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  mineral.purity > 90
                                    ? "bg-green-200"
                                    : mineral.purity > 80
                                      ? "bg-blue-100"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${mineral.purity}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="bg-[#1A1A1A] rounded p-2">
                              <div className="text-xs text-gray-400">Quantity</div>
                              <div className="font-medium">{mineral.quantity}</div>
                            </div>
                            <div className="bg-[#1A1A1A] rounded p-2">
                              <div className="text-xs text-gray-400">Value</div>
                              <div className="font-medium">{mineral.price}</div>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-400 break-all">ID: {mineral.id}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-[#252525] p-4 rounded-lg border border-[#323539]">
                    <label className="block text-sm font-medium mb-2">Enter Mineral ID</label>
                    <input
                      name="mineralId"
                      value={form.mineralId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#323539] focus:border-accentBlue focus:ring-1 focus:ring-accentBlue outline-none transition-all"
                      placeholder="e.g. GOLD-0x8e07d295"
                    />
                  </div>
                  <div className="bg-accentBlue/10 border border-accentBlue/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 mt-0.5 text-accentBlue flex-shrink-0" />
                      <div className="text-sm text-blue-200">
                        <p className="font-medium">Need help finding the Mineral ID?</p>
                        <p className="mt-1 opacity-80">
                          Check the mineral's details page or transaction history for its unique identifier. Mineral IDs
                          are typically in format "TYPE-0x...".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Audit Form */}
          <div className="w-full lg:w-3/5">
            <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl p-6 border border-[#323539] shadow-lg">
              <h2 className="text-xl font-semibold mb-6">Audit Report</h2>

              {inputMethod === "select" && form.mineralId && (
                <div className="mb-5 p-3 bg-[#252525] rounded-lg border border-[#323539]">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Selected Mineral ID:</span>
                    <span className="font-mono break-all">{form.mineralId}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(form.mineralId);
                      }}
                      className="ml-auto text-gray-400 hover:text-accentBlue transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2">Audit Report</label>
                  <textarea
                    name="report"
                    value={form.report}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#252525] border border-[#323539] focus:border-accentBlue focus:ring-1 focus:ring-accentBlue outline-none transition-all min-h-32"
                    placeholder="Enter your detailed audit findings..."
                  />
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#323539] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isTransactionPending}
                  className="px-6 py-3 rounded-lg bg-[#252525] hover:bg-[#2A2A2A] border border-[#323539] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!validateForm() || isTransactionPending}
                  className="px-6 py-3 rounded-lg bg-accentBlue hover:bg-blue-600 text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
                >
                  {isTransactionPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    "Submit Audit"
                  )}
                </button>
              </div>
            </form>

            {/* Validation Summary */}
            <div className="mt-6 bg-[#1A1A1A] rounded-xl p-5 border border-[#323539] shadow-lg">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">
                Submission Requirements
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.mineralId.trim() ? "bg-accentBlue/20 text-accentBlue" : "bg-[#252525] text-gray-500"
                    }`}
                  >
                    {form.mineralId.trim() ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {inputMethod === "select" ? "Mineral selected" : "Valid Mineral ID"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {inputMethod === "select"
                        ? "Choose from list or enter manually"
                        : "Must be a valid mineral identifier"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.report.trim() ? "bg-accentBlue/20 text-accentBlue" : "bg-[#252525] text-gray-500"
                    }`}
                  >
                    {form.report.trim() ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Audit report provided</p>
                    <p className="text-xs text-gray-400 mt-0.5">Detailed findings about the mineral</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
