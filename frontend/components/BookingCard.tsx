"use client";

interface Props {
  booking?: any;
}

export default function BookingCard({ booking }: Props) {
  if (!booking || !booking.flight) {
    return null;
  }

  
  const flightGroups = Array.isArray(booking.flight)
    ? booking.flight.filter(Boolean) 
    : [booking.flight];

  if (!flightGroups.length) return null;

  const price = booking.priceLocked ?? 0;

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white m-2" style={{border:"1px solid", padding:"10px",margin:"10px"}}>
      <h3 className="text-lg font-semibold mb-3">
        Passenger: {booking.traveller?.name}
      </h3>

      {flightGroups.map((flightGroup: any, index: number) => {
        if (!flightGroup?.flights || !Array.isArray(flightGroup.flights)) {
          return null;
        }

        const flights = flightGroup.flights;
        if (!flights.length) return null;

        const firstFlight = flights[0];
        const lastFlight = flights[flights.length - 1];

        const departure = firstFlight?.departureAirport;
        const arrival = lastFlight?.arrivalAirport;

        const airlineCode =
          flightGroup?.otherDetails?.airline?.[0] ?? "N/A";

        const departureTime =
          flightGroup?.otherDetails?.departureTime;

        const totalStops =
          flightGroup?.otherDetails?.totalStops ?? 0;

        return (
          <div
            key={index}
            className="mb-4 p-3 rounded-lg bg-gray-50 border"
          >
            <p className="font-semibold">
              Airline: {airlineCode}
            </p>

            <p>
              {departure?.code ?? "N/A"} →{" "}
              {arrival?.code ?? "N/A"}
            </p>

            <p>
              Departure:{" "}
              {departureTime
                ? new Date(departureTime).toLocaleString()
                : "N/A"}
            </p>

            <p>
              Stops:{" "}
              {totalStops === 0
                ? "Non-stop"
                : `${totalStops} Stop`}
            </p>
          </div>
        );
      })}

      <p className="font-bold text-blue-600 mt-2">
        ₹{price}
      </p>
    </div>
  );
}