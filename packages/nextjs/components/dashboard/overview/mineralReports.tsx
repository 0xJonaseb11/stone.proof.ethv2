"use client";

import { cn } from "~~/utils/dashboard/cn";

interface Report {
  id: string;
  title: string;
  mineral: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  priority: "low" | "medium" | "high";
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "Monthly Copper Production Report",
    mineral: "Copper",
    date: "2024-01-15",
    status: "approved",
    priority: "high",
  },
  {
    id: "2",
    title: "Gold Quality Assessment",
    mineral: "Gold",
    date: "2024-01-14",
    status: "pending",
    priority: "medium",
  },
  {
    id: "3",
    title: "Iron Ore Extraction Summary",
    mineral: "Iron",
    date: "2024-01-13",
    status: "rejected",
    priority: "low",
  },
  {
    id: "4",
    title: "Silver Refinement Report",
    mineral: "Silver",
    date: "2024-01-12",
    status: "approved",
    priority: "high",
  },
  {
    id: "5",
    title: "Platinum Mining Analysis",
    mineral: "Platinum",
    date: "2024-01-11",
    status: "pending",
    priority: "medium",
  },
];

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const priorityColors = {
  low: "bg-blue-500/20 text-blue-400",
  medium: "bg-orange-500/20 text-orange-400",
  high: "bg-red-500/20 text-red-400",
};

export default function MineralReports() {
  return (
    <div className="bg-transparent border border-[#323539] rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-xl font-semibold">Mineral Reports</h3>
        <button className="text-[#0A77FF] hover:text-[#0A77FF]/80 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {mockReports.map(report => (
          <div
            key={report.id}
            className="bg-[#1A1D21] border border-[#323539] rounded-xl p-4 hover:border-[#0A77FF]/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-white font-medium mb-1">{report.title}</h4>
                <p className="text-gray-400 text-sm">{report.mineral}</p>
              </div>
              <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", statusColors[report.status])}>
                {report.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">{report.date}</span>
              <span className={cn("px-2 py-1 rounded-full text-xs font-medium", priorityColors[report.priority])}>
                {report.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
