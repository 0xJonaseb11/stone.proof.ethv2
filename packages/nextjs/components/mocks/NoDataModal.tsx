import { useEffect } from "react";

interface NoDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  portalType?: "auditor" | "miner" | "refiner" | "inspector";
  actionText?: string;
  onAction?: () => void;
  description?: string;
}

const NoDataModal = ({
  isOpen,
  onClose,
  message,
  portalType = "auditor",
  actionText,
  onAction,
  description,
}: NoDataModalProps) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1A1A1A] rounded-[24px] p-6 md:p-8 w-[95%] max-w-[800px] shadow-xl border border-[#323539]">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#979AA0] hover:text-white transition-colors duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Image Container with Bounce Animation */}
          <div className="w-full max-w-[400px] mb-4 animate-bounce-subtle">
            <img src="/empty-state.png" alt="No Data" className="w-full h-auto object-contain" />
          </div>

          {/* Default Title */}
          <h2 className="text-3xl font-bold text-white mb-2">Ooops! No data found!</h2>

          {/* Description */}
          <p className="text-[#979AA0] text-lg max-w-[600px]">{description || message}</p>

          {/* Action Button */}
          {actionText && onAction && (
            <button
              onClick={onAction}
              className={`${getPortalColor()} text-white px-8 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 mt-6`}
            >
              {actionText}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NoDataModal;
