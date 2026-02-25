import { v4 as uuid } from "uuid";
import Booking from "../models/Booking";
import flightsData from "../data/flights.json";

export const createBooking = async (req: any, res: any) => {
  const { searchId, traveller,flightKey,priceLocked } = req.body;

let selected:any=[]
  if(flightKey.includes(","))
  {

    for(const ele of flightKey.split(","))
    {
     
      selected=[...selected,ele]
    }
  }
  else
  {
     selected = flightKey
  }

  const sectors = flightsData.data.result.sectors;
 
let flight:any=[]
  Object.values(sectors).forEach((sector: any) => {

 if(Array.isArray(selected))
  {
    for(const ele of selected)
    {
      
      if (sector[ele])
      flight=[...flight,sector[ele]]
    }
  }
  else
  {
    
     if (sector[selected]) flight = sector[selected];
  }

    
  });

  const booking = await Booking.create({
    bookingId: uuid(),
    searchId,
    traveller,
    priceLocked,
    flight
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
