import { Schema, model, Types } from "mongoose";

const passwordResetSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "users", required: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("passwordResets", passwordResetSchema);
