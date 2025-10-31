"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface LicenseApplication {
  applicationId: bigint;
  applicant: string;
  licenseType: number;
  status: number;
  submissionDate: bigint;
  reviewDate: bigint;
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

export default function ApplicationDetail() {
  const { address } = useAccount();
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  const [application, setApplication] = useState<LicenseApplication | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [complianceRecords, setComplianceRecords] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");

  // Fetch application details
  const { data: applicationDetails, refetch: refetchApplication } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getApplication",
    args: [BigInt(applicationId)],
    enabled: !!mineralLicenseManager?.address && !!applicationId,
  });

  // Fetch compliance records
  const { data: complianceData } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getComplianceRecords",
    args: [BigInt(applicationId)],
    enabled: !!mineralLicenseManager?.address && !!applicationId,
  });

  // Contract write functions
  const { writeAsync: approveApplication } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "reviewApplication",
  });

  const { writeAsync: rejectApplication } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "reviewApplication",
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

  useEffect(() => {
    if (applicationDetails) {
      const [app, data] = applicationDetails as [LicenseApplication, ApplicationData];
      setApplication(app);
      setApplicationData(data);
    }
  }, [applicationDetails]);

  useEffect(() => {
    if (complianceData) {
      setComplianceRecords(complianceData as any[]);
    }
  }, [complianceData]);

  const handleApprove = async () => {
    if (!application) return;

    setActionLoading("approve");
    try {
      await approveApplication({
        args: [application.applicationId, 3, "Application approved"], // 3 = APPROVED
      });
      refetchApplication();
    } catch (error) {
      console.error("Error approving application:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (reason: string) => {
    if (!application) return;

    setActionLoading("reject");
    try {
      await rejectApplication({
        args: [application.applicationId, 4, reason], // 4 = REJECTED
      });
      refetchApplication();
    } catch (error) {
      console.error("Error rejecting application:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSuspend = async (reason: string) => {
    if (!application) return;

    setActionLoading("suspend");
    try {
      await suspendLicense({
        args: [application.applicationId, reason],
      });
      refetchApplication();
    } catch (error) {
      console.error("Error suspending license:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRevoke = async (reason: string) => {
    if (!application) return;

    setActionLoading("revoke");
    try {
      await revokeLicense({
        args: [application.applicationId, reason],
      });
      refetchApplication();
    } catch (error) {
      console.error("Error revoking license:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: number) => {
    const statusConfig = {
      0: { label: "Draft", color: "badge-neutral" },
      1: { label: "Submitted", color: "badge-warning" },
      2: { label: "Under Review", color: "badge-info" },
      3: { label: "Approved", color: "badge-success" },
      4: { label: "Rejected", color: "badge-error" },
      5: { label: "Suspended", color: "badge-warning" },
      6: { label: "Revoked", color: "badge-error" },
      7: { label: "Expired", color: "badge-neutral" },
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

  const formatDate = (timestamp: bigint) => {
    if (!timestamp || Number(timestamp) === 0) return "N/A";
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  if (!application) {
    return (
      <div className="min-h-screen bg-base-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content">Loading application details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <Link href="/licenses" className="btn btn-ghost btn-sm mb-2">
                ← Back to License Portal
              </Link>
              <h1 className="text-3xl font-bold text-base-content">
                Application #{application.applicationId.toString()}
              </h1>
              <p className="text-base-content/70 mt-2">{getLicenseTypeName(application.licenseType)} License</p>
            </div>
            <div className="text-right">
              {getStatusBadge(application.status)}
              <div className="text-sm text-base-content/50 mt-1">
                Submitted: {formatDate(application.submissionDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Application Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applicant Info */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">Applicant Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Applicant Address</span>
                    </label>
                    <div className="font-mono text-sm bg-base-300 p-2 rounded">{application.applicant}</div>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">License Type</span>
                    </label>
                    <div className="font-semibold">{getLicenseTypeName(application.licenseType)}</div>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Annual Production Limit</span>
                    </label>
                    <div>{application.annualProductionLimit.toString()} tons/year</div>
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">Geographic Area</span>
                    </label>
                    <div>{applicationData?.geographicArea || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">Application Timeline</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-success rounded-full"></div>
                    <div>
                      <p className="font-semibold">Submitted</p>
                      <p className="text-sm text-base-content/70">{formatDate(application.submissionDate)}</p>
                    </div>
                  </div>
                  {application.reviewDate > 0 && (
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-info rounded-full"></div>
                      <div>
                        <p className="font-semibold">Under Review</p>
                        <p className="text-sm text-base-content/70">{formatDate(application.reviewDate)}</p>
                      </div>
                    </div>
                  )}
                  {application.approvalDate > 0 && (
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <div>
                        <p className="font-semibold">Approved</p>
                        <p className="text-sm text-base-content/70">{formatDate(application.approvalDate)}</p>
                      </div>
                    </div>
                  )}
                  {application.expiryDate > 0 && (
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div>
                        <p className="font-semibold">Expires</p>
                        <p className="text-sm text-base-content/70">{formatDate(application.expiryDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Compliance Records */}
            {complianceRecords.length > 0 && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-base-content">Compliance History</h2>
                  <div className="space-y-4">
                    {complianceRecords.map((record, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">
                              Inspection by {record.inspector.slice(0, 6)}...{record.inspector.slice(-4)}
                            </p>
                            <p className="text-sm text-base-content/70">
                              {new Date(Number(record.inspectionDate) * 1000).toLocaleDateString()}
                            </p>
                            <div className={`badge ${record.passed ? "badge-success" : "badge-error"} mt-2`}>
                              {record.passed ? "Passed" : "Failed"}
                            </div>
                          </div>
                        </div>
                        {record.findingsIPFS && <p className="mt-2 text-sm">{record.findingsIPFS}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Actions & Status */}
          <div className="space-y-6">
            {/* Bond Information */}
            {application.requiresEnvironmentalBond && (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-base-content">Environmental Bond</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Required Amount:</span>
                      <span className="font-semibold">{application.bondAmount.toString()} ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={application.bondPosted ? "text-success" : "text-warning"}>
                        {application.bondPosted ? "Posted" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Application Actions */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">Actions</h2>
                <div className="space-y-3">
                  {/* Review Actions */}
                  {application.status === 1 && ( // SUBMITTED
                    <>
                      <button
                        className="btn btn-success btn-sm w-full"
                        disabled={actionLoading !== null}
                        onClick={handleApprove}
                      >
                        {actionLoading === "approve" ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Approve Application"
                        )}
                      </button>
                      <div className="dropdown dropdown-top w-full">
                        <div tabIndex={0} role="button" className="btn btn-error btn-sm w-full">
                          {actionLoading === "reject" ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Reject Application"
                          )}
                        </div>
                        <div
                          tabIndex={0}
                          className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100"
                        >
                          <div className="card-body">
                            <h3 className="card-title">Rejection Reason</h3>
                            <input
                              type="text"
                              placeholder="Enter reason for rejection"
                              className="input input-bordered input-sm w-full"
                              id="rejection-reason"
                            />
                            <div className="card-actions justify-end">
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => {
                                  const reason =
                                    (document.getElementById("rejection-reason") as HTMLInputElement)?.value ||
                                    "Application rejected";
                                  handleReject(reason);
                                }}
                              >
                                Confirm Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* License Management Actions */}
                  {application.status === 3 && ( // APPROVED
                    <>
                      <div className="dropdown dropdown-top w-full">
                        <div tabIndex={0} role="button" className="btn btn-warning btn-sm w-full">
                          {actionLoading === "suspend" ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Suspend License"
                          )}
                        </div>
                        <div
                          tabIndex={0}
                          className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100"
                        >
                          <div className="card-body">
                            <h3 className="card-title">Suspension Reason</h3>
                            <input
                              type="text"
                              placeholder="Enter reason for suspension"
                              className="input input-bordered input-sm w-full"
                              id="suspension-reason"
                            />
                            <div className="card-actions justify-end">
                              <button
                                className="btn btn-warning btn-xs"
                                onClick={() => {
                                  const reason =
                                    (document.getElementById("suspension-reason") as HTMLInputElement)?.value ||
                                    "License suspended";
                                  handleSuspend(reason);
                                }}
                              >
                                Confirm Suspend
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="dropdown dropdown-top w-full">
                        <div tabIndex={0} role="button" className="btn btn-error btn-sm w-full">
                          {actionLoading === "revoke" ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Revoke License"
                          )}
                        </div>
                        <div
                          tabIndex={0}
                          className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100"
                        >
                          <div className="card-body">
                            <h3 className="card-title">Revocation Reason</h3>
                            <input
                              type="text"
                              placeholder="Enter reason for revocation"
                              className="input input-bordered input-sm w-full"
                              id="revocation-reason"
                            />
                            <div className="card-actions justify-end">
                              <button
                                className="btn btn-error btn-xs"
                                onClick={() => {
                                  const reason =
                                    (document.getElementById("revocation-reason") as HTMLInputElement)?.value ||
                                    "License revoked";
                                  handleRevoke(reason);
                                }}
                              >
                                Confirm Revoke
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* View Documents */}
                  <button className="btn btn-outline btn-sm w-full">View Application Documents</button>
                </div>
              </div>
            </div>

            {/* Status Information */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">Status Information</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Current Status:</span>
                    {getStatusBadge(application.status)}
                  </div>
                  {application.reviewingOfficer !== "0x0000000000000000000000000000000000000000" && (
                    <div className="flex justify-between">
                      <span>Reviewing Officer:</span>
                      <span className="font-mono text-xs">
                        {application.reviewingOfficer.slice(0, 6)}...{application.reviewingOfficer.slice(-4)}
                      </span>
                    </div>
                  )}
                  {applicationData?.rejectionReason && (
                    <div>
                      <span className="font-semibold">Rejection Reason:</span>
                      <p className="text-error text-sm mt-1">{applicationData.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
