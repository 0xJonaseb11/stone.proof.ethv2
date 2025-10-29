import { useState } from "react";

interface SuccessModalConfig {
  title: string;
  message: string;
  downloadType?: string;
  portalType?: "auditor" | "miner" | "refiner" | "inspector";
}

export const useSuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<SuccessModalConfig>({
    title: "",
    message: "",
    downloadType: "",
    portalType: "auditor",
  });

  const showSuccessModal = (config: SuccessModalConfig) => {
    setConfig(config);
    setIsOpen(true);
  };

  const hideSuccessModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    config,
    showSuccessModal,
    hideSuccessModal,
  };
}; 