import { useEffect } from "react";
import Link from "next/link";
import Icon from "~~/components/dashboard/Icon";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalType?: "auditor" | "miner" | "refiner" | "inspector";
}

const MenuModal = ({ isOpen, onClose, portalType = "auditor" }: MenuModalProps) => {
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

  const menuItems = [
    {
      title: "Profile Settings",
      icon: "/dashboard/icon_set/Avatar.svg",
      href: "/auditor/overview",
    },
    {
      title: "Notifications",
      icon: "/dashboard/icon_set/notification.svg",
      href: "/auditor/overview",
    },
    {
      title: "Help & Support",
      icon: "/dashboard/icon_set/book.svg",
      href: "/auditor/overview",
    },
    {
      title: "Logout",
      icon: "/dashboard/icon_set/sun.svg",
      href: "/",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#1A1A1A] rounded-[16px] p-4 w-[280px] mt-16 mr-4 shadow-xl border border-[#323539]">
        <div className="flex flex-col">
          {/* User Info */}
          <div className="flex items-center gap-3 p-3 border-b border-[#323539]">
            <div className={`${getPortalColor()} p-2 rounded-full`}>
              <Icon path="/dashboard/icon_set/Avatar.svg" alt="User" width={24} height={24} />
            </div>
            <div>
              <h3 className="text-white font-semibold">John Doe</h3>
              <p className="text-[#979AA0] text-sm">Auditor</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#252525] rounded-lg transition-colors"
                onClick={onClose}
              >
                <Icon path={item.icon} alt={item.title} width={20} height={20} />
                <span className="text-white">{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Version Info */}
          {/* <div className="mt-2 pt-2 border-t border-[#323539]">
            <p className="text-[#979AA0] text-sm text-center">Version 1.0.0</p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
