import mongoose from "mongoose";

const schema = new mongoose.Schema({
  bookingId: String,
  searchId: String,
  traveller: {
    name: String,
    email: String,
    phone: String,
    dob: String,
    gender: String,
    passport: String
  },
  priceLocked: Number,
  flight: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", schema);
