"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Copy, Loader2, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import LocationMap from "~~/components/dashboard/transporter/MapSection";
import StatsSection from "~~/components/dashboard/transporter/StatsSection";
import TransportRequestsTable from "~~/components/dashboard/transporter/TransfersTable";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
    <Loader2 className="w-12 h-12 animate-spin" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

// NoRoleBanner component (styled to match refiner/auditor/buyer overview warning banner)
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
      <div className="flex items-center justify-between gap-2 text-yellow-300">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5" />
          <span>Your wallet doesn't have transporter privileges</span>
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
  name: "Transporter",
};

const stats = {
  totalTrips: 157,
  completed: 124,
  pendingTransfers: 33,
  declined: 4,
  percentageChanges: {
    total: 12,
    completed: 8,
    pending: -5,
    declined: 2,
  },
};

export default function Page() {
  const { address, isConnected } = useAccount();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  // Check if wallet has transporter role
  const {
    data: hasTransporterRole,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasTransporterRole",
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
        notification.error("Still no transporter role. Contact administrator.");
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
    }, 500); // Match refiner/auditor/buyer overview loading time
    return () => clearTimeout(timer);
  }, []);

  if (isDataLoading || isLoadingRoleCheck) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
      {/* Show NoRoleBanner if connected but no transporter role */}
      {isConnected && hasTransporterRole === false && (
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
            <Link
              href="/transporter/transferMineral"
              className="w-full sm:w-auto bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center"
            >
              <h1 className="translate-y-[4px]">Transfer Mineral</h1>
            </Link>
            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
            </button>
          </div>
        </div>
        {/* Stats cards */}
        <div>
          <StatsSection stats={stats} />
        </div>
        {/* Transports requests table */}
        <TransportRequestsTable />
        {/* Map */}
        <LocationMap />
      </div>
    </div>
  );
}
