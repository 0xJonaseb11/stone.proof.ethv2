"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useBlockNumber, useContractRead } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface LicenseStats {
  totalApplications: number;
  pendingReview: number;
  approvedLicenses: number;
  suspendedLicenses: number;
}

export default function LicensePortal() {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [stats, setStats] = useState<LicenseStats>({
    totalApplications: 0,
    pendingReview: 0,
    approvedLicenses: 0,
    suspendedLicenses: 0,
  });

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");

  // Fetch contract data
  const { data: totalApplications } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getTotalApplications",
    watch: true,
  });

  const { data: pendingApplications } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getApplicationsByStatus",
    args: [1], // SUBMITTED status
    watch: true,
  });

  const { data: approvedApplications } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getApplicationsByStatus",
    args: [3], // APPROVED status
    watch: true,
  });

  useEffect(() => {
    if (totalApplications !== undefined && pendingApplications !== undefined && approvedApplications !== undefined) {
      setStats({
        totalApplications: Number(totalApplications),
        pendingReview: Array.isArray(pendingApplications) ? pendingApplications.length : 0,
        approvedLicenses: Array.isArray(approvedApplications) ? approvedApplications.length : 0,
        suspendedLicenses: 12, // Mock data for suspended licenses
      });
    }
  }, [totalApplications, pendingApplications, approvedApplications]);

  const quickActions = [
    {
      title: "New Application",
      description: "Apply for mining license",
      href: "/licenses/apply",
      icon: "📝",
      color: "bg-primary",
      role: "applicant",
    },
    {
      title: "Review Applications",
      description: "Manage pending applications",
      href: "/licenses/review",
      icon: "👥",
      color: "bg-secondary",
      role: "manager",
    },
    {
      title: "Active Licenses",
      description: "View all active licenses",
      href: "/licenses/active",
      icon: "✅",
      color: "bg-success",
      role: "all",
    },
    {
      title: "Compliance",
      description: "Conduct inspections",
      href: "/licenses/compliance",
      icon: "🔍",
      color: "bg-warning",
      role: "compliance",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-base-content">License Management Portal</h1>
            <p className="text-base-content/70 mt-2">StoneProof Mineral Licensing System</p>
          </div>
          <div className="text-right">
            <div className="badge badge-primary badge-lg">Block: {blockNumber?.toString()}</div>
            <div className="text-sm text-base-content/50 mt-1">
              Connected: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary">Total Applications</h2>
            <p className="text-3xl font-bold">{stats.totalApplications}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">All Time</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-warning">Pending Review</h2>
            <p className="text-3xl font-bold">{stats.pendingReview}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-warning">Needs Action</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-success">Active Licenses</h2>
            <p className="text-3xl font-bold">{stats.approvedLicenses}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-success">Operational</div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">Suspended</h2>
            <p className="text-3xl font-bold">{stats.suspendedLicenses}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-error">Compliance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-base-content mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-2xl`}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="card-title text-lg">{action.title}</h3>
                    <p className="text-base-content/70 text-sm">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-base-content">Recent License Activity</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Applicant</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#001</td>
                  <td>0x742d...3a1f</td>
                  <td>Small Scale Mining</td>
                  <td>
                    <div className="badge badge-warning">Under Review</div>
                  </td>
                  <td>2024-01-15</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">View</button>
                  </td>
                </tr>
                <tr>
                  <td>#002</td>
                  <td>0x8a3b...9c2d</td>
                  <td>Large Scale Mining</td>
                  <td>
                    <div className="badge badge-success">Approved</div>
                  </td>
                  <td>2024-01-14</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">View</button>
                  </td>
                </tr>
                <tr>
                  <td>#003</td>
                  <td>0x5e1a...7b3c</td>
                  <td>Processing</td>
                  <td>
                    <div className="badge badge-error">Suspended</div>
                  </td>
                  <td>2024-01-13</td>
                  <td>
                    <button className="btn btn-ghost btn-xs">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
