import mongoose from "mongoose";

const AgentLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    toolUsed: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "started",
        "completed",
        "failed",
      ],
      default: "started",
    },

    input: {
      type: String,
      default: "",
    },

    output: {
      type: String,
      default: "",
    },

    executionTime: {
      type: Number,
      default: 0,
    },

    performedBy: {
      type: String,
      default: "Nexus Guardian AI Agent",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.AgentLog ||
  mongoose.model("AgentLog", AgentLogSchema);