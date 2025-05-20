"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import StatsCard from "~~/components/dashboard/overview/statsCard";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import MineralRefineryGraph from "~~/components/dashboard/refiner/mineralRefinery";
import { demands, mineralsData, reports, shipments, shipmentsData, transfersData } from "~~/data/data";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import BypassWarningBanner from "~~/app/ByPassRoleCheck"; 

const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
    <Loader2 className="w-12 h-12 animate-spin" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

interface User {
  name: string;
}

export default function Page() {
  const { address, isConnected } = useAccount();
  const [isDataLoading, setIsDataLoading] = useState(true);

  // 1. First - Implemented the restriction logic (commented out below for reference)
  /*
  const {
    data: hasRefinerRole,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasRefinerRole",
    args: [address],
  });

  const handleRefreshAccess = async () => {
    try {
      await refetchRoleCheck();
      notification.success("Access rechecked");
    } catch (e) {
      console.error("Error refreshing access:", e);
      notification.error("Error checking permissions");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoadingRoleCheck || isDataLoading) {
    return <LoadingSpinner text="Verifying access..." />;
  }

  if (!hasRefinerRole) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 text-center p-4">
        <ShieldAlert className="w-16 h-16 text-red-500" />
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-muted-foreground max-w-md">
          This portal requires <span className="font-semibold text-primary">Refiner Role</span> privileges.
        </p>
        <button 
          onClick={handleRefreshAccess}
          className="mt-4 px-6 py-2 bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Recheck Access
        </button>
      </div>
    );
  }
  */

  // 2. Then - Commented out the restriction logic and added bypass variables
  const hasRefinerRole = true; // Bypass access check
  const isLoadingRoleCheck = false; // No loading needed

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 500); // Shorter loading for demo purposes

    return () => clearTimeout(timer);
  }, []);

  // Show warning but don't restrict access
  if (isConnected && !hasRefinerRole) {
    return (
      <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
        <div className="mb-4 p-4 rounded-lg bg-red-900/20 border border-red-900/50">
          <div className="flex items-center gap-2 text-red-300">
            <ShieldAlert className="w-5 h-5" />
            <span>Your wallet doesn't have refiner privileges</span>
          </div>
        </div>

        {/* Rest of the dashboard content */}
        <DashboardContent />
      </div>
    );
  }

  if (isDataLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return <DashboardContent />;
}

// Extracted dashboard content to a separate component for reusability
function DashboardContent() {
  const user: User = {
    name: "Refiner",
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
      <BypassWarningBanner />
      {/* the welcome message */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
          <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
            Welcome back, we&apos;re happy to have you here!
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
            href={"/refiner/refinery"}
            className="w-full sm:w-auto bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
          >
            <h1 className="translate-y-[4px]">Refine Mineral</h1>
          </Link>

          <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
            <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
          </button>
        </div>
      </div>

      {/* the stats cards */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <StatsCard
            title="Total Minerals Supplied"
            value="30"
            tagName="Coltan"
            chartData={mineralsData}
            color="blue"
          />

          <StatsCard title="Completed Transfers" value="27" tagName="Gold" chartData={transfersData} color="green" />

          <StatsCard title="Active Shipments" value="27" tagName="Copper" chartData={shipmentsData} color="red" />
        </div>
      </div>

      {/* the mineral supply graph */}
      <div className="w-full overflow-x-auto">
        <MineralRefineryGraph />
      </div>

      {/* the other metric cards */}
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
  );
}
