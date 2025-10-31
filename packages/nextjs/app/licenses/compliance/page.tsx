"use client";

import React, { useState } from "react";
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";

interface LicenseApplication {
  applicationId: bigint;
  applicant: string;
  licenseType: number;
  status: number;
  approvalDate: bigint;
  expiryDate: bigint;
  annualProductionLimit: bigint;
}

export default function CompliancePage() {
  const { address } = useAccount();
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const [inspectionData, setInspectionData] = useState({
    passed: true,
    findings: "",
    nextInspectionDue: "",
  });
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");

  // Fetch approved licenses for compliance
  const { data: approvedLicenses, refetch: refetchLicenses } = useContractRead({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "getApplicationsByStatus",
    args: [3], // APPROVED status
    enabled: !!mineralLicenseManager?.address,
  });

  // Contract write for adding compliance inspection
  const { writeAsync: addComplianceInspection } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "addComplianceInspection",
  });

  const handleSubmitInspection = async () => {
    if (!selectedLicense || !mineralLicenseManager?.address) return;

    setActionLoading("submit");
    try {
      const nextInspectionDate = Math.floor(new Date(inspectionData.nextInspectionDue).getTime() / 1000);

      await addComplianceInspection({
        args: [BigInt(selectedLicense), inspectionData.passed, inspectionData.findings, BigInt(nextInspectionDate)],
      });

      // Reset form
      setInspectionData({
        passed: true,
        findings: "",
        nextInspectionDue: "",
      });
      setSelectedLicense("");
      refetchLicenses();

      alert("Compliance inspection recorded successfully!");
    } catch (error) {
      console.error("Error recording inspection:", error);
      alert("Failed to record inspection");
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

  const formatDate = (timestamp: bigint) => {
    if (!timestamp || Number(timestamp) === 0) return "N/A";
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const getDaysUntilExpiry = (expiryDate: bigint) => {
    const expiry = new Date(Number(expiryDate) * 1000);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Compliance Management</h1>
          <p className="text-base-content/70 mt-2">
            Conduct inspections and monitor compliance for active mineral licenses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Licenses List */}
          <div className="lg:col-span-2">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">
                  Active Licenses for Inspection
                  <div className="badge badge-primary">
                    {Array.isArray(approvedLicenses) ? approvedLicenses.length : 0}
                  </div>
                </h2>

                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>License ID</th>
                        <th>Type</th>
                        <th>Applicant</th>
                        <th>Approved</th>
                        <th>Expires</th>
                        <th>Days Left</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(approvedLicenses) && approvedLicenses.length > 0 ? (
                        approvedLicenses.map((license: LicenseApplication, index: number) => {
                          const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
                          return (
                            <tr key={index} className="hover">
                              <td className="font-mono">#{license.applicationId.toString()}</td>
                              <td>{getLicenseTypeName(license.licenseType)}</td>
                              <td className="font-mono text-xs">
                                {license.applicant.slice(0, 6)}...{license.applicant.slice(-4)}
                              </td>
                              <td>{formatDate(license.approvalDate)}</td>
                              <td>{formatDate(license.expiryDate)}</td>
                              <td>
                                <div className={`badge ${daysUntilExpiry < 30 ? "badge-warning" : "badge-success"}`}>
                                  {daysUntilExpiry} days
                                </div>
                              </td>
                              <td>
                                <button
                                  className="btn btn-ghost btn-xs"
                                  onClick={() => setSelectedLicense(license.applicationId.toString())}
                                >
                                  Inspect
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-8">
                            <div className="text-base-content/50">
                              No active licenses found for compliance inspection
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Form */}
          <div className="lg:col-span-1">
            {selectedLicense ? (
              <div className="card bg-base-200 shadow-xl sticky top-6">
                <div className="card-body">
                  <h2 className="card-title text-base-content">
                    Record Inspection
                    <div className="badge badge-primary">#{selectedLicense}</div>
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Inspection Result</span>
                      </label>
                      <div className="flex space-x-4">
                        <label className="cursor-pointer label">
                          <input
                            type="radio"
                            name="inspectionResult"
                            className="radio radio-success"
                            checked={inspectionData.passed}
                            onChange={() => setInspectionData(prev => ({ ...prev, passed: true }))}
                          />
                          <span className="label-text ml-2">Passed</span>
                        </label>
                        <label className="cursor-pointer label">
                          <input
                            type="radio"
                            name="inspectionResult"
                            className="radio radio-error"
                            checked={!inspectionData.passed}
                            onChange={() => setInspectionData(prev => ({ ...prev, passed: false }))}
                          />
                          <span className="label-text ml-2">Failed</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Findings & Notes</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered w-full h-32"
                        placeholder="Enter inspection findings, observations, and recommendations..."
                        value={inspectionData.findings}
                        onChange={e => setInspectionData(prev => ({ ...prev, findings: e.target.value }))}
                      />
                    </div>

                    <div>
                      <label className="label">
                        <span className="label-text">Next Inspection Due</span>
                      </label>
                      <input
                        type="date"
                        className="input input-bordered w-full"
                        value={inspectionData.nextInspectionDue}
                        onChange={e => setInspectionData(prev => ({ ...prev, nextInspectionDue: e.target.value }))}
                      />
                    </div>

                    <div className="card-actions justify-end">
                      <button className="btn btn-ghost btn-sm" onClick={() => setSelectedLicense("")}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={actionLoading === "submit" || !inspectionData.nextInspectionDue}
                        onClick={handleSubmitInspection}
                      >
                        {actionLoading === "submit" ? (
                          <span className="loading loading-spinner"></span>
                        ) : (
                          "Record Inspection"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="card-title justify-center text-base-content">Select License</h3>
                  <p className="text-base-content/70">
                    Choose a license from the list to record a compliance inspection
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <div className="text-4xl text-success mb-2">✅</div>
              <h3 className="card-title justify-center">Compliant Licenses</h3>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-base-content/70">Passed recent inspections</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <div className="text-4xl text-warning mb-2">⚠️</div>
              <h3 className="card-title justify-center">Due for Inspection</h3>
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-base-content/70">Within next 30 days</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-xl">
            <div className="card-body text-center">
              <div className="text-4xl text-error mb-2">❌</div>
              <h3 className="card-title justify-center">Non-Compliant</h3>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-base-content/70">Failed inspections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
