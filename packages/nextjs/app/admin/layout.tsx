"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronRight, Copy, Loader2, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";
import Sidebar from "~~/components/dashboard/Sidebar";
import TopBar from "~~/components/dashboard/topBar";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useSidebarStore } from "~~/stores/useSidebarStore";
import { getSidebarItems } from "~~/types/dashboard/sidebarItems";
import { notification } from "~~/utils/scaffold-eth";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const sidebarItems = getSidebarItems("/admin");

const LoadingSpinner = ({ size = 12, text = "Loading..." }: { size?: number; text?: string }) => (
  <div className="flex flex-col items-center justify-center gap-2">
    <Loader2 className={`w-${size} h-${size} animate-spin`} />
    {text && <p className="text-lg text-muted-foreground">{text}</p>}
  </div>
);

const FullPageLoader = ({ text = "Verifying admin privileges..." }: { text?: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-[#060A12]">
    <LoadingSpinner size={12} text={text} />
  </div>
);

const ConnectWalletView = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-[#060A12]">
    <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{isLoading ? "Connecting..." : "Connect Admin Wallet"}</h1>
      <p className="text-gray-400 mb-6">{isLoading ? "Verifying wallet..." : "Please connect your admin wallet"}</p>
      <div className="flex justify-center">
        <ConnectButton showBalance={false} accountStatus="address" chainStatus="none" />
      </div>
    </div>
  </div>
);

const AccessDeniedCard = ({
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
    <div className="max-w-md p-6 border rounded-lg shadow-lg bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <ShieldAlert className="w-12 h-12 text-red-500" />
        <h3 className="text-2xl font-bold">Access Denied</h3>
        <p className="text-muted-foreground">The connected wallet doesn't have admin privileges for this dashboard.</p>
        <div className="flex items-center gap-2 p-2 px-4 mt-2 border rounded-lg">
          <span className="font-mono text-sm">{address}</span>
          <button onClick={copyAddress} className="p-1 rounded-md hover:bg-accent">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoadingRefresh}
          className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isLoadingRefresh && <Loader2 className="w-4 h-4 animate-spin" />}
          Refresh Access
        </button>
      </div>
    </div>
  );
};

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
          <span>Your wallet doesn't have Super Admin privileges. Contact System Owner!</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs sm:text-sm text-gray-200">
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarStore();
  const { address, isConnected, isConnecting } = useAccount();
  const [isRefreshingAccess, setIsRefreshingAccess] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

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
    if (isConnected && !isLoadingRoleCheck) {
      const timer = setTimeout(() => {
        setIsDataLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isLoadingRoleCheck]);

  if (!isConnected) {
    return <ConnectWalletView isLoading={isConnecting} />;
  }

  if (isConnected && (isLoadingRoleCheck || isDataLoading)) {
    return <FullPageLoader text="Checking admin permissions..." />;
  }

  return (
    <div className={`${montserrat.variable} font-montserrat bg-[#060A12] flex text-white h-screen`}>
      <Sidebar basePath="/admin" disabled={!hasAdminRole} />
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
          !isCollapsed ? "md:ml-[250px]" : ""
        }`}
      >
        <div className={`${!hasAdminRole ? "pointer-events-none" : ""}`}>
          <TopBar sidebarItems={sidebarItems} basePath="/admin" />
        </div>
        <main className="flex-1 flex flex-col overflow-y-auto px-6 py-4">
          {isConnected && !hasAdminRole && (
            <NoRoleBanner address={address!} isLoadingRefresh={isRefreshingAccess} onRefresh={handleRefreshAccess} />
          )}
          {isConnected && !hasAdminRole ? (
            <div className="flex items-center justify-center flex-1 p-4">
              <AccessDeniedCard
                address={address!}
                isLoadingRefresh={isRefreshingAccess}
                onRefresh={handleRefreshAccess}
              />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
