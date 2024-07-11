import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: "dashboard-table" }
);

itemSchema.index({ name: "text", description: "text" });

const Item = mongoose.model("Item", itemSchema);

export default Item;
