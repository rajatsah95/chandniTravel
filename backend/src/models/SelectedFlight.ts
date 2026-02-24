import mongoose from "mongoose";

const schema = new mongoose.Schema({
  searchId: String,
  flightKey: String,
  fareId: String,
  fullFlightJson: Object,
  selectedFare: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("SelectedFlight", schema);
