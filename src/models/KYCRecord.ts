import mongoose from "mongoose";

const KYCRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    documentType: {
      type: String,
      enum: [
        "National ID",
        "Passport",
        "Driver License",
        "Voter Card",
      ],
      required: true,
    },

    documentNumber: {
      type: String,
      required: true,
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "failed"],
      default: "pending",
    },

    verifiedBy: {
      type: String,
      default: "AI Agent",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.KYCRecord ||
  mongoose.model("KYCRecord", KYCRecordSchema);