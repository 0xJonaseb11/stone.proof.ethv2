"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader2 } from "lucide-react";
import { FaWallet } from "react-icons/fa";

const ConnectWalletButton: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, authenticationStatus, mounted, openChainModal, openAccountModal }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain;
        const isConnecting = authenticationStatus === "loading";

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="bg-gradient-to-r from-[#0A77FF] to-[#0047CC] hover:from-[#0A77FF]/90 hover:to-[#0047CC]/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <FaWallet className="w-5 h-5" />
                        <span>Connect Wallet</span>
                      </>
                    )}
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="bg-[#1A1D21] hover:bg-[#2A2D31] border border-[#323539] text-white font-medium px-4 py-2 rounded-full transition-colors flex items-center space-x-2"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img alt={chain.name ?? "Chain icon"} src={chain.iconUrl} style={{ width: 16, height: 16 }} />
                        )}
                      </div>
                    )}
                    <span>{chain.name}</span>
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-[#1A1D21] hover:bg-[#2A2D31] border border-[#323539] text-white font-medium px-4 py-2 rounded-full transition-colors"
                  >
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
