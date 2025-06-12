"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Copy, Loader2, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import NetworkTransactionsGraph from "~~/components/dashboard/admin/NetworkTransactionsGraph";
import StatsSection from "~~/components/dashboard/admin/StatsSection";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, reports, shipments } from "~~/data/data";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

interface User {
  name: string;
}

// Sample user
const user: User = {
  name: "Super Admin",
};

const stats = {
  totalTransactions: 157,
  completedTransactions: 124,
  pendingTransactions: 33,
  disputes: 4,
  percentageChanges: {
    total: 12,
    completed: 8,
    pending: -5,
    disputes: 2,
  },
};

const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
    <Loader2 className="w-12 h-12 animate-spin" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

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
    <div className="mb-4 p-4 rounded-lg bg-red-900/20 border border-red-900/50">
      <div className="flex items-center justify-between gap-2 text-red-300">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          <span>Your wallet doesn't have Super Admin privileges</span>
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

export default function AdminOverviewPage() {
  const { address, isConnected } = useAccount();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  // Check if wallet has admin role
  const {
    data: hasAdminRole,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasAdminRole",
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
        notification.error("Still no admin role. Contact system owner.");
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
    }, 500); // Match other portals' loading time
    return () => clearTimeout(timer);
  }, []);

  if (isDataLoading || isLoadingRoleCheck) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8 space-y-6 sm:space-y-8">
      {/* Show NoRoleBanner if connected but no admin role */}
      {isConnected && hasAdminRole === false && (
        <NoRoleBanner address={address!} isLoadingRefresh={isRefreshingAccess} onRefresh={handleRefreshAccess} />
      )}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 flex flex-col gap-4 sm:gap-6 md:gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col">
            <p className="text-[24px] sm:text-[28px] font-bold m-0 leading-tight">Hey there, {user.name}!</p>
            <p className="text-[14px] sm:text-[16px] text-[#979AA0] m-0 leading-tight">
              Welcome back, we're happy to have you here!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <span className="flex items-center gap-2">
                <h1 className="text-sm translate-y-[7px]">Download Report</h1>
                <Icon path="/dashboard/icon_set/download.svg" alt="Download icon" />
              </span>
            </button>

            <Link
              href={"/admin/minerals"}
              className="w-full sm:w-auto bg-[#202634] gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
            >
              <h1 className="translate-y-[4px]">View Minerals</h1>
            </Link>

            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <StatsSection stats={stats} />
      </div>

      <div className="w-full">
        <NetworkTransactionsGraph />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
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
    </div>
  );
}
