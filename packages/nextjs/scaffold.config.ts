import PrivacyGuard from "../hardhat/artifacts/contracts/core/PrivacyGuard.sol/PrivacyGuard.json";
import RolesManager from "../hardhat/artifacts/contracts/core/RolesManager.sol/RolesManager.json";
import SupplychainValidator from "../hardhat/artifacts/contracts/core/SupplychainValidator.sol/SupplychainValidator.json";
import DisputeResolution from "../hardhat/artifacts/contracts/governance/DisputeResolution.sol/DisputeResolution.json";
import TransactionLog from "../hardhat/artifacts/contracts/logs/TransactionLog.sol/TransactionLog.json";
import LogisticsManager from "../hardhat/artifacts/contracts/modules/LogisticsManager.sol/LogisticsManager.json";
import MineralLicenseManager from "../hardhat/artifacts/contracts/modules/MineralLicenseManager.sol/MineralLicenseManager.json";
import MineralRegistry from "../hardhat/artifacts/contracts/modules/MineralRegistry.sol/MineralRegistry.json";
import MineralWarehouse from "../hardhat/artifacts/contracts/modules/MineralWarehouse.sol/MineralWarehouse.json";
import Tokenization from "../hardhat/artifacts/contracts/tokens/Tokenization.sol/Tokenization.json";
import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  contracts: {
    RolesManager: {
      address: string;
      abi: any;
    };
    MineralWarehouse: {
      address: string;
      abi: any;
    };
    DisputeResolution: {
      address: string;
      abi: any;
    };
    LogisticsManager: {
      address: string;
      abi: any;
    };
    TransactionLog: {
      address: string;
      abi: any;
    };
    MineralRegistry: {
      address: string;
      abi: any;
    };
    PrivacyGuard: {
      address: string;
      abi: any;
    };
    Tokenization: {
      address: string;
      abi: any;
    };
    SupplychainValidator: {
      address: string;
      abi: any;
    };
    MineralLicenseManager: {
      address: string;
      abi: any;
    };
  };
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  // The networks on which your DApp is live
  targetNetworks: [
    chains.hardhat,
    chains.mainnet,
    chains.sepolia,
    chains.polygon,
    chains.optimism,
    chains.arbitrum,
    chains.base,
    chains.shape,
    chains.zora,
    chains.flare,
    chains.lisk,

    chains.shapeSepolia,
    chains.baseSepolia,
    chains.zoraSepolia,
    chains.arbitrumSepolia,
    chains.polygonMumbai,
    chains.polygonZkEvm,
    chains.polygonZkEvmTestnet,
    chains.flareTestnet,
    chains.liskSepolia,
  ],

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect if you only target the local network (default is 4000)
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,

  contracts: {
    RolesManager: {
      address: "0x67580b5841b0305329A925a38880e7C23208d0CA",
      abi: RolesManager.abi,
    },
    MineralWarehouse: {
      address: "0xb2308c958A5023E1CEB113cAa2CA7b041eF7349a",
      abi: MineralWarehouse.abi,
    },
    DisputeResolution: {
      address: "0xF0F3B11F9e04fA03A321486012C28a98939439eC",
      abi: DisputeResolution.abi,
    },

    // BASE MAINNET DEPLOYED STOPS HERE
    LogisticsManager: {
      address: "0x302324fCEe51411658FbBa7b0d0E7E21ba23BA1f",
      abi: LogisticsManager.abi,
    },
    MineralRegistry: {
      address: "0xB2B9627d52DA8e87057F9cB74C87F13D6C610381",
      abi: MineralRegistry.abi,
    },
    SupplychainValidator: {
      address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
      abi: SupplychainValidator.abi,
    },
    TransactionLog: {
      address: "0x152085d5181117f7565AfC9ec70e0E668b7216B3",
      abi: TransactionLog.abi,
    },
    PrivacyGuard: {
      address: "0x03F3FABEc0EA3618625fb3af7EcBb471B530c810",
      abi: PrivacyGuard.abi,
    },
    Tokenization: {
      address: "0x269334D3c3Fb7967E160909245a1efdC3052C685",
      abi: Tokenization.abi,
    },
    MineralLicenseManager: {
      address: "0x0bf6822791cFc0DA01993D2D7783b9D435604e48",
      abi: MineralLicenseManager.abi,
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
