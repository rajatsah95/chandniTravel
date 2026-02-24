// import { api } from "@/lib/api";
// import { useRouter } from "next/navigation";

// export default function FlightCard({ flight, searchId }: any) {
//   const router = useRouter();
//   const fare = flight.fares[0];

//   const handleSelect = async () => {
//     await api.post("/flight/select", {
//       searchId,
//       flightKey: flight.flightKey,
//       fareId: fare.fareId
//     });

//     router.push("/traveller");
//   };

//   return (
//     <div className="border p-4 rounded bg-white shadow">
//       <p>Airline: {flight.otherDetails.airline[0]}</p>
//       <p>Departure: {flight.otherDetails.departureTime}</p>
//       <p>Stops: {flight.otherDetails.totalStops}</p>
//       <p className="font-bold">₹ {fare.price.pricePerAdult}</p>

//       <button
//         onClick={handleSelect}
//         className="bg-green-600 text-white px-3 py-1 rounded mt-2"
//       >
//         Select
//       </button>
//     </div>
//   );
// }

// "use client";

// import React from "react";

// interface Props {
//   flight: any;
//   searchId: string;
// }

// const FlightCard = ({ flight, searchId }: Props) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h3 className="font-bold text-lg">
//         {flight.airline}
//       </h3>

//       <p>
//         {flight.departureTime} → {flight.arrivalTime}
//       </p>

//       <p>Stops: {flight.stops}</p>

//       <p className="text-blue-600 font-semibold">
//         ₹{flight.price}
//       </p>
//     </div>
//   );
// };

// export default FlightCard;

// "use client";

// import React from "react";

// interface Props {
//   flight: any;
//   searchId: string;
//   isRoundTrip?: boolean;
// }

// const FlightCard = ({ flight, searchId, isRoundTrip }: Props) => {
//   // 🟢 ROUND TRIP CARD
//   if (isRoundTrip) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow space-y-4">

//         {/* ONWARD */}
//         <div className="border-b pb-3">
//           <h3 className="font-bold text-lg">
//             {flight.onward.airline} (Onward)
//           </h3>
//           <p>
//             {flight.onward.departureTime} → {flight.onward.arrivalTime}
//           </p>
//           <p>Stops: {flight.onward.stops}</p>
//           <p>₹{flight.onward.price}</p>
//         </div>

//         {/* RETURN */}
//         <div>
//           <h3 className="font-bold text-lg">
//             {flight.return.airline} (Return)
//           </h3>
//           <p>
//             {flight.return.departureTime} → {flight.return.arrivalTime}
//           </p>
//           <p>Stops: {flight.return.stops}</p>
//           <p>₹{flight.return.price}</p>
//         </div>

//         {/* TOTAL */}
//         <div className="text-blue-600 font-bold text-lg pt-2 border-t">
//           Total: ₹{flight.totalPrice}
//         </div>
//       </div>
//     );
//   }

//   // 🔵 ONE WAY CARD
//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h3 className="font-bold text-lg">
//         {flight.airline}
//       </h3>

//       <p>
//         {flight.departureTime} → {flight.arrivalTime}
//       </p>

//       <p>Stops: {flight.stops}</p>

//       <p className="text-blue-600 font-semibold">
//         ₹{flight.price}
//       </p>
//     </div>
//   );
// };

// export default FlightCard;

// "use client";

// import React from "react";

// interface Props {
//   flight: any;
//   searchId: string;
//   isRoundTrip?: boolean;
// }

// const FlightCard = ({ flight, isRoundTrip }: Props) => {
//   if (isRoundTrip) {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow space-y-4">
//         <div>
//           <h3 className="font-bold">{flight.onward.airline}</h3>
//           <p>{flight.onward.departureTime} → {flight.onward.arrivalTime}</p>
//         </div>

//         <div>
//           <h3 className="font-bold">{flight.return.airline}</h3>
//           <p>{flight.return.departureTime} → {flight.return.arrivalTime}</p>
//         </div>

//         <div className="text-blue-600 font-bold">
//           Total: ₹{flight.totalPrice}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h3 className="font-bold">{flight.airline}</h3>
//       <p>{flight.departureTime} → {flight.arrivalTime}</p>
//       <p>₹{flight.price}</p>
//     </div>
//   );
// };

// export default FlightCard;
//ok
// "use client";

// import React from "react";

// interface Props {
//   flight: any;
//   searchId: string;
//   isRoundTrip?: boolean;
// }

// const getStopsLabel = (stops: number) => {
//   if (stops === 0) return "Non-stop";
//   if (stops === 1) return "1 Stop";
//   return `${stops} Stops`;
// };

// const FlightCard = ({ flight, isRoundTrip }: Props) => {

//   // 🟢 ROUND TRIP
//   if (isRoundTrip) {
//     return (
//       <div className="bg-white p-5 rounded-lg shadow space-y-5">

//         {/* ONWARD */}
//         <div className="border-b pb-4">
//           <h3 className="font-bold text-lg">
//             {flight.onward.airline} (Onward)
//           </h3>

//           <p className="text-gray-700">
//             {flight.onward.departureTime} → {flight.onward.arrivalTime}
//           </p>

//           <p className="text-sm text-gray-500">
//             {getStopsLabel(flight.onward.stops)}
//           </p>

//           <p className="font-semibold">
//             ₹{flight.onward.price}
//           </p>
//         </div>

//         {/* RETURN */}
//         <div>
//           <h3 className="font-bold text-lg">
//             {flight.return.airline} (Return)
//           </h3>

//           <p className="text-gray-700">
//             {flight.return.departureTime} → {flight.return.arrivalTime}
//           </p>

//           <p className="text-sm text-gray-500">
//             {getStopsLabel(flight.return.stops)}
//           </p>

//           <p className="font-semibold">
//             ₹{flight.return.price}
//           </p>
//         </div>

//         {/* TOTAL */}
//         <div className="text-blue-600 font-bold text-lg border-t pt-3">
//           Total: ₹{flight.totalPrice}
//         </div>
//       </div>
//     );
//   }

//   // 🔵 ONE WAY
//   return (
//     <div className="bg-white p-5 rounded-lg shadow space-y-2">
//       <h3 className="font-bold text-lg">
//         {flight.airline}
//       </h3>

//       <p className="text-gray-700">
//         {flight.departureTime} → {flight.arrivalTime}
//       </p>

//       <p className="text-sm text-gray-500">
//         {getStopsLabel(flight.stops)}
//       </p>

//       <p className="text-blue-600 font-semibold">
//         ₹{flight.price}
//       </p>
//     </div>
//   );
// };

// export default FlightCard;

// "use client";

// interface Props {
//   flight: any;
// }

// const getStopsLabel = (stops: number) => {
//   if (stops === 0) return "Non-stop";
//   if (stops === 1) return "1 Stop";
//   return `${stops} Stops`;
// };

// export default function FlightCard({ flight }: Props) {
//   return (
//     <div className="bg-white p-5 rounded-lg shadow space-y-2">
//       <h3 className="font-bold text-lg">
//         {flight.airline}
//       </h3>

//       <p>
//         {flight.departureTime} → {flight.arrivalTime}
//       </p>

//       <p className="text-sm text-gray-500">
//         {getStopsLabel(flight.stops)}
//       </p>

//       <p className="text-blue-600 font-semibold">
//         ₹{flight.price}
//       </p>
//     </div>
//   );
// }

"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  flight: any;
  isSelected?: boolean;
  onSelect?: (flight: any) => void;
  showCheckbox?: boolean;
  searchId:any
}

const getStopsLabel = (stops: number) => {
  if (stops === 0) return "Non-stop";
  if (stops === 1) return "1 Stop";
  return `${stops} Stops`;
};

export default function FlightCard({
  flight,
  isSelected = false,
  onSelect,
  showCheckbox = false,
  searchId
}: Props) {




  const router = useRouter();
  const fare = flight.fares

  const handleSelect = async () => {
    await api.post("/flight/select", {
      searchId,
      flightKey: flight.flightKey,
      fareId: flight.fareId
    });

    router.push("/traveller");
  };




  return (
    <div
      className={`p-5 rounded-lg shadow space-y-2 transition-all duration-200 cursor-pointer
      ${
        isSelected
          ? "bg-gray-900 text-white border-2 border-blue-500"
          : "bg-white"
      }`}
      onClick={() => showCheckbox && onSelect?.(flight)}
      style={{border:"1px solid", padding:"10px",margin:"10px"}}
    >
      {showCheckbox && (
        <div className="flex justify-end">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect?.(flight)}
            className="w-5 h-5"
          />
        </div>
      )}

      <h3 className="font-bold text-lg">
        {flight.airline}
      </h3>

      <p>
        {flight.departureTime} → {flight.arrivalTime}
      </p>

      <p className={`${isSelected ? "text-gray-300" : "text-gray-500"} text-sm`}>
        {getStopsLabel(flight.stops)}
      </p>

      <p className="font-semibold">
        ₹{flight.price}
      </p>
             <button
        onClick={handleSelect}
        className="bg-green-600 text-white px-3 py-1 rounded mt-2"
      >
        Select
      </button>
    </div>
  );
}