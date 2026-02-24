import { v4 as uuid } from "uuid";
import Booking from "../models/Booking";
import SelectedFlight from "../models/SelectedFlight";

export const createBooking = async (req: any, res: any) => {
  const { searchId, traveller } = req.body;

  const selected = await SelectedFlight.findOne({ searchId });

  const booking = await Booking.create({
    bookingId: uuid(),
    searchId,
    traveller,
    priceLocked: selected?.selectedFare.price.pricePerAdult,
    flight: selected?.fullFlightJson
  });

  res.json({
    message: "Booking Confirmed",
    bookingId: booking.bookingId
  });
};

export const getAllBookings = async (req: any, res: any) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};
