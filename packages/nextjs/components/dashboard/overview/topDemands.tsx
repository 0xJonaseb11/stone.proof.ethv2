"use client";

import { Plus } from "lucide-react";

interface Demand {
  id: string;
  mineralName: string;
  date: string;
  icon: string;
}

const mockDemands: Demand[] = [
  {
    id: "1",
    mineralName: "Copper",
    date: "2024-01-15",
    icon: "🟫",
  },
  {
    id: "2",
    mineralName: "Gold",
    date: "2024-01-14",
    icon: "🟡",
  },
  {
    id: "3",
    mineralName: "Iron",
    date: "2024-01-13",
    icon: "⚫",
  },
  {
    id: "4",
    mineralName: "Silver",
    date: "2024-01-12",
    icon: "⚪",
  },
  {
    id: "5",
    mineralName: "Platinum",
    date: "2024-01-11",
    icon: "🔘",
  },
];

export default function TopDemands() {
  return (
    <div className="bg-transparent border border-[#323539] rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold">Top Demands</h3>
        <button className="text-[#0A77FF] hover:text-[#0A77FF]/80 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {mockDemands.map(demand => (
          <div
            key={demand.id}
            className="bg-[#1A1D21] border border-[#323539] rounded-xl p-4 hover:border-[#0A77FF]/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{demand.icon}</span>
                <div>
                  <h4 className="text-white font-medium">{demand.mineralName}</h4>
                  <p className="text-gray-400 text-sm">{demand.date}</p>
                </div>
              </div>
              <button className="text-[#0A77FF] hover:text-[#0A77FF]/80">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
