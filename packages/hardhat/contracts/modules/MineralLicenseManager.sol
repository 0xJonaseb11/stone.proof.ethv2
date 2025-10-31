// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title MineralLicenseManager
 * @dev Comprehensive license management for mineral supply chain
 * @notice Handles applications, approvals, renewals, and compliance tracking
 */
contract MineralLicenseManager is AccessControl, ReentrancyGuard {
    // Role definitions
    bytes32 public constant LICENSE_MANAGER = keccak256("LICENSE_MANAGER");
    bytes32 public constant COMPLIANCE_OFFICER = keccak256("COMPLIANCE_OFFICER");
    bytes32 public constant AUDITOR = keccak256("AUDITOR");

    // License type enumerations
    enum LicenseType {
        PROSPECTING,
        EXPLORATION,
        SMALL_SCALE_MINING,
        LARGE_SCALE_MINING,
        PROCESSING,
        TRADING_EXPORT
    }

    enum ApplicationStatus {
        DRAFT,
        SUBMITTED,
        UNDER_REVIEW,
        APPROVED,
        REJECTED,
        SUSPENDED,
        REVOKED,
        EXPIRED
    }

    // License structure - packed for gas efficiency
    struct LicenseApplication {
        uint256 applicationId;
        address applicant;
        LicenseType licenseType;
        ApplicationStatus status;
        uint64 submissionDate;
        uint64 reviewDate;
        uint64 approvalDate;
        uint64 expiryDate;
        address reviewingOfficer;
        uint128 annualProductionLimit; // in tons
        uint128 bondAmount;
        bool requiresEnvironmentalBond;
        bool bondPosted;
        // IPFS hashes stored separately to avoid struct packing issues
    }

    // IPFS data stored separately to optimize struct packing
    struct ApplicationData {
        string companyDetailsIPFS;
        string projectDetailsIPFS;
        string environmentalImpactIPFS;
        string financialCapabilityIPFS;
        string geographicArea;
        string rejectionReason;
    }

    // Compliance tracking
    struct ComplianceRecord {
        uint64 inspectionDate;
        uint64 nextInspectionDue;
        address inspector;
        bool passed;
        string findingsIPFS;
    }

    // State variables
    uint256 private _nextApplicationId = 1;
    mapping(uint256 => LicenseApplication) public applications;
    mapping(uint256 => ApplicationData) public applicationData;
    mapping(address => uint256[]) public applicantApplications;
    mapping(LicenseType => uint256) public licenseFees;
    mapping(LicenseType => uint256) public licenseDurations;
    mapping(uint256 => ComplianceRecord[]) public complianceRecords;
    mapping(address => bool) public bannedApplicants;

    // Efficient storage for active licenses count per applicant
    mapping(address => uint256) public activeLicensesCount;

    // Events
    event ApplicationSubmitted(uint256 indexed applicationId, address indexed applicant, LicenseType licenseType);
    event ApplicationReviewed(uint256 indexed applicationId, address indexed reviewer, ApplicationStatus status);
    event LicenseApproved(uint256 indexed applicationId, uint256 expiryDate);
    event LicenseRevoked(uint256 indexed applicationId, string reason);
    event LicenseSuspended(uint256 indexed applicationId, string reason);
    event LicenseRenewed(uint256 indexed applicationId, uint256 newExpiryDate);
    event ComplianceInspection(uint256 indexed applicationId, address inspector, bool passed);
    event BondPosted(uint256 indexed applicationId, uint256 amount);
    event BondForfeited(uint256 indexed applicationId, uint256 amount);
    event BondReleased(uint256 indexed applicationId, uint256 amount);

    // Modifiers
    modifier onlyApplicant(uint256 _applicationId) {
        require(applications[_applicationId].applicant == msg.sender, "Not application owner");
        _;
    }

    modifier onlyLicenseManager() {
        require(hasRole(LICENSE_MANAGER, msg.sender), "Requires LICENSE_MANAGER role");
        _;
    }

    modifier onlyComplianceOfficer() {
        require(
            hasRole(COMPLIANCE_OFFICER, msg.sender) || hasRole(LICENSE_MANAGER, msg.sender),
            "Requires COMPLIANCE_OFFICER role"
        );
        _;
    }

    modifier applicationExists(uint256 _applicationId) {
        require(_applicationId > 0 && _applicationId < _nextApplicationId, "Application does not exist");
        require(applications[_applicationId].applicant != address(0), "Application deleted");
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(LICENSE_MANAGER, msg.sender);
        _setupRole(COMPLIANCE_OFFICER, msg.sender);
        _setupRole(AUDITOR, msg.sender);

        // Initialize license fees (in wei)
        _initializeLicenseFees();
        _initializeLicenseDurations();
    }

    function _initializeLicenseFees() private {
        licenseFees[LicenseType.PROSPECTING] = 0.1 ether;
        licenseFees[LicenseType.EXPLORATION] = 0.5 ether;
        licenseFees[LicenseType.SMALL_SCALE_MINING] = 1 ether;
        licenseFees[LicenseType.LARGE_SCALE_MINING] = 5 ether;
        licenseFees[LicenseType.PROCESSING] = 2 ether;
        licenseFees[LicenseType.TRADING_EXPORT] = 1.5 ether;
    }

    function _initializeLicenseDurations() private {
        licenseDurations[LicenseType.PROSPECTING] = 365 days;
        licenseDurations[LicenseType.EXPLORATION] = 1095 days; // 3 years
        licenseDurations[LicenseType.SMALL_SCALE_MINING] = 1825 days; // 5 years
        licenseDurations[LicenseType.LARGE_SCALE_MINING] = 10950 days; // 30 years
        licenseDurations[LicenseType.PROCESSING] = 7300 days; // 20 years
        licenseDurations[LicenseType.TRADING_EXPORT] = 3650 days; // 10 years
    }

    /**
     * @dev Submit a new license application
     */
    function submitApplication(
        LicenseType _licenseType,
        string memory _companyDetailsIPFS,
        string memory _projectDetailsIPFS,
        string memory _environmentalImpactIPFS,
        string memory _financialCapabilityIPFS,
        uint128 _annualProductionLimit,
        string memory _geographicArea
    ) external payable nonReentrant returns (uint256) {
        require(!bannedApplicants[msg.sender], "Applicant is banned");
        require(msg.value >= licenseFees[_licenseType], "Insufficient license fee");

        uint256 applicationId = _nextApplicationId++;

        LicenseApplication memory newApplication = LicenseApplication({
            applicationId: applicationId,
            applicant: msg.sender,
            licenseType: _licenseType,
            status: ApplicationStatus.SUBMITTED,
            submissionDate: uint64(block.timestamp),
            reviewDate: 0,
            approvalDate: 0,
            expiryDate: 0,
            reviewingOfficer: address(0),
            annualProductionLimit: _annualProductionLimit,
            bondAmount: 0,
            requiresEnvironmentalBond: _licenseType == LicenseType.LARGE_SCALE_MINING ||
                _licenseType == LicenseType.PROCESSING,
            bondPosted: false
        });

        ApplicationData memory data = ApplicationData({
            companyDetailsIPFS: _companyDetailsIPFS,
            projectDetailsIPFS: _projectDetailsIPFS,
            environmentalImpactIPFS: _environmentalImpactIPFS,
            financialCapabilityIPFS: _financialCapabilityIPFS,
            geographicArea: _geographicArea,
            rejectionReason: ""
        });

        applications[applicationId] = newApplication;
        applicationData[applicationId] = data;
        applicantApplications[msg.sender].push(applicationId);

        // Set bond amount for applicable licenses
        if (newApplication.requiresEnvironmentalBond) {
            applications[applicationId].bondAmount = _calculateBondAmount(_licenseType, _annualProductionLimit);
        }

        emit ApplicationSubmitted(applicationId, msg.sender, _licenseType);

        return applicationId;
    }

    /**
     * @dev Review and approve/reject application
     */
    function reviewApplication(
        uint256 _applicationId,
        ApplicationStatus _status,
        string memory _comments
    ) external onlyLicenseManager applicationExists(_applicationId) {
        LicenseApplication storage application = applications[_applicationId];
        ApplicationData storage data = applicationData[_applicationId];

        require(
            application.status == ApplicationStatus.SUBMITTED || application.status == ApplicationStatus.UNDER_REVIEW,
            "Application not in reviewable state"
        );

        application.status = _status;
        application.reviewDate = uint64(block.timestamp);
        application.reviewingOfficer = msg.sender;

        if (_status == ApplicationStatus.APPROVED) {
            application.approvalDate = uint64(block.timestamp);
            application.expiryDate = uint64(block.timestamp + licenseDurations[application.licenseType]);
            activeLicensesCount[application.applicant]++;
            emit LicenseApproved(_applicationId, application.expiryDate);
        } else if (_status == ApplicationStatus.REJECTED) {
            data.rejectionReason = _comments;
        }

        emit ApplicationReviewed(_applicationId, msg.sender, _status);
    }

    /**
     * @dev Post environmental bond for approved license
     */
    function postEnvironmentalBond(
        uint256 _applicationId
    ) external payable onlyApplicant(_applicationId) applicationExists(_applicationId) nonReentrant {
        LicenseApplication storage application = applications[_applicationId];

        require(application.status == ApplicationStatus.APPROVED, "License not approved");
        require(application.requiresEnvironmentalBond, "No bond required");
        require(!application.bondPosted, "Bond already posted");
        require(msg.value >= application.bondAmount, "Insufficient bond amount");

        application.bondPosted = true;
        emit BondPosted(_applicationId, msg.value);
    }

    /**
     * @dev Release environmental bond (for compliance closure)
     */
    function releaseEnvironmentalBond(
        uint256 _applicationId
    ) external onlyComplianceOfficer applicationExists(_applicationId) nonReentrant {
        LicenseApplication storage application = applications[_applicationId];

        require(application.bondPosted, "No bond posted");
        require(application.status == ApplicationStatus.APPROVED, "License not active");

        application.bondPosted = false;
        uint256 bondAmount = application.bondAmount;

        (bool success, ) = application.applicant.call{ value: bondAmount }("");
        require(success, "Bond release failed");

        emit BondReleased(_applicationId, bondAmount);
    }

    /**
     * @dev Renew an expiring license
     */
    function renewLicense(
        uint256 _applicationId
    ) external payable onlyApplicant(_applicationId) applicationExists(_applicationId) nonReentrant {
        LicenseApplication storage application = applications[_applicationId];

        require(application.status == ApplicationStatus.APPROVED, "License not active");
        require(block.timestamp > application.expiryDate - 90 days, "Too early to renew");
        require(block.timestamp <= application.expiryDate + 30 days, "License expired");
        require(!bannedApplicants[msg.sender], "Applicant is banned");
        require(msg.value >= licenseFees[application.licenseType] / 2, "Insufficient renewal fee");

        application.expiryDate = uint64(block.timestamp + licenseDurations[application.licenseType]);
        application.bondPosted = false; // Require new bond posting

        emit LicenseRenewed(_applicationId, application.expiryDate);
    }

    /**
     * @dev Suspend a license for compliance issues
     */
    function suspendLicense(
        uint256 _applicationId,
        string memory _reason
    ) external onlyComplianceOfficer applicationExists(_applicationId) {
        LicenseApplication storage application = applications[_applicationId];
        require(application.status == ApplicationStatus.APPROVED, "License not active");

        application.status = ApplicationStatus.SUSPENDED;
        emit LicenseSuspended(_applicationId, _reason);
    }

    /**
     * @dev Reinstate a suspended license
     */
    function reinstateLicense(uint256 _applicationId) external onlyComplianceOfficer applicationExists(_applicationId) {
        LicenseApplication storage application = applications[_applicationId];
        require(application.status == ApplicationStatus.SUSPENDED, "License not suspended");

        application.status = ApplicationStatus.APPROVED;
        // Note: You might want to add an event for reinstatement
    }

    /**
     * @dev Revoke a license permanently
     */
    function revokeLicense(
        uint256 _applicationId,
        string memory _reason
    ) external onlyLicenseManager applicationExists(_applicationId) {
        LicenseApplication storage application = applications[_applicationId];
        ApplicationData storage data = applicationData[_applicationId];

        require(
            application.status == ApplicationStatus.APPROVED || application.status == ApplicationStatus.SUSPENDED,
            "Cannot revoke in current state"
        );

        application.status = ApplicationStatus.REVOKED;
        data.rejectionReason = _reason;

        // Update active licenses count
        if (activeLicensesCount[application.applicant] > 0) {
            activeLicensesCount[application.applicant]--;
        }

        // Forfeit bond if applicable
        if (application.bondPosted && application.requiresEnvironmentalBond) {
            application.bondPosted = false;
            emit BondForfeited(_applicationId, application.bondAmount);
        }

        emit LicenseRevoked(_applicationId, _reason);
    }

    /**
     * @dev Add compliance inspection record
     */
    function addComplianceInspection(
        uint256 _applicationId,
        bool _passed,
        string memory _findingsIPFS,
        uint64 _nextInspectionDue
    ) external onlyComplianceOfficer applicationExists(_applicationId) {
        ComplianceRecord memory record = ComplianceRecord({
            inspectionDate: uint64(block.timestamp),
            inspector: msg.sender,
            passed: _passed,
            findingsIPFS: _findingsIPFS,
            nextInspectionDue: _nextInspectionDue
        });

        complianceRecords[_applicationId].push(record);
        emit ComplianceInspection(_applicationId, msg.sender, _passed);

        // Auto-suspend if failed inspection
        LicenseApplication storage application = applications[_applicationId];
        if (!_passed && application.status == ApplicationStatus.APPROVED) {
            application.status = ApplicationStatus.SUSPENDED;
            emit LicenseSuspended(_applicationId, "Failed compliance inspection");
        }
    }

    /**
     * @dev Batch update application statuses
     */
    function batchUpdateStatus(
        uint256[] calldata _applicationIds,
        ApplicationStatus[] calldata _statuses
    ) external onlyLicenseManager {
        require(_applicationIds.length == _statuses.length, "Arrays length mismatch");

        for (uint256 i = 0; i < _applicationIds.length; i++) {
            if (_applicationIds[i] < _nextApplicationId && applications[_applicationIds[i]].applicant != address(0)) {
                applications[_applicationIds[i]].status = _statuses[i];
                emit ApplicationReviewed(_applicationIds[i], msg.sender, _statuses[i]);
            }
        }
    }

    /**
     * @dev Ban applicant from future applications
     */
    function banApplicant(address _applicant, bool _banned) external onlyLicenseManager {
        bannedApplicants[_applicant] = _banned;
    }

    /**
     * @dev Update license fees
     */
    function updateLicenseFee(LicenseType _licenseType, uint256 _newFee) external onlyLicenseManager {
        licenseFees[_licenseType] = _newFee;
    }

    /**
     * @dev Calculate environmental bond amount based on license type and production
     */
    function _calculateBondAmount(
        LicenseType _licenseType,
        uint256 _annualProductionLimit
    ) internal pure returns (uint128) {
        if (_licenseType == LicenseType.LARGE_SCALE_MINING) {
            return uint128((_annualProductionLimit * 0.01 ether) / 1000); // 0.01 ETH per 1000 tons
        } else if (_licenseType == LicenseType.PROCESSING) {
            return uint128((_annualProductionLimit * 0.005 ether) / 1000); // 0.005 ETH per 1000 tons
        }
        return 0;
    }

    // View functions
    function getApplication(
        uint256 _applicationId
    ) external view applicationExists(_applicationId) returns (LicenseApplication memory, ApplicationData memory) {
        return (applications[_applicationId], applicationData[_applicationId]);
    }

    function getApplicantApplications(address _applicant) external view returns (uint256[] memory) {
        return applicantApplications[_applicant];
    }

    function getComplianceRecords(uint256 _applicationId) external view returns (ComplianceRecord[] memory) {
        return complianceRecords[_applicationId];
    }

    function getLicenseFee(LicenseType _licenseType) external view returns (uint256) {
        return licenseFees[_licenseType];
    }

    function isLicenseActive(uint256 _applicationId) external view returns (bool) {
        LicenseApplication memory application = applications[_applicationId];
        return application.status == ApplicationStatus.APPROVED && application.expiryDate > block.timestamp;
    }

    function getTotalApplications() external view returns (uint256) {
        return _nextApplicationId - 1;
    }

    function getApplicationsByStatus(ApplicationStatus _status) external view returns (uint256[] memory) {
        uint256 count = 0;

        // First pass: count matching applications
        for (uint256 i = 1; i < _nextApplicationId; i++) {
            if (applications[i].applicant != address(0) && applications[i].status == _status) {
                count++;
            }
        }

        // Second pass: collect application IDs
        uint256[] memory result = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i < _nextApplicationId; i++) {
            if (applications[i].applicant != address(0) && applications[i].status == _status) {
                result[index++] = i;
            }
        }

        return result;
    }

    // Admin functions for fund management
    function withdrawFees(address payable _to, uint256 _amount) external onlyLicenseManager {
        require(_amount <= address(this).balance, "Insufficient balance");
        _to.transfer(_amount);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Emergency functions
    function emergencyPauseApplication(uint256 _applicationId) external onlyLicenseManager {
        LicenseApplication storage application = applications[_applicationId];
        require(
            application.status == ApplicationStatus.APPROVED || application.status == ApplicationStatus.SUSPENDED,
            "Cannot pause in current state"
        );
        application.status = ApplicationStatus.SUSPENDED;
    }
}
