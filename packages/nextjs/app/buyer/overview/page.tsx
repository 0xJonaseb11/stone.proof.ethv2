"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Copy, Loader2, ShieldAlert } from "lucide-react";
import { FaChartBar, FaRegCheckSquare, FaUser } from "react-icons/fa";
import { useAccount } from "wagmi";
import Icon from "~~/components/dashboard/Icon";
import AdminStatCard from "~~/components/dashboard/admin/AdminStatCard";
import TransactionTable from "~~/components/dashboard/buyer/recentPurchasesTable";
import MineralReports from "~~/components/dashboard/overview/mineralReports";
import RecentShipments from "~~/components/dashboard/overview/recentShipments";
import TopDemands from "~~/components/dashboard/overview/topDemands";
import { demands, reports, sampleTransactions, shipments } from "~~/data/data";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const LoadingSpinner = ({ text = "Loading..." }: { text?: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[300px] gap-2">
    <Loader2 className="w-12 h-12 animate-spin" />
    <p className="text-sm text-muted-foreground">{text}</p>
  </div>
);

// NoRoleBanner component (styled to match refiner/auditor overview warning banner)
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
          <span>Your wallet doesn't have buyer privileges</span>
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
  name: "Buyer",
};

const Page = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);

  // Check if wallet has buyer role
  const {
    data: hasBuyerRole,
    isLoading: isLoadingRoleCheck,
    refetch: refetchRoleCheck,
  } = useScaffoldReadContract({
    contractName: "RolesManager",
    functionName: "hasBuyerRole",
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
        notification.error("Still no buyer role. Contact administrator.");
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
    }, 500); // Match refiner/auditor overview loading time
    return () => clearTimeout(timer);
  }, []);

  if (isDataLoading || isLoadingRoleCheck) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 flex flex-col gap-6 sm:gap-8 md:gap-10">
      {/* Show NoRoleBanner if connected but no buyer role */}
      {isConnected && hasBuyerRole === false && (
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
              href="/buyer/mineral-market/buyMineral"
              className="flex-1 md:flex-none bg-accentBlue gap-2 font-semibold px-4 py-1.5 rounded-[8px] flex items-center justify-center md:justify-start"
            >
              <h1 className="translate-y-[4px]">Buy Mineral</h1>
            </Link>
            <button className="w-full sm:w-auto bg-[#252525] border border-[#323539] flex items-center justify-center gap-2 font-semibold px-4 py-1.5 pb-2.5 rounded-[8px]">
              <Icon path="/dashboard/icon_set/menu.svg" alt="menu icon" />
            </button>
          </div>
        </div>
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <AdminStatCard
            icon={<FaUser size={24} color="#fff" />}
            iconBg="#22c55e"
            title="Total Purchases"
            value="2,345"
            buttonText="View"
            cardBg="#060910"
            onButtonClick={() => router.push("/admin/miners")}
          />
          <AdminStatCard
            icon={<FaChartBar size={24} color="#fff" />}
            iconBg="#2563eb"
            title="In-transit"
            value="203"
            cardBg="#060910"
            buttonText="View"
            onButtonClick={() => router.push("/admin/frozen-mines")}
          />
          <AdminStatCard
            icon={<FaRegCheckSquare size={24} color="#fff" />}
            iconBg="#ef4444"
            title="Failed Purchases"
            value="21"
            cardBg="#060910"
            buttonText="View"
            onButtonClick={() => router.push("/details")}
          />
        </div>
        {/* Recent purchases */}
        <TransactionTable transactions={sampleTransactions} />
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
};

export default Page;
