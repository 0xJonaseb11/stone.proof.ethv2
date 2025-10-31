"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { formatEther } from "viem";
import { useAccount, useBlockNumber } from "wagmi";
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

interface LicenseApplication {
  applicationId: bigint;
  applicant: `0x${string}`;
  licenseType: number;
  status: number;
  submissionDate: bigint;
  approvalDate: bigint;
  expiryDate: bigint;
  annualProductionLimit: bigint;
  requiresEnvironmentalBond: boolean;
  bondAmount: bigint;
  bondPosted: boolean;
}

interface ApplicationData {
  companyDetailsIPFS: string;
  projectDetailsIPFS: string;
  environmentalImpactIPFS: string;
  financialCapabilityIPFS: string;
  geographicArea: string;
  rejectionReason: string;
}

export default function LicensePortal() {
  const { address, isConnected } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const { data: contract } = useDeployedContractInfo("MineralLicenseManager");

  // === Contract Reads (Top Level Only) ===
  const { data: totalApplications } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getTotalApplications",
  });

  const { data: submittedIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(1)],
  });

  const { data: underReviewIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(2)],
  });

  const { data: approvedIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(3)],
  });

  const { data: rejectedIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(4)],
  });

  const { data: suspendedIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(5)],
  });

  const { data: revokedIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(6)],
  });

  const { data: myApplicationIds = [] } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicantApplications",
    args: [address || "0x0"],
    enabled: !!address,
  });

  // === Fetch Full Application Data (Memoized, No Hook in Loop) ===
  const recentAppIds = useMemo(() => {
    return [...submittedIds, ...underReviewIds, ...approvedIds]
      .sort((a, b) => Number(b) - Number(a)) // newest first
      .slice(0, 5);
  }, [submittedIds, underReviewIds, approvedIds]);

  const myAppIds = useMemo(() => {
    return myApplicationIds.slice(0, 3);
  }, [myApplicationIds]);

  // === Batch Fetch Applications ===
  const recentApplications = recentAppIds
    .map(id => {
      const { data } = useScaffoldReadContract({
        contractName: "MineralLicenseManager",
        functionName: "getApplication",
        args: [id],
      });
      return data ? { id, license: data[0] as LicenseApplication, appData: data[1] as ApplicationData } : null;
    })
    .filter(Boolean);

  const myApplications = myAppIds
    .map(id => {
      const { data } = useScaffoldReadContract({
        contractName: "MineralLicenseManager",
        functionName: "getApplication",
        args: [id],
      });
      return data ? { id, license: data[0] as LicenseApplication, appData: data[1] as ApplicationData } : null;
    })
    .filter(Boolean);

  // === Stats ===
  const stats = useMemo(
    () => ({
      totalApplications: Number(totalApplications || 0),
      pendingReview: submittedIds.length + underReviewIds.length,
      approvedLicenses: approvedIds.length,
      suspendedLicenses: suspendedIds.length,
      rejectedApplications: rejectedIds.length,
      revokedLicenses: revokedIds.length,
    }),
    [totalApplications, submittedIds, underReviewIds, approvedIds, suspendedIds, rejectedIds, revokedIds],
  );

  // === Helpers ===
  const getStatusConfig = (status: number) => {
    const config = {
      1: { label: "Submitted", color: "badge-warning", icon: ClockIcon },
      2: { label: "Under Review", color: "badge-info", icon: MagnifyingGlassIcon },
      3: { label: "Approved", color: "badge-success", icon: CheckCircleIcon },
      4: { label: "Rejected", color: "badge-error", icon: XCircleIcon },
      5: { label: "Suspended", color: "badge-warning", icon: ExclamationTriangleIcon },
      6: { label: "Revoked", color: "badge-error", icon: ShieldCheckIcon },
    }[status] || { label: "Unknown", color: "badge-neutral", icon: DocumentTextIcon };
    return config;
  };

  const getLicenseTypeName = (type: number) => {
    const types = [
      "Prospecting",
      "Exploration",
      "Small Scale Mining",
      "Large Scale Mining",
      "Processing",
      "Trading/Export",
    ];
    return types[type] || "Unknown";
  };

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const quickActions = [
    {
      title: "Apply for License",
      desc: "Submit new mining license",
      href: "/licenses/apply",
      icon: DocumentTextIcon,
      color: "bg-primary",
    },
    {
      title: "Review Applications",
      desc: "Approve or reject submissions",
      href: "/licenses/review",
      icon: UserGroupIcon,
      color: "bg-secondary",
    },
    {
      title: "My Licenses",
      desc: "View your active licenses",
      href: "/licenses/my",
      icon: ShieldCheckIcon,
      color: "bg-success",
    },
    {
      title: "Compliance Dashboard",
      desc: "Inspect & audit licenses",
      href: "/licenses/compliance",
      icon: MagnifyingGlassIcon,
      color: "bg-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-base-content">StoneProof License Portal</h1>
          <p className="text-base-content/70 mt-2">Transparent mineral licensing on-chain</p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="badge badge-primary badge-lg">Block #{blockNumber?.toString()}</div>
            {isConnected && (
              <div className="text-sm font-mono bg-base-200 px-3 py-1 rounded">
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Total Applications",
              value: stats.totalApplications,
              icon: DocumentTextIcon,
              color: "text-primary",
            },
            { label: "Pending Review", value: stats.pendingReview, icon: ClockIcon, color: "text-warning" },
            { label: "Active Licenses", value: stats.approvedLicenses, icon: CheckCircleIcon, color: "text-success" },
            { label: "Suspended", value: stats.suspendedLicenses, icon: ExclamationTriangleIcon, color: "text-error" },
            { label: "Rejected", value: stats.rejectedApplications, icon: XCircleIcon, color: "text-error" },
            { label: "Revoked", value: stats.revokedLicenses, icon: ShieldCheckIcon, color: "text-error" },
          ].map((stat, i) => (
            <div key={i} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-base-content">{stat.label}</h3>
                    <p className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}/30`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-base-content mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map(action => (
              <Link
                key={action.title}
                href={action.href}
                className="group card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-base-300"
              >
                <div className="card-body p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-base-content/70">{action.desc}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card bg-base-100 shadow-xl mb-10">
          <div className="card-body">
            <h2 className="card-title text-xl text-base-content mb-4">Recent Activity</h2>
            {recentApplications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Applicant</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApplications.map(app => {
                      const { id, license: a } = app!;
                      const status = getStatusConfig(a.status);
                      return (
                        <tr key={id.toString()} className="hover">
                          <td className="font-mono">#{id.toString()}</td>
                          <td className="font-mono text-xs">
                            {`${a.applicant.slice(0, 6)}...${a.applicant.slice(-4)}`}
                          </td>
                          <td>{getLicenseTypeName(a.licenseType)}</td>
                          <td>
                            <div className={`badge ${status.color} flex items-center gap-1`}>
                              <status.icon className="w-3 h-3" />
                              {status.label}
                            </div>
                          </td>
                          <td>{formatDate(a.submissionDate)}</td>
                          <td>
                            <Link href={`/licenses/review/${id}`} className="btn btn-ghost btn-xs">
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-base-content/50">No recent activity</div>
            )}
          </div>
        </div>

        {/* My Applications */}
        {isConnected && myApplications.length > 0 && (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl text-base-content mb-4">My Applications</h2>
              <div className="space-y-4">
                {myApplications.map(app => {
                  const { id, license: a } = app!;
                  const status = getStatusConfig(a.status);
                  const isActive = a.status === 3 && a.expiryDate > BigInt(Math.floor(Date.now() / 1000));
                  return (
                    <div key={id.toString()} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full ${isActive ? "bg-success" : "bg-base-300"} flex items-center justify-center text-white`}
                        >
                          {isActive ? <CheckCircleIcon className="w-6 h-6" /> : <ClockIcon className="w-6 h-6" />}
                        </div>
                        <div>
                          <p className="font-semibold">
                            #{id.toString()} - {getLicenseTypeName(a.licenseType)}
                          </p>
                          <p className="text-sm text-base-content/70">
                            Submitted: {formatDate(a.submissionDate)}
                            {a.expiryDate > 0 && ` | Expires: ${formatDate(a.expiryDate)}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`badge ${status.color}`}>{status.label}</div>
                        <Link href={`/licenses/my/${id}`} className="btn btn-ghost btn-xs">
                          View
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
