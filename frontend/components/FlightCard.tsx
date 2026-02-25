"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Props {
  flight: any;
  isSelected?: boolean;
  onSelect?: (flight: any) => void;
  showCheckbox?: boolean;
  searchId:any;
  passengers?: number
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
  searchId,
  passengers
}: Props) {




  const router = useRouter();
  const fare = flight.fares

  const handleSelect = async () => {
    await api.post("/flight/select", {
      searchId,
      flightKey: flight.flightKey,
      fareId: flight.fareId
    });

    
    router.push(
  `/traveller?flightKey=${flight.flightKey}&fareId=${flight.fareId}&priceLocked=${(flight.price || 0) * (passengers || 1)}`
);
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
        ₹{(flight.price || 0) * (passengers || 1)}
      </p>
             
      
{!showCheckbox && (
  <button
    onClick={handleSelect}
    className="bg-green-600 text-white px-3 py-1 rounded mt-2"
  >
    Select
  </button>
)}
    </div>
  );
}