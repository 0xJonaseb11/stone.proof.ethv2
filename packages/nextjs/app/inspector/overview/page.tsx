"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Copy, Loader2, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import MineralSupplyGraph from "~~/components/dashboard/overview/mineralSupply";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import StatsCard from "~~/components/dashboard/overview/statsCard";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, mineralsData, reports, shipments, shipmentsData, supplyData, transfersData } from "~~/data/data";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
    <Loader2 className="w-12 h-12 animate-spin" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

// NoRoleBanner component (updated to match refiner/auditor/buyer/transporter styling)
const NoRoleBanner = ({
  address,
  isLoadingRefresh,
  onRefresh,
}: {
  address: string;
  isLoadingRefresh: boolean;
  onRefresh: () => void;
}) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    notification.success("Wallet address copied!");
  };

  return (
    <div className="px-2 py-0 mb-4 p-4 rounded-lg bg-red-900 border border-red-500">
      <div className="flex items-center justify-between gap-2 text-red-300">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          <span>Your wallet doesn't have inspector privileges</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs sm:text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button onClick={copyAddress} className="text-red-300 hover:text-red-200" title="Copy address">
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={onRefresh}
            disabled={isLoadingRefresh}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm text-white"
          >
            {isLoadingRefresh ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Check Again
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface User {
  name: string;
}

const user: User = {
  name: "Inspector",
};

export default function Page() {
  const { address, isConnected } = useAccount();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  // Check if wallet has inspector role
  const {
    data: hasInspectorRole,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasInspectorRole",
    args: [address],
    enabled: isConnected && !!address,
  });

  const handleRefreshAccess = async () => {
    setIsRefreshingAccess(true);
    try {
      const { data } = await refetchRoleCheck();
      if (data) {
        notification.success("Access rechecked");
      } else {
        notification.error("Still no inspector role. Contact administrator.");
      }
    } catch (e) {
      console.error("Error refreshing access:", e);
      notification.error("Error checking access");
    } finally {
      setIsRefreshingAccess(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 500); // Match refiner/auditor/buyer/transporter overview loading time
    return () => clearTimeout(timer);
  }, []);

  if (isDataLoading || isLoadingRoleCheck) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
      {/* Show NoRoleBanner if connected but no inspector role */}
      {isConnected && hasInspectorRole === false && (
        <NoRoleBanner address={address!} isLoadingRefresh={isRefreshingAccess} onRefresh={handleRefreshAccess} />
      )}
      {/* Dashboard content */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
        {/* Welcome message */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col">
            <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
            <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
              Welcome back, we're happy to have you here!
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-1">
            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <span className="flex items-center gap-2">
                <h1 className="text-sm translate-y-[7px]">Download Report</h1>
                <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
              </span>
            </button>
            <Link
              href="/inspector/inspection"
              className="w-full sm:w-auto bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
            >
              <h1 className="translate-y-[4px]">Inspect Mineral</h1>
            </Link>
            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
            </button>
          </div>
        </div>
        {/* Stats cards */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <StatsCard title="Total Transactions" value="30" tagName="Coltan" chartData={mineralsData} color="blue" />
            <StatsCard title="Inspected" value="27 Tons" tagName="Gold" chartData={transfersData} color="green" />
            <StatsCard title="Pending" value="27" tagName="Copper" chartData={shipmentsData} color="red" />
          </div>
        </div>
        {/* Mineral supply graph */}
        <div className="w-full overflow-x-auto">
          <MineralSupplyGraph data={supplyData} />
        </div>
        {/* Other metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <RecentShipments shipments={shipments} onViewAll={() => console.log("View all shipments")} />
          <TopDemands
            demands={demands}
            onRefresh={() => console.log("Refresh demands")}
            onAddDemand={id => console.log("Add demand", id)}
          />
          <MineralReports
            reports={reports}
            onRefresh={() => console.log("Refresh reports")}
            onViewDetails={id => console.log("View report details", id)}
          />
        </div>
      </div>
    </div>
  );
}
