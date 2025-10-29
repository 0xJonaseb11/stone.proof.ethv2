"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

interface LicenseApplication {
  applicationId: bigint;
  applicant: string;
  licenseType: number;
  status: number;
  submissionDate: bigint;
  annualProductionLimit: bigint;
  requiresEnvironmentalBond: boolean;
  bondAmount: bigint;
  bondPosted: boolean;
}

export default function ReviewLicenses() {
  const { address } = useAccount();
  const [selectedApplication, setSelectedApplication] = useState<LicenseApplication | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");
  const writeTx = useTransactor();

  // Fetch pending applications
  const { data: pendingApplications, refetch: refetchApplications } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getApplicationsByStatus",
    args: [1], // SUBMITTED status
    watch: true,
  });

  const { writeAsync: reviewApplication } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "reviewApplication",
  });

  const { isLoading: isReviewLoading } = useWaitForTransaction({
    hash: reviewApplication?.toString(),
  });

  const handleReviewAction = async (applicationId: number, status: number) => {
    if (!mineralLicenseManager?.address) return;

    setActionLoading(applicationId);

    try {
      await reviewApplication({
        args: [
          BigInt(applicationId),
          status,
          reviewComment || (status === 4 ? "Application rejected" : "Application approved"),
        ],
      });

      setReviewComment("");
      setSelectedApplication(null);
      refetchApplications();
    } catch (error) {
      console.error("Error reviewing application:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: number) => {
    const statusConfig = {
      1: { label: "Submitted", color: "badge-warning" },
      2: { label: "Under Review", color: "badge-info" },
      3: { label: "Approved", color: "badge-success" },
      4: { label: "Rejected", color: "badge-error" },
      5: { label: "Suspended", color: "badge-warning" },
      6: { label: "Revoked", color: "badge-error" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || { label: "Unknown", color: "badge-neutral" };
    return <div className={`badge ${config.color}`}>{config.label}</div>;
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

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Review License Applications</h1>
          <p className="text-base-content/70 mt-2">Manage and review pending mineral license applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  Pending Applications
                  <div className="badge badge-primary badge-lg">
                    {Array.isArray(pendingApplications) ? pendingApplications.length : 0}
                  </div>
                </h2>

                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Applicant</th>
                        <th>Type</th>
                        <th>Submitted</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(pendingApplications) && pendingApplications.length > 0 ? (
                        pendingApplications.map((app: any, index: number) => (
                          <tr key={index} className="hover cursor-pointer">
                            <td className="font-mono">#{app.applicationId.toString()}</td>
                            <td className="font-mono text-xs">
                              {`${app.applicant.slice(0, 6)}...${app.applicant.slice(-4)}`}
                            </td>
                            <td>{getLicenseTypeName(app.licenseType)}</td>
                            <td>{new Date(Number(app.submissionDate) * 1000).toLocaleDateString()}</td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>
                              <button className="btn btn-ghost btn-xs" onClick={() => setSelectedApplication(app)}>
                                Review
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center py-8">
                            <div className="text-base-content/50">No pending applications to review</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Review Panel */}
          <div className="lg:col-span-1">
            {selectedApplication ? (
              <div className="card bg-base-200 shadow-xl sticky top-6">
                <div className="card-body">
                  <h2 className="card-title text-base-content">
                    Review Application
                    <div className="badge badge-primary">#{selectedApplication.applicationId.toString()}</div>
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Applicant</span>
                      </label>
                      <div className="font-mono text-sm bg-base-300 p-2 rounded">{selectedApplication.applicant}</div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">License Type</span>
                      </label>
                      <div className="font-semibold">{getLicenseTypeName(selectedApplication.licenseType)}</div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Production Limit</span>
                      </label>
                      <div>{selectedApplication.annualProductionLimit.toString()} tons/year</div>
                    </div>

                    {selectedApplication.requiresEnvironmentalBond && (
                      <div>
                        <label className="label">
                          <span className="label-text">Environmental Bond</span>
                        </label>
                        <div className="text-warning">Required: {selectedApplication.bondAmount.toString()} ETH</div>
                      </div>
                    )}

                    <div>
                      <label className="label">
                        <span className="label-text">Review Comments</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full h-24"
                        placeholder="Enter review comments or rejection reason..."
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                      />
                    </div>

                    <div className="card-actions justify-end space-x-2">
                      <button
                        className="btn btn-error btn-sm"
                        disabled={actionLoading === Number(selectedApplication.applicationId)}
                        onClick={() => handleReviewAction(Number(selectedApplication.applicationId), 4)}
                      >
                        {actionLoading === Number(selectedApplication.applicationId) ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Reject"
                        )}
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        disabled={actionLoading === Number(selectedApplication.applicationId)}
                        onClick={() => handleReviewAction(Number(selectedApplication.applicationId), 3)}
                      >
                        {actionLoading === Number(selectedApplication.applicationId) ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Approve"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="card-title justify-center text-base-content">Select Application</h3>
                  <p className="text-base-content/70">
                    Choose an application from the list to review details and take action
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
