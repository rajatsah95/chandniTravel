// export default function SearchFilters() {
//   return <div>Search Filters Component</div>;
// }

"use client";

import { useState } from "react";
import PriceSlider from "./PriceSlider";

interface Props {
  onSearch: (filters: any) => void;
}

export default function SearchFilters({ onSearch }: Props) {
  const [filters, setFilters] = useState({
    source: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    tripType: "oneway",
    passengers: 1,
    maxPrice: 20000,
    stops: "",
    departureTime: ""
  });

  const handleChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Search Flights</h2>

      <input name="source" placeholder="Source City" onChange={handleChange} />
      <br /><br />

      <input name="destination" placeholder="Destination City" onChange={handleChange} />
      <br /><br />

      <label>Departure Date:</label>
      <input type="date" name="departureDate" onChange={handleChange} />
      <br /><br />

      <label>Return Date:</label>
      <input type="date" name="returnDate" onChange={handleChange} />
      <br /><br />

      <label>Trip Type:</label>
      <select name="tripType" onChange={handleChange}>
        <option value="oneway">One-way</option>
        <option value="roundtrip">Round-trip</option>
      </select>
      <br /><br />

      <label>Passengers:</label>
      <input
        type="number"
        name="passengers"
        min={1}
        value={filters.passengers}
        onChange={handleChange}
      />
      <br /><br />

      <PriceSlider
        min={1000}
        max={50000}
        value={filters.maxPrice}
        onChange={(value) => setFilters({ ...filters, maxPrice: value })}
      />
      <br />

      <label>Stops:</label>
      <select name="stops" onChange={handleChange}>
        <option value="">Any</option>
        <option value="0">Non-stop</option>
        <option value="1">1 Stop</option>
        <option value="2">2+ Stops</option>
      </select>
      <br /><br />

      <label>Departure Time:</label>
      <select name="departureTime" onChange={handleChange}>
        <option value="">Any</option>
        <option value="morning">Morning (6AM-12PM)</option>
        <option value="afternoon">Afternoon (12PM-6PM)</option>
        <option value="evening">Evening (6PM-12AM)</option>
      </select>
      <br /><br />

      <button
        onClick={() => onSearch(filters)}
        style={{
          padding: "10px 20px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Search
      </button>
    </div>
  );
}