"use client";

import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import {
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useDeployedContractInfo, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

// Updated to match smart contract enum
const LICENSE_TYPES = [
  {
    id: 0,
    name: "Prospecting License",
    fee: "0.1",
    duration: "1 year",
    color: "badge-info",
    desc: "Initial exploration rights",
    contractType: 0,
  },
  {
    id: 1,
    name: "Exploration License",
    fee: "0.5",
    duration: "3 years",
    color: "badge-warning",
    desc: "Detailed surveying & drilling",
    contractType: 1,
  },
  {
    id: 2,
    name: "Small Scale Mining",
    fee: "1.0",
    duration: "5 years",
    color: "badge-success",
    desc: "Limited commercial extraction",
    contractType: 2,
  },
  {
    id: 3,
    name: "Large Scale Mining",
    fee: "5.0",
    duration: "30 years",
    color: "badge-error",
    desc: "Industrial-scale operations",
    contractType: 3,
  },
  {
    id: 4,
    name: "Processing License",
    fee: "2.0",
    duration: "20 years",
    color: "badge-accent",
    desc: "Refining & beneficiation",
    contractType: 4,
  },
  {
    id: 5,
    name: "Trading/Export License",
    fee: "1.5",
    duration: "10 years",
    color: "badge-secondary",
    desc: "Buy/sell/export minerals",
    contractType: 5,
  },
];

interface FormData {
  licenseType: number;
  companyName: string;
  registrationNumber: string;
  companyAddress: string;
  projectName: string;
  projectDescription: string;
  mineralType: string;
  environmentalImpact: string;
  mitigationPlan: string;
  financialProof: string;
  bankStatement: string;
  annualProductionLimit: string;
  geographicArea: string;
  coordinates: string;
}

export default function ApplyForLicense() {
  const { address, isConnected } = useAccount();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    licenseType: 0,
    companyName: "",
    registrationNumber: "",
    companyAddress: "",
    projectName: "",
    projectDescription: "",
    mineralType: "",
    environmentalImpact: "",
    mitigationPlan: "",
    financialProof: "",
    bankStatement: "",
    annualProductionLimit: "",
    geographicArea: "",
    coordinates: "",
  });
  const [ipfsHashes, setIpfsHashes] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [showBondAlert, setShowBondAlert] = useState(false);

  // NEW API: Object config
  const { data: deployedContract } = useDeployedContractInfo({
    contractName: "MineralLicenseManager",
  });

  const { writeContractAsync, isPending: isSubmitting } = useScaffoldWriteContract({
    contractName: "MineralLicenseManager",
  });

  const writeTx = useTransactor();

  const selectedLicense = LICENSE_TYPES.find(lt => lt.id === formData.licenseType);

  // Bond alert
  useEffect(() => {
    const requiresBond = formData.licenseType === 3 || formData.licenseType === 4;
    setShowBondAlert(requiresBond);
  }, [formData.licenseType]);

  const steps = [
    { id: 1, name: "License Type", icon: ShieldCheckIcon },
    { id: 2, name: "Company Info", icon: DocumentTextIcon },
    { id: 3, name: "Project Details", icon: MapPinIcon },
    { id: 4, name: "Environment & Finance", icon: CurrencyDollarIcon },
    { id: 5, name: "Review & Submit", icon: CheckCircleIcon },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && formData.licenseType === undefined) {
      newErrors.licenseType = "Please select a license type";
    }

    if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
      if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
      if (!formData.companyAddress.trim()) newErrors.companyAddress = "Company address is required";
    }

    if (step === 3) {
      if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
      if (!formData.mineralType.trim()) newErrors.mineralType = "Mineral type is required";
      if (!formData.geographicArea.trim()) newErrors.geographicArea = "Geographic area is required";
      if (!formData.annualProductionLimit || parseInt(formData.annualProductionLimit) <= 0) {
        newErrors.annualProductionLimit = "Valid annual production limit is required";
      }
    }

    if (step === 4) {
      if (!formData.environmentalImpact.trim()) newErrors.environmentalImpact = "Environmental impact is required";
      if (!formData.financialProof.trim()) newErrors.financialProof = "Financial proof is required";
      if (!formData.mitigationPlan.trim()) newErrors.mitigationPlan = "Mitigation plan is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const simulateIPFSUpload = async (field: string, content: string): Promise<string> => {
    setUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const hash = `Qm${field.slice(0, 8)}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    setUploading(false);
    return `ipfs://${hash}`;
  };

  const handleIPFSUpload = async (): Promise<boolean> => {
    try {
      setUploading(true);
      const uploads = [];

      const companyDetails = JSON.stringify({
        companyName: formData.companyName,
        registrationNumber: formData.registrationNumber,
        companyAddress: formData.companyAddress,
      });
      uploads.push(simulateIPFSUpload("company", companyDetails));

      const projectDetails = JSON.stringify({
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        mineralType: formData.mineralType,
      });
      uploads.push(simulateIPFSUpload("project", projectDetails));

      const environmentalImpact = JSON.stringify({
        impact: formData.environmentalImpact,
        mitigation: formData.mitigationPlan,
      });
      uploads.push(simulateIPFSUpload("environment", environmentalImpact));

      const financialCapability = JSON.stringify({
        proof: formData.financialProof,
        bankStatement: formData.bankStatement,
      });
      uploads.push(simulateIPFSUpload("financial", financialCapability));

      const [companyHash, projectHash, environmentHash, financialHash] = await Promise.all(uploads);

      setIpfsHashes({
        companyDetailsIPFS: companyHash,
        projectDetailsIPFS: projectHash,
        environmentalImpactIPFS: environmentHash,
        financialCapabilityIPFS: financialHash,
      });

      return true;
    } catch (error) {
      console.error("IPFS upload failed:", error);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      alert("Please connect your wallet");
      return;
    }

    if (!deployedContract) {
      alert("Contract not deployed on this network");
      return;
    }

    if (!validateStep(5)) {
      alert("Please fix all validation errors");
      return;
    }

    try {
      const uploadSuccess = await handleIPFSUpload();
      if (!uploadSuccess) return;

      const licenseFee = parseEther(selectedLicense?.fee || "0");
      const annualProductionLimit = BigInt(formData.annualProductionLimit || "0");
      const geographicArea = formData.coordinates
        ? `${formData.geographicArea} (${formData.coordinates})`
        : formData.geographicArea;

      await writeContractAsync({
        address: deployedContract.address,
        abi: deployedContract.abi,
        functionName: "submitApplication",
        args: [
          BigInt(selectedLicense?.contractType || 0),
          ipfsHashes.companyDetailsIPFS,
          ipfsHashes.projectDetailsIPFS,
          ipfsHashes.environmentalImpactIPFS,
          ipfsHashes.financialCapabilityIPFS,
          annualProductionLimit,
          geographicArea,
        ],
        value: licenseFee,
      });

      alert("Application submitted successfully! Track it in your dashboard.");
    } catch (err: any) {
      alert(err?.shortMessage || "Submission failed");
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const handleLicenseTypeSelect = (licenseId: number) => {
    handleInputChange("licenseType", licenseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-base-content">Mineral License Application</h1>
          <p className="text-base-content/70 mt-2">Secure your mining rights on-chain</p>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center flex-1">
                <div
                  className={`flex flex-col items-center ${step >= stepItem.id ? "text-primary" : "text-base-content/40"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step > stepItem.id
                        ? "bg-primary border-primary text-white"
                        : step === stepItem.id
                          ? "border-primary bg-base-100 text-primary"
                          : "border-base-content/30"
                    } transition-all duration-300`}
                  >
                    <stepItem.icon className="w-6 h-6" />
                  </div>
                  <span className="mt-2 text-xs font-medium hidden sm:block">{stepItem.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step > stepItem.id ? "bg-primary" : "bg-base-content/20"} transition-all duration-300`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: License Type */}
          {step === 1 && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  <ShieldCheckIcon className="w-8 h-8 text-primary" />
                  Choose License Type
                </h2>
                <p className="text-base-content/70 mb-6">Select the type of mineral license</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {LICENSE_TYPES.map(license => (
                    <div
                      key={license.id}
                      onClick={() => handleLicenseTypeSelect(license.id)}
                      className={`card bg-base-200 border-2 cursor-pointer transition-all p-4 hover:shadow-lg hover:border-primary/50 ${
                        formData.licenseType === license.id
                          ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                          : "border-base-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{license.name}</h3>
                        <span className={`badge ${license.color} badge-lg`}>{license.fee} ETH</span>
                      </div>
                      <p className="text-sm text-base-content/70 mb-3">{license.desc}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center gap-1 text-base-content/60">
                          <ClockIcon className="w-4 h-4" />
                          {license.duration}
                        </span>
                        {(license.contractType === 3 || license.contractType === 4) && (
                          <span className="badge badge-warning badge-sm">Bond Required</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {errors.licenseType && (
                  <div className="alert alert-error mt-4">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    <span>{errors.licenseType}</span>
                  </div>
                )}

                {showBondAlert && (
                  <div className="alert alert-warning mt-4">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">Environmental Bond Required</p>
                      <p className="text-sm">This license requires posting an environmental bond after approval.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Company Info */}
          {step === 2 && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  <DocumentTextIcon className="w-8 h-8 text-primary" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Company Name *</span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered ${errors.companyName ? "input-error" : ""}`}
                      value={formData.companyName}
                      onChange={e => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter registered company name"
                    />
                    {errors.companyName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.companyName}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Registration Number *</span>
                    </label>
                    <input
                      type="text"
                      className={`input input-bordered ${errors.registrationNumber ? "input-error" : ""}`}
                      value={formData.registrationNumber}
                      onChange={e => handleInputChange("registrationNumber", e.target.value)}
                      placeholder="Business registration number"
                    />
                    {errors.registrationNumber && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.registrationNumber}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">Registered Address *</span>
                    </label>
                    <textarea
                      className={`textarea textarea-bordered h-24 ${errors.companyAddress ? "textarea-error" : ""}`}
                      value={formData.companyAddress}
                      onChange={e => handleInputChange("companyAddress", e.target.value)}
                      placeholder="Full legal company address"
                    />
                    {errors.companyAddress && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.companyAddress}</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl flex items-center gap-2">
                    <MapPinIcon className="w-8 h-8 text-primary" />
                    Project & Location Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Project Name *</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.projectName ? "input-error" : ""}`}
                        value={formData.projectName}
                        onChange={e => handleInputChange("projectName", e.target.value)}
                        placeholder="Name your mining project"
                      />
                      {errors.projectName && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.projectName}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Mineral Type *</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.mineralType ? "input-error" : ""}`}
                        value={formData.mineralType}
                        onChange={e => handleInputChange("mineralType", e.target.value)}
                        placeholder="e.g., Gold, Lithium, Copper"
                      />
                      {errors.mineralType && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.mineralType}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text font-semibold">Project Description</span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered h-32"
                        value={formData.projectDescription}
                        onChange={e => handleInputChange("projectDescription", e.target.value)}
                        placeholder="Describe your mining project, objectives, and scope..."
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">Geographic Area *</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered ${errors.geographicArea ? "input-error" : ""}`}
                        value={formData.geographicArea}
                        onChange={e => handleInputChange("geographicArea", e.target.value)}
                        placeholder="e.g., Northern Region, District"
                      />
                      {errors.geographicArea && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.geographicArea}</span>
                        </label>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold">GPS Coordinates</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered"
                        value={formData.coordinates}
                        onChange={e => handleInputChange("coordinates", e.target.value)}
                        placeholder="e.g., 7.9465° N, 1.0232° W"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-base-200 rounded-lg border border-dashed border-base-content/20 text-center">
                    <MapPinIcon className="w-12 h-12 mx-auto text-base-content/40" />
                    <p className="text-sm mt-2 text-base-content/60">Interactive map integration coming soon</p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Annual Production Limit (tons) *</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      className={`input input-bordered ${errors.annualProductionLimit ? "input-error" : ""}`}
                      value={formData.annualProductionLimit}
                      onChange={e => handleInputChange("annualProductionLimit", e.target.value)}
                      placeholder="Estimated annual production in tons"
                    />
                    {errors.annualProductionLimit && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.annualProductionLimit}</span>
                      </label>
                    )}
                    <label className="label">
                      <span className="label-text-alt">
                        This affects environmental bond calculation for applicable licenses
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Environment & Finance */}
          {step === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title flex items-center gap-2">
                      <ShieldCheckIcon className="w-6 h-6 text-success" />
                      Environmental Impact Assessment *
                    </h3>
                    <textarea
                      className={`textarea textarea-bordered h-40 mt-4 ${errors.environmentalImpact ? "textarea-error" : ""}`}
                      placeholder="Describe potential environmental impacts, water usage, land disturbance, waste management..."
                      value={formData.environmentalImpact}
                      onChange={e => handleInputChange("environmentalImpact", e.target.value)}
                    />
                    {errors.environmentalImpact && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.environmentalImpact}</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">Environmental Mitigation Plan *</h3>
                    <textarea
                      className={`textarea textarea-bordered h-40 ${errors.mitigationPlan ? "textarea-error" : ""}`}
                      placeholder="Detail your plans for environmental protection, restoration, and monitoring..."
                      value={formData.mitigationPlan}
                      onChange={e => handleInputChange("mitigationPlan", e.target.value)}
                    />
                    {errors.mitigationPlan && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.mitigationPlan}</span>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title flex items-center gap-2">
                      <CurrencyDollarIcon className="w-6 h-6 text-warning" />
                      Financial Capability Proof *
                    </h3>
                    <textarea
                      className={`textarea textarea-bordered h-40 ${errors.financialProof ? "textarea-error" : ""}`}
                      placeholder="Describe funding sources, capital investment, financial reserves, and projected revenue..."
                      value={formData.financialProof}
                      onChange={e => handleInputChange("financialProof", e.target.value)}
                    />
                    {errors.financialProof && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.financialProof}</span>
                      </label>
                    )}
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h3 className="card-title">Bank Statements & Financial History</h3>
                    <textarea
                      className="textarea textarea-bordered h-40"
                      placeholder="Provide details of bank statements, financial history, or upload references..."
                      value={formData.bankStatement}
                      onChange={e => handleInputChange("bankStatement", e.target.value)}
                    />
                    <label className="label">
                      <span className="label-text-alt">Last 12 months statements recommended</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-2xl flex items-center gap-2">
                  <CheckCircleIcon className="w-8 h-8 text-primary" />
                  Review & Submit
                </h2>

                <div className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-base-200 rounded-lg">
                      <p className="font-semibold text-lg">License Type</p>
                      <p className="text-xl text-primary font-bold">{selectedLicense?.name}</p>
                      <p className="text-sm text-base-content/70">{selectedLicense?.desc}</p>
                      <p className="text-sm mt-2 flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        Duration: {selectedLicense?.duration}
                      </p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-lg">
                      <p className="font-semibold text-lg">License Fee</p>
                      <p className="text-3xl font-bold text-primary">{selectedLicense?.fee} ETH</p>
                      <p className="text-sm text-base-content/70 mt-2">Payable upon submission</p>
                    </div>
                  </div>

                  <div className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">Company Information</div>
                    <div className="collapse-content">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Company Name</p>
                          <p>{formData.companyName}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Registration Number</p>
                          <p>{formData.registrationNumber}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="font-semibold">Company Address</p>
                          <p>{formData.companyAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="collapse collapse-arrow bg-base-200">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">Project Details</div>
                    <div className="collapse-content">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Project Name</p>
                          <p>{formData.projectName}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Mineral Type</p>
                          <p>{formData.mineralType}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Annual Production</p>
                          <p>{formData.annualProductionLimit} tons</p>
                        </div>
                        <div>
                          <p className="font-semibold">Geographic Area</p>
                          <p>{formData.geographicArea}</p>
                        </div>
                        {formData.coordinates && (
                          <div className="md:col-span-2">
                            <p className="font-semibold">Coordinates</p>
                            <p>{formData.coordinates}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {showBondAlert && (
                    <div className="alert alert-warning">
                      <ExclamationTriangleIcon className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">Environmental Bond Required</p>
                        <p>This license requires posting an environmental bond after approval.</p>
                      </div>
                    </div>
                  )}

                  {uploading && (
                    <div className="alert alert-info">
                      <span className="loading loading-spinner"></span>
                      Uploading documents to IPFS...
                    </div>
                  )}

                  <div className="p-4 bg-base-200 rounded-lg">
                    <p className="font-semibold">Connected Wallet</p>
                    <p className="font-mono text-sm">{address}</p>
                    {!isConnected && <p className="text-error text-sm mt-2">Please connect your wallet</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <button type="button" className="btn btn-ghost" onClick={handlePrev} disabled={step === 1}>
              Back
            </button>

            {step < 5 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success" disabled={isSubmitting || uploading || !isConnected}>
                {isSubmitting || uploading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    {uploading ? "Uploading..." : "Submitting..."}
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-gradient-to-r from-info to-primary text-white">
            <div className="card-body">
              <h3 className="card-title">Application Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Use accurate and verifiable information</li>
                <li>Consult environmental experts</li>
                <li>Include detailed financials</li>
                <li>Provide GPS coordinates</li>
              </ul>
            </div>
          </div>

          <div className="card bg-gradient-to-r from-success to-accent text-white">
            <div className="card-body">
              <h3 className="card-title">Approval Process</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Review: 7–14 days</li>
                <li>Environmental assessment</li>
                <li>Financial verification</li>
                <li>Final approval</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
