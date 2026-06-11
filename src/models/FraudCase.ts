import mongoose from "mongoose";

const FraudCaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caseType: {
      type: String,
      enum: [
        "Identity Fraud",
        "Suspicious Activity",
        "Document Mismatch",
        "Account Takeover",
      ],
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    status: {
      type: String,
      enum: [
        "open",
        "under_review",
        "resolved",
        "closed",
      ],
      default: "open",
    },

    reason: {
      type: String,
      required: true,
    },

    createdBy: {
      type: String,
      default: "Nexus Guardian AI Agent",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FraudCase ||
  mongoose.model("FraudCase", FraudCaseSchema);