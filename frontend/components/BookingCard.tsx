"use client";

interface Props {
  booking?: any;
}

export default function BookingCard({ booking }: Props) {
  // ✅ Guard clause – prevents crash
  if (!booking?.flight?.flights?.length) {
    return (
      <div className="border rounded-xl p-4 shadow-md bg-white">
        <p className="text-gray-500">Loading booking...</p>
      </div>
    );
  }

  const flights = booking.flight.flights;
  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];

  const departure = firstFlight.departureAirport;
  const arrival = lastFlight.arrivalAirport;

  const airlineCode =
    booking.flight.otherDetails?.airline?.[0] ?? "N/A";

  const departureTime =
    booking.flight.otherDetails?.departureTime;

  const totalStops =
    booking.flight.otherDetails?.totalStops ?? 0;

  const price = booking.priceLocked ?? 0;

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold">
        Airline: {airlineCode}
      </h3>

      <p className="text-gray-600">
        {departure?.code} → {arrival?.code}
      </p>

      <p>
        Departure:{" "}
        {departureTime
          ? new Date(departureTime).toLocaleString()
          : "N/A"}
      </p>

      <p>
        Stops: {totalStops === 0 ? "Non-stop" : `${totalStops} Stop`}
      </p>

      <p>Passenger: {booking.traveller?.name}</p>

      <p className="font-bold text-blue-600 mt-2">
        ₹{price}
      </p>
    </div>
  );
}