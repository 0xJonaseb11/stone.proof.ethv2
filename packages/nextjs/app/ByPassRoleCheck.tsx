import React from "react";
import { ShieldAlert } from "lucide-react";

const BypassWarningBanner = () => (
  <div className="mb-4 p-4 rounded-lg bg-yellow-900/20 border border-yellow-900/50">
    <div className="flex items-center gap-2 text-yellow-300">
      <ShieldAlert className="w-5 h-5" />
      <span>Role check temporarily bypassed - access restrictions removed</span>
    </div>
  </div>
);

export default BypassWarningBanner;
