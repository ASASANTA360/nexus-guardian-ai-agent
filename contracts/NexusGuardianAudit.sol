// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NexusGuardianAudit {

    struct AIReport {
        string customerId;
        uint256 trustScore;
        string riskLevel;
        string decision;
        uint256 timestamp;
    }

    AIReport public latestReport;

    event AIAnalysisStored(
        string customerId,
        uint256 trustScore,
        string riskLevel,
        string decision,
        uint256 timestamp
    );

    function storeAIAnalysis(
        string memory _customerId,
        uint256 _trustScore,
        string memory _riskLevel,
        string memory _decision
    ) public {

        latestReport = AIReport({
            customerId: _customerId,
            trustScore: _trustScore,
            riskLevel: _riskLevel,
            decision: _decision,
            timestamp: block.timestamp
        });

        emit AIAnalysisStored(
            _customerId,
            _trustScore,
            _riskLevel,
            _decision,
            block.timestamp
        );
    }

    function getLatestAnalysis()
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            uint256
        )
    {
        return (
            latestReport.customerId,
            latestReport.trustScore,
            latestReport.riskLevel,
            latestReport.decision,
            latestReport.timestamp
        );
    }
}