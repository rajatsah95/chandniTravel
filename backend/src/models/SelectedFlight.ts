import mongoose from "mongoose";

const schema = new mongoose.Schema({
  searchId: String,
  flightKey: mongoose.Schema.Types.Mixed,
  fareId: mongoose.Schema.Types.Mixed,
  fullFlightJson: mongoose.Schema.Types.Mixed,
  selectedFare: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SelectedFlight", schema);
