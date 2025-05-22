import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2, ShieldAlert } from "lucide-react";

export const ConnectWalletView = ({ isLoading, role }: { isLoading: boolean; role: string }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-lightBlack">
    <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-4 mx-auto">
        {isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-300 animate-spin" />
        ) : (
          <ShieldAlert className="w-8 h-8 text-blue-300" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">{isLoading ? "Connecting..." : "Connect Your Wallet"}</h1>
      <p className="text-gray-300 mb-6">
        {isLoading ? "Verifying wallet..." : `Please connect a wallet with ${role} privileges`}
      </p>
      <div className="flex justify-center">
        <ConnectButton />
      </div>
    </div>
  </div>
);
