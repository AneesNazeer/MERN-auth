import mongoose from "mongoose";

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

export default mongoose.model("Token", tokenSchema);
