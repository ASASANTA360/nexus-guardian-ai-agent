import mongoose from "mongoose";

const InvestigationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    agentName: {
      type: String,
      default: "Nexus Guardian AI Agent",
    },

    trustScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    riskLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      required: true,
    },

    findings: {
      type: String,
      required: true,
    },

    recommendation: {
      type: String,
      enum: [
        "approve",
        "manual_review",
        "reject",
      ],
      required: true,
    },

    humanApproval: {
      type: Boolean,
      default: false,
    },

    reviewedBy: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Investigation ||
  mongoose.model("Investigation", InvestigationSchema);