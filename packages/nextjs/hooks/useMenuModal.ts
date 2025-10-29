import { useState } from "react";

interface MenuModalConfig {
  portalType?: "auditor" | "miner" | "refiner" | "inspector";
}

export const useMenuModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<MenuModalConfig>({
    portalType: "auditor",
  });

  const showMenuModal = (config?: MenuModalConfig) => {
    if (config) {
      setConfig(config);
    }
    setIsOpen(true);
  };

  const hideMenuModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    config,
    showMenuModal,
    hideMenuModal,
  };
}; 