import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    status: { type: Boolean, default: true, index: true },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true, index: true },
    thumbnails: { type: [String], default: [] },
  },
  { timestamps: true }
);

productSchema.plugin(paginate);
export default mongoose.model("products", productSchema);
