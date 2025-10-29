"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

interface License {
  applicationId: bigint;
  applicant: string;
  licenseType: number;
  status: number;
  approvalDate: bigint;
  expiryDate: bigint;
  annualProductionLimit: bigint;
  bondPosted: boolean;
}

export default function ActiveLicenses() {
  const { address } = useAccount();
  const [filter, setFilter] = useState<"all" | "active" | "suspended" | "expired">("active");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");
  const writeTx = useTransactor();

  // Fetch all applications
  const { data: allApplications, refetch: refetchApplications } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getApplicationsByStatus",
    args: [3], // APPROVED status
    watch: true,
  });

  const { writeAsync: suspendLicense } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "suspendLicense",
  });

  const { writeAsync: revokeLicense } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "revokeLicense",
  });

  const handleSuspendLicense = async (applicationId: number, reason: string) => {
    setActionLoading(applicationId);
    try {
      await suspendLicense({
        args: [BigInt(applicationId), reason],
      });
      refetchApplications();
    } catch (error) {
      console.error("Error suspending license:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevokeLicense = async (applicationId: number, reason: string) => {
    setActionLoading(applicationId);
    try {
      await revokeLicense({
        args: [BigInt(applicationId), reason],
      });
      refetchApplications();
    } catch (error) {
      console.error("Error revoking license:", error);
    } finally {
      setActionLoading(null);
    }
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

  const getDaysUntilExpiry = (expiryDate: bigint) => {
    const expiry = new Date(Number(expiryDate) * 1000);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isLicenseActive = (license: License) => {
    const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
    return daysUntilExpiry > 0 && license.status === 3; // APPROVED status
  };

  const filteredLicenses = Array.isArray(allApplications)
    ? allApplications.filter((license: License) => {
        if (filter === "active") return isLicenseActive(license);
        if (filter === "suspended") return license.status === 5; // SUSPENDED
        if (filter === "expired") return getDaysUntilExpiry(license.expiryDate) <= 0;
        return true;
      })
    : [];

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Active Licenses</h1>
          <p className="text-base-content/70 mt-2">Monitor and manage all active mineral licenses in the system</p>
        </div>

        {/* Filter Tabs */}
        <div className="tabs tabs-boxed bg-base-200 p-1 mb-6">
          <button className={`tab ${filter === "all" ? "tab-active" : ""}`} onClick={() => setFilter("all")}>
            All Licenses
          </button>
          <button className={`tab ${filter === "active" ? "tab-active" : ""}`} onClick={() => setFilter("active")}>
            Active
          </button>
          <button
            className={`tab ${filter === "suspended" ? "tab-active" : ""}`}
            onClick={() => setFilter("suspended")}
          >
            Suspended
          </button>
          <button className={`tab ${filter === "expired" ? "tab-active" : ""}`} onClick={() => setFilter("expired")}>
            Expired
          </button>
        </div>

        {/* Licenses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLicenses.map((license: License, index: number) => {
            const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
            const isActive = isLicenseActive(license);
            const isSuspended = license.status === 5;
            const isExpired = daysUntilExpiry <= 0;

            return (
              <div key={index} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="card-title text-base-content">#{license.applicationId.toString()}</h2>
                    <div className="flex flex-col items-end space-y-1">
                      {isActive && <div className="badge badge-success">Active</div>}
                      {isSuspended && <div className="badge badge-warning">Suspended</div>}
                      {isExpired && <div className="badge badge-error">Expired</div>}
                      <div className={`text-xs ${daysUntilExpiry < 30 ? "text-warning" : "text-base-content/70"}`}>
                        {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : "Expired"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Type:</span> {getLicenseTypeName(license.licenseType)}
                    </div>
                    <div>
                      <span className="font-semibold">Applicant:</span>{" "}
                      <span className="font-mono text-xs">
                        {`${license.applicant.slice(0, 6)}...${license.applicant.slice(-4)}`}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Production:</span> {license.annualProductionLimit.toString()}{" "}
                      tons/year
                    </div>
                    <div>
                      <span className="font-semibold">Bond:</span>{" "}
                      {license.bondPosted ? (
                        <span className="text-success">Posted</span>
                      ) : license.licenseType === 3 || license.licenseType === 4 ? (
                        <span className="text-warning">Required</span>
                      ) : (
                        <span className="text-base-content/70">Not Required</span>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold">Approved:</span>{" "}
                      {new Date(Number(license.approvalDate) * 1000).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-semibold">Expires:</span>{" "}
                      {new Date(Number(license.expiryDate) * 1000).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    {isActive && (
                      <>
                        <button
                          className="btn btn-warning btn-sm"
                          disabled={actionLoading === Number(license.applicationId)}
                          onClick={() => handleSuspendLicense(Number(license.applicationId), "Compliance issue")}
                        >
                          {actionLoading === Number(license.applicationId) ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Suspend"
                          )}
                        </button>
                        <button
                          className="btn btn-error btn-sm"
                          disabled={actionLoading === Number(license.applicationId)}
                          onClick={() => handleRevokeLicense(Number(license.applicationId), "License revoked")}
                        >
                          Revoke
                        </button>
                      </>
                    )}
                    {isSuspended && <button className="btn btn-success btn-sm">Reinstate</button>}
                    {isExpired && <button className="btn btn-primary btn-sm">Renew</button>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLicenses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">No licenses found</h3>
            <p className="text-base-content/70">
              {filter === "active" ? "No active licenses in the system" : `No ${filter} licenses found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
