"use client";

import React, { useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import {
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

interface LicenseApplication {
  applicationId: bigint;
  applicant: `0x${string}`;
  licenseType: number;
  status: number;
  submissionDate: bigint;
  annualProductionLimit: bigint;
  requiresEnvironmentalBond: boolean;
  bondAmount: bigint;
  bondPosted: boolean;
}

export default function ReviewLicenses() {
  const { address, isConnected } = useAccount();
  const [selectedApplication, setSelectedApplication] = useState<LicenseApplication | null>(null);
  const [reviewComment, setReviewComment] = useState("");

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");
  const writeTx = useTransactor();

  // Fetch pending applications (SUBMITTED = 1)
  const { data: pendingAppIds = [], refetch: refetchApplications } = useScaffoldReadContract({
    contractName: "MineralLicenseManager",
    functionName: "getApplicationsByStatus",
    args: [BigInt(1)], // SUBMITTED
  });

  const { writeContractAsync, isPending: isReviewing } = useScaffoldWriteContract("MineralLicenseManager");

  // Fetch full application details for each ID
  const applications = pendingAppIds
    .map((id: bigint) => {
      const { data } = useScaffoldReadContract({
        contractName: "MineralLicenseManager",
        functionName: "getApplication",
        args: [id],
      });
      return { id, data };
    })
    .filter(app => app.data);

  const handleReview = async (appId: bigint, approve: boolean) => {
    if (!mineralLicenseManager) return;

    const status = approve ? BigInt(3) : BigInt(4); // 3=APPROVED, 4=REJECTED
    const defaultComment = approve ? "Application approved" : "Application rejected";

    try {
      const hash = await writeContractAsync({
        functionName: "reviewApplication",
        args: [appId, status, reviewComment || defaultComment],
      });

      await writeTx({
        hash,
        onSuccess: () => {
          setReviewComment("");
          setSelectedApplication(null);
          refetchApplications();
        },
      });
    } catch (error: any) {
      console.error("Review failed:", error);
      alert(error?.shortMessage || "Review failed");
    }
  };

  const getStatusBadge = (status: number) => {
    const config = {
      1: { label: "Submitted", color: "badge-warning" },
      2: { label: "Under Review", color: "badge-info" },
      3: { label: "Approved", color: "badge-success" },
      4: { label: "Rejected", color: "badge-error" },
      5: { label: "Suspended", color: "badge-warning" },
      6: { label: "Revoked", color: "badge-error" },
    }[status] || { label: "Unknown", color: "badge-neutral" };

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
          <p className="text-base-content/70 mt-2">Approve or reject pending mineral license applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  Pending Applications
                  <div className="badge badge-primary badge-lg ml-2">{applications.length}</div>
                </h2>

                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Applicant</th>
                        <th>Type</th>
                        <th>Submitted</th>
                        <th>Production</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.length > 0 ? (
                        applications.map(({ id, data }) => {
                          const app = data![0] as LicenseApplication;
                          const appData = data![1] as any;

                          return (
                            <tr
                              key={id.toString()}
                              className="hover cursor-pointer"
                              onClick={() => setSelectedApplication(app)}
                            >
                              <td className="font-mono">#{id.toString()}</td>
                              <td className="font-mono text-xs">
                                {`${app.applicant.slice(0, 6)}...${app.applicant.slice(-4)}`}
                              </td>
                              <td>{getLicenseTypeName(app.licenseType)}</td>
                              <td>{new Date(Number(app.submissionDate) * 1000).toLocaleDateString()}</td>
                              <td>{app.annualProductionLimit.toString()} t</td>
                              <td>{getStatusBadge(app.status)}</td>
                              <td>
                                <button
                                  className="btn btn-ghost btn-xs"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setSelectedApplication(app);
                                  }}
                                >
                                  Review
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-base-content/50">
                            No pending applications
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
                    Review Application #{selectedApplication.applicationId.toString()}
                  </h2>

                  <div className="space-y-4 text-sm">
                    <div>
                      <label className="label">
                        <span className="label-text">Applicant</span>
                      </label>
                      <div className="font-mono text-xs bg-base-300 p-2 rounded break-all">
                        {selectedApplication.applicant}
                      </div>
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
                          <span className="label-text">Bond Required</span>
                        </label>
                        <div className="text-warning font-bold">{formatEther(selectedApplication.bondAmount)} ETH</div>
                      </div>
                    )}

                    <div>
                      <label className="label">
                        <span className="label-text">IPFS Documents</span>
                      </label>
                      <div className="space-y-1 text-xs">
                        <a
                          href={`https://ipfs.io/ipfs/${selectedApplication.applicationData?.companyDetailsIPFS?.split("/")[2]}`}
                          target="_blank"
                          className="link link-primary"
                        >
                          Company Details
                        </a>
                        <br />
                        <a
                          href={`https://ipfs.io/ipfs/${selectedApplication.applicationData?.projectDetailsIPFS?.split("/")[2]}`}
                          target="_blank"
                          className="link link-primary"
                        >
                          Project Details
                        </a>
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Review Comments</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full h-24"
                        placeholder="Optional: Add rejection reason or approval notes..."
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                      />
                    </div>

                    <div className="card-actions justify-end space-x-2 mt-4">
                      <button
                        className="btn btn-error btn-sm flex items-center gap-1"
                        disabled={isReviewing}
                        onClick={() => handleReview(selectedApplication.applicationId, false)}
                      >
                        {isReviewing ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <XCircleIcon className="w-4 h-4" />
                        )}
                        Reject
                      </button>
                      <button
                        className="btn btn-success btn-sm flex items-center gap-1"
                        disabled={isReviewing}
                        onClick={() => handleReview(selectedApplication.applicationId, true)}
                      >
                        {isReviewing ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          <CheckCircleIcon className="w-4 h-4" />
                        )}
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card bg-base-200 shadow-xl h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <DocumentTextIcon className="w-16 h-16 mx-auto text-base-content/30 mb-4" />
                  <h3 className="text-lg font-semibold">Select an Application</h3>
                  <p className="text-base-content/70 text-sm mt-2">Click on any row to review details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
