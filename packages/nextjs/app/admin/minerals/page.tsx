/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldAlert } from "lucide-react";
import Icon from "~~/components/dashboard/Icon";
import MineralActivity from "~~/components/dashboard/minerals/mineralActivity";
import MineralListTable from "~~/components/dashboard/minerals/mineralListTable/mineralList";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, mineralsList, reports, shipments } from "~~/data/data";

/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */

/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */

const LoadingSpinner = ({ size = 8, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-sm text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying access permissions..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size={12} text={text} />
  </div>
);

export default function Page() {
  const [activeTab, setActiveTab] = useState<"pending" | "validated">("pending");
  // Simulated connection state for development
  const isConnected = true;
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Commented out the original role checks but kept for reference
  /* const { 
    data: hasMinerRole, 
    isLoading: isLoadingMinerCheck 
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasMinerRole",
    args: [address],
  });

  const { 
    data: isAdmin, 
    isLoading: isLoadingAdminCheck 
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
    args: [address],
  }); */

  const hasMinerRole = true; // Bypassing role check
  const isAdmin = true; // Bypassing role check
  const isLoadingMinerCheck = false; // No loading needed
  const isLoadingAdminCheck = false; // No loading needed

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Loading state while checking roles
  if (isConnected && (isLoadingMinerCheck || isLoadingAdminCheck)) {
    return <FullPageLoader text="Checking access permissions..." />;
  }

  // Not connected state
  if (!isConnected) {
    return <div className="p-8 text-center">Please connect your wallet to access minerals data.</div>;
  }

  // Show warning but don't restrict access
  if (isConnected && !hasMinerRole && !isAdmin) {
    return (
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
        <div className="mb-4 p-4 rounded-lg bg-red-900/20 border border-red-900/50">
          <div className="flex items-center gap-2 text-red-300">
            <ShieldAlert className="w-5 h-5" />
            <span>Your wallet doesn't have required privileges</span>
          </div>
        </div>

        {isDataLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <LoadingSpinner size={12} text="Loading minerals dashboard..." />
          </div>
        ) : (
          <>
            {/* the welcome message */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-0">
              <div className="flex flex-col">
                <p className="text-[24px] sm:text-[26px] md:text-[28px] font-bold m-0 leading-tight">Minerals</p>
                <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
                  Access detailed info about minerals
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button className="flex-1 md:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                  <span className="flex items-center gap-2">
                    <h1 className="text-sm translate-y-[7px]">Download Report</h1>
                    <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
                  </span>
                </button>

                <Link
                  href={""}
                  className="flex-1 md:flex-none bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
                >
                  <h1 className="translate-y-[4px]">Request a report</h1>
                </Link>

                <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                  <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
                </button>
              </div>
            </div>

            {/* the mineral activity */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch">
              <div className="w-full lg:w-2/3">
                <div className="h-full">
                  <MineralActivity headerBg="#060910" footerBg="#060910" />
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="h-full">
                  <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="w-full">
              <div className="bg-[#060910] rounded-2xl flex flex-col sm:flex-row items-center">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
                    activeTab === "pending" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                  }`}
                >
                  Pending Transactions (Waiting For Validation)
                </button>

                <div className="w-full h-[1px] sm:hidden bg-white my-1"></div>
                <button
                  onClick={() => setActiveTab("validated")}
                  className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
                    activeTab === "validated" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                  }`}
                >
                  Validated Transactions
                </button>
              </div>

              {/* Content based on active tab */}
              <div className="pt-4">
                {activeTab === "pending" ? (
                  <div className="overflow-x-auto">
                    <MineralListTable minerals={mineralsList} title="Your Stored Mineral List" isAdmin={true} />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <MineralListTable minerals={mineralsList} title="Your Stored Mineral List" isAdmin={true} />
                  </div>
                )}
              </div>
            </div>

            {/* the other metric cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              <RecentShipments
                shipments={shipments}
                onViewAll={() => console.log("View all shipments")}
                bgColor="bg-[#060910]"
              />

              <TopDemands
                demands={demands}
                onRefresh={() => console.log("Refresh demands")}
                onAddDemand={id => console.log("Add demand", id)}
                bgColor="bg-[#060910]"
              />

              <MineralReports
                reports={reports}
                onRefresh={() => console.log("Refresh reports")}
                onViewDetails={id => console.log("View report details", id)}
                bgColor="bg-[#060910]"
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
      {isDataLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size={12} text="Loading minerals dashboard..." />
        </div>
      ) : (
        <>
          {/* the welcome message */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-0">
            <div className="flex flex-col">
              <p className="text-[24px] sm:text-[26px] md:text-[28px] font-bold m-0 leading-tight">Minerals</p>
              <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#979AA0] m-0 leading-tight">
                Access detailed info about minerals
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button className="flex-1 md:flex-none bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                <span className="flex items-center gap-2">
                  <h1 className="text-sm translate-y-[7px]">Download Report</h1>
                  <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
                </span>
              </button>

              <Link
                href={""}
                className="flex-1 md:flex-none bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
              >
                <h1 className="translate-y-[4px]">Request a report</h1>
              </Link>

              <button className="bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
                <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
              </button>
            </div>
          </div>

          {/* the mineral activity */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch">
            <div className="w-full lg:w-2/3">
              <div className="h-full">
                <MineralActivity headerBg="#060910" footerBg="#060910" />
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="h-full">
                <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div className="w-full">
            <div className="bg-[#060910] rounded-2xl flex flex-col sm:flex-row items-center">
              <button
                onClick={() => setActiveTab("pending")}
                className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
                  activeTab === "pending" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                }`}
              >
                Pending Transactions (Waiting For Validation)
              </button>

              <div className="w-full h-[1px] sm:hidden bg-white my-1"></div>
              <button
                onClick={() => setActiveTab("validated")}
                className={`w-full sm:flex-1 py-2 sm:py-3 px-3 sm:px-6 text-base sm:text-lg transition-colors ${
                  activeTab === "validated" ? "text-white font-semibold bg-[#2A2F3D] rounded-full" : "text-[#71727A]"
                }`}
              >
                Validated Transactions
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="pt-4">
              {activeTab === "pending" ? (
                <div className="overflow-x-auto">
                  <MineralListTable minerals={mineralsList} title="Your Stored Mineral List" isAdmin={true} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <MineralListTable minerals={mineralsList} title="Your Stored Mineral List" isAdmin={true} />
                </div>
              )}
            </div>
          </div>

          {/* the other metric cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <RecentShipments
              shipments={shipments}
              onViewAll={() => console.log("View all shipments")}
              bgColor="bg-[#060910]"
            />

            <TopDemands
              demands={demands}
              onRefresh={() => console.log("Refresh demands")}
              onAddDemand={id => console.log("Add demand", id)}
              bgColor="bg-[#060910]"
            />

            <MineralReports
              reports={reports}
              onRefresh={() => console.log("Refresh reports")}
              onViewDetails={id => console.log("View report details", id)}
              bgColor="bg-[#060910]"
            />
          </div>
        </>
      )}
    </div>
  );
}
