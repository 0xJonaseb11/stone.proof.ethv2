"use client";

import React, { useState } from "react";
import { parseEther } from "viem";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

const LICENSE_TYPES = [
  { id: 0, name: "Prospecting License", fee: "0.1", duration: "1 year" },
  { id: 1, name: "Exploration License", fee: "0.5", duration: "3 years" },
  { id: 2, name: "Small Scale Mining", fee: "1.0", duration: "5 years" },
  { id: 3, name: "Large Scale Mining", fee: "5.0", duration: "30 years" },
  { id: 4, name: "Processing License", fee: "2.0", duration: "20 years" },
  { id: 5, name: "Trading/Export License", fee: "1.5", duration: "10 years" },
];

export default function ApplyForLicense() {
  const { address } = useAccount();
  const [formData, setFormData] = useState({
    licenseType: 2,
    companyDetails: "",
    projectDetails: "",
    environmentalImpact: "",
    financialCapability: "",
    annualProductionLimit: "",
    geographicArea: "",
  });
  const [ipfsHashes, setIpfsHashes] = useState({
    companyDetails: "",
    projectDetails: "",
    environmentalImpact: "",
    financialCapability: "",
  });

  const { data: mineralLicenseManager } = useDeployedContractInfo("MineralLicenseManager");
  const writeTx = useTransactor();

  const { writeAsync: submitApplication, data: submitData } = useContractWrite({
    address: mineralLicenseManager?.address,
    abi: mineralLicenseManager?.abi,
    functionName: "submitApplication",
  });

  const { isLoading: isSubmitLoading } = useWaitForTransaction({
    hash: submitData?.hash,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const simulateIPFSUpload = (content: string): string => {
    // In real implementation, this would upload to IPFS and return hash
    return `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
  };

  const handleIPFSUpload = () => {
    setIpfsHashes({
      companyDetails: simulateIPFSUpload(formData.companyDetails),
      projectDetails: simulateIPFSUpload(formData.projectDetails),
      environmentalImpact: simulateIPFSUpload(formData.environmentalImpact),
      financialCapability: simulateIPFSUpload(formData.financialCapability),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    try {
      // Upload documents to IPFS first
      handleIPFSUpload();

      const selectedLicense = LICENSE_TYPES.find(lt => lt.id === formData.licenseType);
      const licenseFee = parseEther(selectedLicense?.fee || "0");

      await submitApplication({
        args: [
          formData.licenseType,
          ipfsHashes.companyDetails,
          ipfsHashes.projectDetails,
          ipfsHashes.environmentalImpact,
          ipfsHashes.financialCapability,
          BigInt(formData.annualProductionLimit || "0"),
          formData.geographicArea,
        ],
        value: licenseFee,
      });

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application");
    }
  };

  const selectedLicense = LICENSE_TYPES.find(lt => lt.id === formData.licenseType);

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content">Apply for Mining License</h1>
          <p className="text-base-content/70 mt-2">Complete the form below to apply for a mineral license</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* License Type Selection */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-base-content">License Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {LICENSE_TYPES.map(license => (
                  <div
                    key={license.id}
                    className={`card bg-base-100 shadow-md cursor-pointer transition-all ${
                      formData.licenseType === license.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleInputChange("licenseType", license.id.toString())}
                  >
                    <div className="card-body">
                      <h3 className="card-title text-sm">{license.name}</h3>
                      <p className="text-primary font-bold">{license.fee} ETH</p>
                      <p className="text-xs text-base-content/70">{license.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-base-content">Company Information</h2>
              <textarea
                className="textarea textarea-bordered w-full h-32 mt-4"
                placeholder="Enter company details, registration information, and corporate structure..."
                value={formData.companyDetails}
                onChange={e => handleInputChange("companyDetails", e.target.value)}
                required
              />
              {ipfsHashes.companyDetails && (
                <div className="text-sm text-success mt-2">✅ Uploaded to IPFS: {ipfsHashes.companyDetails}</div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-base-content">Project Details</h2>
              <textarea
                className="textarea textarea-bordered w-full h-32 mt-4"
                placeholder="Describe your mining project, objectives, and operational plans..."
                value={formData.projectDetails}
                onChange={e => handleInputChange("projectDetails", e.target.value)}
                required
              />
              {ipfsHashes.projectDetails && (
                <div className="text-sm text-success mt-2">✅ Uploaded to IPFS: {ipfsHashes.projectDetails}</div>
              )}
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-base-content">Environmental Impact Assessment</h2>
              <textarea
                className="textarea textarea-bordered w-full h-32 mt-4"
                placeholder="Provide environmental impact assessment and mitigation plans..."
                value={formData.environmentalImpact}
                onChange={e => handleInputChange("environmentalImpact", e.target.value)}
                required
              />
              {ipfsHashes.environmentalImpact && (
                <div className="text-sm text-success mt-2">✅ Uploaded to IPFS: {ipfsHashes.environmentalImpact}</div>
              )}
            </div>
          </div>

          {/* Financial & Production Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content">Financial Capability</h2>
                <textarea
                  className="textarea textarea-bordered w-full h-32 mt-4"
                  placeholder="Demonstrate financial capability and funding sources..."
                  value={formData.financialCapability}
                  onChange={e => handleInputChange("financialCapability", e.target.value)}
                  required
                />
                {ipfsHashes.financialCapability && (
                  <div className="text-sm text-success mt-2">✅ Uploaded to IPFS: {ipfsHashes.financialCapability}</div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-base-content">Production Details</h2>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Annual Production Limit (tons)</span>
                    </div>
                    <input
                      type="number"
                      placeholder="e.g., 10000"
                      className="input input-bordered w-full"
                      value={formData.annualProductionLimit}
                      onChange={e => handleInputChange("annualProductionLimit", e.target.value)}
                      required
                    />
                  </label>

                  <label className="form-control w-full mt-4">
                    <div className="label">
                      <span className="label-text">Geographic Area</span>
                    </div>
                    <input
                      type="text"
                      placeholder="e.g., Coordinates or region name"
                      className="input input-bordered w-full"
                      value={formData.geographicArea}
                      onChange={e => handleInputChange("geographicArea", e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Summary & Submit */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-base-content">Application Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="font-semibold">Selected License</h3>
                  <p>{selectedLicense?.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold">License Fee</h3>
                  <p className="text-primary font-bold">{selectedLicense?.fee} ETH</p>
                </div>
                <div>
                  <h3 className="font-semibold">Duration</h3>
                  <p>{selectedLicense?.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Environmental Bond</h3>
                  <p>{formData.licenseType === 3 || formData.licenseType === 4 ? "Required" : "Not Required"}</p>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button type="button" className="btn btn-ghost" onClick={() => window.history.back()}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitLoading || !address}>
                  {isSubmitLoading ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    `Submit Application - ${selectedLicense?.fee} ETH`
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Application Tips */}
        <div className="mt-8 card bg-info text-info-content">
          <div className="card-body">
            <h2 className="card-title">Application Tips</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Ensure all documents are complete and accurate</li>
              <li>Environmental impact assessments must be conducted by certified professionals</li>
              <li>Financial statements should cover the last 3 years</li>
              <li>Large-scale mining licenses require environmental bonds</li>
              <li>Applications typically take 14-30 days for review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
