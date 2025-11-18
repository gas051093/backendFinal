import { Schema, model, Types } from "mongoose";

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    cart: { type: Types.ObjectId, ref: "carts", default: null },
    role: { type: String, required: true, default: "user" },
    passwordHistory: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default model("users", userSchema);
