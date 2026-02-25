"use client";

import { useState, useMemo } from "react";
import { api } from "@/lib/api";
import FlightCard from "@/components/FlightCard";
import { flattenFlights } from "@/utils/flattenFlights";
import { useRouter } from "next/navigation";

export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedOnward, setSelectedOnward] = useState<any | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<any | null>(null);

  const [filters, setFilters] = useState({
    source: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    tripType: "oneway",
    passengers: 1,
    maxPrice: 50000,
    stops: "",
    departureTime: "",
  });

const router = useRouter();
   const handleSelect = async () => {
    
    await api.post("/flight/select", {
      searchId,
      flightKey: `${selectedOnward?.flightKey},${selectedReturn?.flightKey}`,
      fareId: `${selectedOnward?.fareId},${selectedReturn?.fareId}`
    });

    router.push(
  `/traveller?flightKey=${selectedOnward?.flightKey},${selectedReturn?.flightKey}&fareId=${selectedOnward?.fareId},${selectedReturn?.fareId}&priceLocked=${((selectedOnward?.price || 0) +
            (selectedReturn?.price || 0))* filters.passengers}`
);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === "passengers" ? Number(value) : value,
    });
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setSelectedOnward(null);
      setSelectedReturn(null);

      const res = await api.post("/search", filters);
      const flattened = flattenFlights(res.data);

      setFlights(flattened);
      setSearchId(res.data.searchId);
      localStorage.setItem("searchId", res.data.searchId);
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) =>
    date ? date.replaceAll("-", "") : "";

  const filteredResults = useMemo(() => {
    const src = filters.source.trim().toUpperCase();
    const dest = filters.destination.trim().toUpperCase();
    const depDate = formatDate(filters.departureDate);
    const retDate = formatDate(filters.returnDate);

    const baseFiltered = flights.filter((flight) => {
      if (flight.price > filters.maxPrice) return false;

      if (filters.stops !== "") {
        if (filters.stops === "2") {
          if (flight.stops < 2) return false;
        } else {
          if (flight.stops !== Number(filters.stops)) return false;
        }
      }

      if (filters.departureTime && flight.departureTime) {
        const hour = new Date(flight.departureTime).getHours();

        if (filters.departureTime === "morning" && (hour < 6 || hour >= 12))
          return false;

        if (filters.departureTime === "afternoon" && (hour < 12 || hour >= 18))
          return false;

        if (filters.departureTime === "evening" && (hour < 18 || hour >= 24))
          return false;
      }

      return true;
    });

    if (filters.tripType === "oneway") {
      return baseFiltered.filter(
        (f) =>
          f.sourceCode === src &&
          f.destinationCode === dest &&
          f.journeyDate === depDate
      );
    }

    const onwardFlights = baseFiltered.filter(
      (f) =>
        f.sourceCode === src &&
        f.destinationCode === dest &&
        f.journeyDate === depDate
    );

    const returnFlights = baseFiltered.filter(
      (f) =>
        f.sourceCode === dest &&
        f.destinationCode === src &&
        f.journeyDate === retDate
    );

    return { onwardFlights, returnFlights };
  }, [flights, filters]);

  return (
  <>
  <h2>Search Flight</h2>
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* ================= FILTER SECTION ================= */}

      <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-6">
        <div>
          <label className="mb-1 font-medium text-sm">Source City</label>
        <input name="source" placeholder="Source (del)" className="border p-2 rounded"
          value={filters.source} onChange={handleChange} />
          </div>
         <div>
          <label className="mb-1 font-medium text-sm">Destination City</label>
        <input name="destination" placeholder="Destination (shj)" className="border p-2 rounded"
          value={filters.destination} onChange={handleChange} />
          </div>
        <div>
          <label className="mb-1 font-medium text-sm">Departure Date</label>
        <input type="date" name="departureDate" className="border p-2 rounded"
          value={filters.departureDate} onChange={handleChange} />
          </div>
        <div>
          <label className="mb-1 font-medium text-sm">Return Date</label>
        <input type="date" name="returnDate" className="border p-2 rounded"
          disabled={filters.tripType === "oneway"}
          value={filters.returnDate} onChange={handleChange} />
          </div>
        <div> 
          <label className="mb-1 font-medium text-sm">Trip Type</label>
        <select name="tripType" className="border p-2 rounded"
          value={filters.tripType} onChange={handleChange}>
          <option value="oneway">One Way</option>
          <option value="roundtrip">Round Trip</option>
        </select>
        </div>
       <div>
        <label className="mb-1 font-medium text-sm">Passengers</label>
        <input type="number" min={1} name="passengers"
          className="border p-2 rounded"
          value={filters.passengers} onChange={handleChange} />
          </div>
        
        
        <div className="md:col-span-3">
          <label>Max Price: ₹{filters.maxPrice}</label>
          <input type="range" min={1000} max={50000}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) })
            } />
        </div>
        <div>
          <label className="mb-1 font-medium text-sm">Stops</label>
        <select name="stops" className="border p-2 rounded"
          value={filters.stops} onChange={handleChange}>
          <option value="">Any Stops</option>
          <option value="0">Non-stop</option>
          <option value="1">1 Stop</option>
          <option value="2">2+ Stops</option>
        </select>
        </div>
        
        <div>
          <label className="mb-1 font-medium text-sm">Departure Time</label>
        <select name="departureTime" className="border p-2 rounded"
          value={filters.departureTime} onChange={handleChange}>
          <option value="">Any Time</option>
          <option value="morning">Morning (6AM-12PM)</option>
          <option value="afternoon">Afternoon (12PM-6PM)</option>
          <option value="evening">Evening (6PM-12AM)</option>
        </select>
        </div>
        <div>
          <button onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded">
        {loading ? "Searching..." : "Search Flights"}
      </button>
        </div>
      </div>

      

      {/* ================= RESULTS ================= */}

      {/* ONE WAY */}
      {filters.tripType === "oneway" &&
        Array.isArray(filteredResults) &&
        filteredResults.map((flight: any) => (
          <FlightCard key={flight.flightKey} flight={flight} searchId={searchId} passengers={filters.passengers}/>
        ))}

      {/* ROUND TRIP */}
{filters.tripType === "roundtrip" &&
  !Array.isArray(filteredResults) && (
    <>
      {/* Summary */}
      <div className="bg-blue-50 p-6 rounded-xl shadow mb-6">
        <h2 className="font-bold text-lg mb-3">
          Selected Flights
        </h2>

        <p>
          Onward:{" "}
          {selectedOnward
            ? `${selectedOnward.airline} - ₹${selectedOnward.price}`
            : "Not Selected"}
        </p>

        <p>
          Return:{" "}
          {selectedReturn
            ? `${selectedReturn.airline} - ₹${selectedReturn.price}`
            : "Not Selected"}
        </p>

        <p className="font-bold text-blue-700 mt-3">
          Total: ₹
          {((selectedOnward?.price || 0) +
            (selectedReturn?.price || 0))* filters.passengers}
        </p>
         <button
        onClick={handleSelect}
        className="bg-green-600 text-white px-3 py-1 rounded mt-2"
      >
        Select
      </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Onward Flights */}
        <div style={{display:"flex"}}>
           <div>
          <h3 className="font-bold mb-3">Onward Flights</h3>

          {filteredResults.onwardFlights.map((flight: any) => (
            <FlightCard
              key={flight.flightKey}
              flight={flight}
              showCheckbox
              isSelected={
                selectedOnward?.flightKey === flight.flightKey
              }
              searchId={searchId}
              onSelect={(f) =>
                setSelectedOnward(
                  selectedOnward?.flightKey === f.flightKey
                    ? null
                    : f
                )
              }
            />
          ))}
        </div>

        {/* Return Flights */}
        <div>
          <h3 className="font-bold mb-3">Return Flights</h3>

          {filteredResults.returnFlights.map((flight: any) => (
            <FlightCard
              key={flight.flightKey}
              flight={flight}
              showCheckbox
              isSelected={
                selectedReturn?.flightKey === flight.flightKey
              }
              searchId={searchId}
              onSelect={(f) =>
                setSelectedReturn(
                  selectedReturn?.flightKey === f.flightKey
                    ? null
                    : f
                )
              }
            />
          ))}
        </div>

        </div>
       
      </div>
    </>
)}
    </div>
    </>
  );
}