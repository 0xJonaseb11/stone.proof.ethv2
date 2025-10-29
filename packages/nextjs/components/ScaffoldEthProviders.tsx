"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
// Import your existing wagmi config - don't change your network setup!
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Custom theme for StoneProof
const customDarkTheme = darkTheme({
  accentColor: "#0A7AFF",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "rounded",
  overlayBlur: "small",
});

export default function ScaffoldEthProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar height="3px" color="#2299dd" />
        <RainbowKitProvider theme={customDarkTheme}>
          {children}
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
