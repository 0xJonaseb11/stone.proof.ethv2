"use client";

import { RainbowKitProvider, darkTheme, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { hardhat, mainnet, sepolia } from "wagmi/chains";

// Configure chains & transport
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "stone-proof-default-id";

const config = getDefaultConfig({
  appName: "StoneProof",
  projectId: projectId,
  chains: [mainnet, sepolia, hardhat],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const customDarkTheme = darkTheme({
  accentColor: "#0A7AFF", // StoneProof Blue
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "rounded",
  overlayBlur: "small",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ScaffoldEthProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar height="3px" color="#2299dd" />
        <RainbowKitProvider theme={customDarkTheme}>
          {children}
          <Toaster />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ScaffoldEthProviders;
