import mongoose from "mongoose";

const schema = new mongoose.Schema({
  searchId: String,
  query: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Search", schema);
