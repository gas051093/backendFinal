import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }, // email
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        title: String,
        qty: Number,
        unitPrice: Number,
      },
    ],
    status: { type: String, enum: ["complete", "partial"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("tickets", ticketSchema);
