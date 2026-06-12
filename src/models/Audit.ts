import mongoose, { Schema } from "mongoose";

const AuditSchema = new Schema(
  {
    wallet: {
      type: String,
      required: true,
    },

    trustScore: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      required: true,
    },

    recommendation: {
      type: String,
      required: true,
    },

    network: {
      type: String,
      required: true,
    },

    transactions: {
      type: Number,
      required: true,
    },

    lastActivityDays: {
      type: Number,
      required: true,
    },

    findings: {
      type: String,
      required: true,
    },

    agent: {
      type: String,
      default: "Nexus Guardian AI",
    },

    analyzedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.models.Audit ||
  mongoose.model(
    "Audit",
    AuditSchema
  );