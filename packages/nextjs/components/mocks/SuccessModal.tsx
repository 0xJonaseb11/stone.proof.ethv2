import { useEffect } from "react";
import Icon from "~~/components/dashboard/Icon";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  portalType?: "auditor" | "miner" | "refiner" | "inspector";
  downloadType?: string;
}

const SuccessModal = ({ isOpen, onClose, title, message, portalType = "auditor", downloadType }: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getPortalColor = () => {
    switch (portalType) {
      case "auditor":
        return "bg-accentBlue";
      case "miner":
        return "bg-[#FFA500]";
      case "refiner":
        return "bg-[#4CAF50]";
      case "inspector":
        return "bg-[#9C27B0]";
      default:
        return "bg-accentBlue";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1A1A1A] rounded-[16px] p-6 w-[90%] max-w-[400px] shadow-xl border border-[#323539]">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className={`${getPortalColor()} p-4 rounded-full mb-4`}>
            <Icon path="/dashboard/icon_set/download.svg" alt="Success" className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>

          {/* Message */}
          <p className="text-[#979AA0] mb-6">{message}</p>

          {/* Download Info */}
          {downloadType && (
            <div className="bg-[#252525] rounded-lg p-3 w-full mb-6">
              <div className="flex items-center gap-2">
                <Icon path="/dashboard/icon_set/pdf.svg" alt="PDF" className="w-5 h-5" />
                <span className="text-sm text-white">{downloadType}</span>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`${getPortalColor()} text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
