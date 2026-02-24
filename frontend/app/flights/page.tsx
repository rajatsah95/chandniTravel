// "use client";
// import { useState } from "react";
// import { api } from "@/lib/api";
// import FlightCard from "@/components/FlightCard";

// export default function FlightsPage() {
//   const [flights, setFlights] = useState<any[]>([]);
//   const [searchId, setSearchId] = useState("");

//   const handleSearch = async () => {
//     const res = await api.post("/search", {});
//     setFlights(res.data.flights);
//     setSearchId(res.data.searchId);
//     localStorage.setItem("searchId", res.data.searchId);
//   };

//   return (
//     <div>
//       <button
//         onClick={handleSearch}
//         className="bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         Search Flights
//       </button>

//       <div className="mt-6 space-y-4">
//         {flights.map((flight) => (
//           <FlightCard
//             key={flight.flightKey}
//             flight={flight}
//             searchId={searchId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import { api } from "@/lib/api";
// import FlightCard from "@/components/FlightCard";

// export default function FlightsPage() {
//   const [flights, setFlights] = useState<any[]>([]);
//   const [searchId, setSearchId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     source: "",
//     destination: "",
//     departureDate: "",
//     returnDate: "",
//     tripType: "oneway",
//     passengers: 1,
//     maxPrice: 20000,
//     stops: "",
//     departureTime: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = async () => {
//     try {
//       setLoading(true);

//       const res = await api.post("/search", filters);

//       setFlights(res.data.flights);
//       setSearchId(res.data.searchId);

//       localStorage.setItem("searchId", res.data.searchId);
//     } catch (error) {
//       console.error("Search Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="max-w-6xl mx-auto p-6">
//     {/* 🔍 Search Filters */}
//     <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-6">

//       {/* Source */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Source City</label>
//         <input
//           name="source"
//           placeholder="Enter source city"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         />
//       </div>

//       {/* Destination */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Destination City</label>
//         <input
//           name="destination"
//           placeholder="Enter destination city"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         />
//       </div>

//       {/* Departure Date */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Departure Date</label>
//         <input
//           type="date"
//           name="departureDate"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         />
//       </div>

//       {/* Return Date */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Return Date</label>
//         <input
//           type="date"
//           name="returnDate"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         />
//       </div>

//       {/* Trip Type */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Trip Type</label>
//         <select
//           name="tripType"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         >
//           <option value="oneway">One-way</option>
//           <option value="roundtrip">Round-trip</option>
//         </select>
//       </div>

//       {/* Passengers */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Passengers</label>
//         <input
//           type="number"
//           name="passengers"
//           min={1}
//           defaultValue={1}
//           className="border p-2 rounded"
//           onChange={handleChange}
//         />
//       </div>

//       {/* Max Price */}
//       <div className="flex flex-col md:col-span-2">
//         <label className="mb-1 font-medium text-sm">
//           Max Price: ₹{filters.maxPrice}
//         </label>
//         <input
//           type="range"
//           min={1000}
//           max={50000}
//           value={filters.maxPrice}
//           onChange={(e) =>
//             setFilters({ ...filters, maxPrice: Number(e.target.value) })
//           }
//         />
//       </div>

//       {/* Stops */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Stops</label>
//         <select
//           name="stops"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         >
//           <option value="">Any Stops</option>
//           <option value="0">Non-stop</option>
//           <option value="1">1 Stop</option>
//           <option value="2">2+ Stops</option>
//         </select>
//       </div>

//       {/* Departure Time */}
//       <div className="flex flex-col">
//         <label className="mb-1 font-medium text-sm">Departure Time</label>
//         <select
//           name="departureTime"
//           className="border p-2 rounded"
//           onChange={handleChange}
//         >
//           <option value="">Any Time</option>
//           <option value="morning">Morning (6AM-12PM)</option>
//           <option value="afternoon">Afternoon (12PM-6PM)</option>
//           <option value="evening">Evening (6PM-12AM)</option>
//         </select>
//       </div>
//     </div>

//     {/* 🔎 Search Button */}
//     <div className="mt-6">
//       <button
//         onClick={handleSearch}
//         disabled={loading}
//         className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg"
//       >
//         {loading ? "Searching..." : "Search Flights"}
//       </button>
//     </div>

//     {/* ✈️ Flight Results */}
//     <div className="mt-8 space-y-4">
//       {flights.length === 0 && !loading && (
//         <p className="text-gray-500">No flights found</p>
//       )}

//       {flights.map((flight) => (
//         <FlightCard
//           key={flight.flightKey}
//           flight={flight}
//           searchId={searchId}
//         />
//       ))}
//     </div>
//   </div>
// );
// }

// "use client";

// import { useState, useMemo } from "react";
// import { api } from "@/lib/api";
// import FlightCard from "@/components/FlightCard";
// import { flattenFlights } from "@/utils/flattenFlights"; // ✅ IMPORT

// export default function FlightsPage() {
//   const [flights, setFlights] = useState<any[]>([]);
//   const [searchId, setSearchId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     source: "",
//     destination: "",
//     departureDate: "",
//     returnDate: "",
//     tripType: "oneway",
//     passengers: 1,
//     maxPrice: 20000,
//     stops: "",
//     departureTime: "",
//   });

//   // ✅ Handle Input Change
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFilters({
//       ...filters,
//       [name]: name === "passengers" ? Number(value) : value,
//     });
//   };

//   // ✅ Search Flights
//   const handleSearch = async () => {
//     try {
//       setLoading(true);

//       const res = await api.post("/search", filters);
//       console.log(res)
//       const flattened = flattenFlights(res.data); // 🔥 flatten here
//       console.log(flattened)
//       setFlights(flattened);
//       setSearchId(res.data.searchId);

//       localStorage.setItem("searchId", res.data.searchId);
//     } catch (error) {
//       console.error("Search Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ CLIENT SIDE FILTERING
//   const filteredFlights = useMemo(() => {
//     return flights.filter((flight) => {
//       if (flight.price > filters.maxPrice) return false;

//       if (
//         filters.stops !== "" &&
//         Number(flight.stops) !== Number(filters.stops)
//       ) {
//         return false;
//       }

//       if (filters.departureTime) {
//         const hour = new Date(flight.departureTime).getHours();

//         if (filters.departureTime === "morning" && (hour < 6 || hour >= 12))
//           return false;

//         if (filters.departureTime === "afternoon" && (hour < 12 || hour >= 18))
//           return false;

//         if (filters.departureTime === "evening" && (hour < 18 || hour >= 24))
//           return false;
//       }
      
//        // 🛫 Source (from journeySector)
//     if (filters.source) {
//       if (!flight.journeySector?.startsWith(filters.source.toUpperCase())) {
//         return false;
//       }
//     }

//     // 🛬 Destination
//     if (filters.destination) {
//       if (!flight.journeySector?.includes(filters.destination.toUpperCase())) {
//         return false;
//       }
//     }

//     // 📅 Date (last 8 digits of sector)
//     if (filters.departureDate) {
//       const sectorDate = flight.journeySector?.slice(-8); // 20260131
//       const formattedFilterDate = filters.departureDate.replaceAll("-", "");
      
//       if (sectorDate !== formattedFilterDate) {
//         return false;
//       }
//     }

//       return true;
//     });
//   }, [flights, filters]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
      
//       {/* 🔍 FILTER INPUTS */}
//       <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-6">

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Source</label>
//           <input
//             name="source"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Destination</label>
//           <input
//             name="destination"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Departure Date</label>
//           <input
//             type="date"
//             name="departureDate"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Return Date</label>
//           <input
//             type="date"
//             name="returnDate"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Trip Type</label>
//           <select
//             name="tripType"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="oneway">One-way</option>
//             <option value="roundtrip">Round-trip</option>
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Passengers</label>
//           <input
//             type="number"
//             name="passengers"
//             min={1}
//             value={filters.passengers}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* 💰 Price */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="mb-1 text-sm font-medium">
//             Max Price: ₹{filters.maxPrice}
//           </label>
//           <input
//             type="range"
//             min={1000}
//             max={50000}
//             value={filters.maxPrice}
//             onChange={(e) =>
//               setFilters({
//                 ...filters,
//                 maxPrice: Number(e.target.value),
//               })
//             }
//           />
//         </div>

//         {/* Stops */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Stops</label>
//           <select
//             name="stops"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="">Any Stops</option>
//             <option value="0">Non-stop</option>
//             <option value="1">1 Stop</option>
//             <option value="2">2+ Stops</option>
//           </select>
//         </div>

//         {/* Departure Time */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Departure Time</label>
//           <select
//             name="departureTime"
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="">Any Time</option>
//             <option value="morning">Morning (6AM-12PM)</option>
//             <option value="afternoon">Afternoon (12PM-6PM)</option>
//             <option value="evening">Evening (6PM-12AM)</option>
//           </select>
//         </div>
//       </div>

//       {/* 🔎 Search Button */}
//       <div className="mt-6">
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>
//       </div>

//       {/* ✈️ Flight Results */}
//       <div className="mt-8 space-y-4">
//         {filteredFlights.length === 0 && !loading && (
//           <p className="text-gray-500">No flights found</p>
//         )}

//         {filteredFlights.map((flight) => (
//           <FlightCard
//             key={flight.flightKey}
//             flight={flight}
//             searchId={searchId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useMemo } from "react";
// import { api } from "@/lib/api";
// import FlightCard from "@/components/FlightCard";
// import { flattenFlights } from "@/utils/flattenFlights";

// export default function FlightsPage() {
//   const [flights, setFlights] = useState<any[]>([]);
//   const [searchId, setSearchId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     source: "",
//     destination: "",
//     departureDate: "",
//     returnDate: "",
//     tripType: "oneway",
//     passengers: 1,
//     maxPrice: 20000,
//     stops: "",
//     departureTime: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFilters({
//       ...filters,
//       [name]: name === "passengers" ? Number(value) : value,
//     });
//   };

//   const handleSearch = async () => {
//     try {
//       setLoading(true);

//       const res = await api.post("/search", filters);
//       const flattened = flattenFlights(res.data);

//       setFlights(flattened);
//       setSearchId(res.data.searchId);

//       localStorage.setItem("searchId", res.data.searchId);
//     } catch (error) {
//       console.error("Search Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔥 Convert yyyy-mm-dd → yyyymmdd
//   const formatDate = (date: string) => {
//     if (!date) return "";
//     return date.replaceAll("-", "");
//   };

//   const filteredFlights = useMemo(() => {
//     return flights.filter((flight) => {
//       // 💰 Price
//       if (flight.price > filters.maxPrice) return false;

//       // 🛑 Stops
//       if (
//         filters.stops !== "" &&
//         Number(flight.stops) !== Number(filters.stops)
//       ) {
//         return false;
//       }

//       // ⏰ Departure Time
//       if (filters.departureTime) {
//         const hour = new Date(flight.departureTime).getHours();

//         if (filters.departureTime === "morning" && (hour < 6 || hour >= 12))
//           return false;

//         if (filters.departureTime === "afternoon" && (hour < 12 || hour >= 18))
//           return false;

//         if (filters.departureTime === "evening" && (hour < 18 || hour >= 24))
//           return false;
//       }

//       // 🛫 Source
//       if (filters.source) {
//         if (
//           flight.sourceCode !== filters.source.trim().toUpperCase()
//         ) {
//           return false;
//         }
//       }

//       // 🛬 Destination
//       if (filters.destination) {
//         if (
//           flight.destinationCode !==
//           filters.destination.trim().toUpperCase()
//         ) {
//           return false;
//         }
//       }

//       // 📅 Departure Date (ONWARD only)
//       if (filters.departureDate) {
//         const formatted = formatDate(filters.departureDate);

//         if (
//           flight.journeyType === "ONWARD" &&
//           flight.journeyDate !== formatted
//         ) {
//           return false;
//         }
//       }

//       // 🔁 Round Trip Handling
//       if (filters.tripType === "oneway") {
//         if (flight.journeyType !== "ONWARD") {
//           return false;
//         }
//       }

//       if (filters.tripType === "roundtrip") {
//         if (
//           flight.journeyType === "RETURN" &&
//           filters.returnDate
//         ) {
//           const formattedReturn = formatDate(
//             filters.returnDate
//           );

//           if (flight.journeyDate !== formattedReturn) {
//             return false;
//           }
//         }
//       }

//       return true;
//     });
//   }, [flights, filters]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       {/* 🔍 FILTER INPUTS */}
//       <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-6">

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Source</label>
//           <input
//             name="source"
//             value={filters.source}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Destination</label>
//           <input
//             name="destination"
//             value={filters.destination}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Departure Date</label>
//           <input
//             type="date"
//             name="departureDate"
//             value={filters.departureDate}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Return Date</label>
//           <input
//             type="date"
//             name="returnDate"
//             value={filters.returnDate}
//             disabled={filters.tripType === "oneway"}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Trip Type</label>
//           <select
//             name="tripType"
//             value={filters.tripType}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="oneway">One-way</option>
//             <option value="roundtrip">Round-trip</option>
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Passengers</label>
//           <input
//             type="number"
//             name="passengers"
//             min={1}
//             value={filters.passengers}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* 💰 Price */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="mb-1 text-sm font-medium">
//             Max Price: ₹{filters.maxPrice}
//           </label>
//           <input
//             type="range"
//             min={1000}
//             max={50000}
//             value={filters.maxPrice}
//             onChange={(e) =>
//               setFilters({
//                 ...filters,
//                 maxPrice: Number(e.target.value),
//               })
//             }
//           />
//         </div>

//         {/* Stops */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Stops</label>
//           <select
//             name="stops"
//             value={filters.stops}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="">Any Stops</option>
//             <option value="0">Non-stop</option>
//             <option value="1">1 Stop</option>
//             <option value="2">2+ Stops</option>
//           </select>
//         </div>

//         {/* Departure Time */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">Departure Time</label>
//           <select
//             name="departureTime"
//             value={filters.departureTime}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="">Any Time</option>
//             <option value="morning">Morning (6AM-12PM)</option>
//             <option value="afternoon">Afternoon (12PM-6PM)</option>
//             <option value="evening">Evening (6PM-12AM)</option>
//           </select>
//         </div>
//       </div>

//       {/* 🔎 Search Button */}
//       <div className="mt-6">
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>
//       </div>

//       {/* ✈️ Flight Results */}
//       <div className="mt-8 space-y-4">
//         {filteredFlights.length === 0 && !loading && (
//           <p className="text-gray-500">No flights found</p>
//         )}

//         {filteredFlights.map((flight) => (
//           <FlightCard
//             key={flight.flightKey}
//             flight={flight}
//             searchId={searchId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
//ok
// "use client";

// import { useState, useMemo } from "react";
// import { api } from "@/lib/api";
// import FlightCard from "@/components/FlightCard";
// import { flattenFlights } from "@/utils/flattenFlights";

// export default function FlightsPage() {
//   const [flights, setFlights] = useState<any[]>([]);
//   const [searchId, setSearchId] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [filters, setFilters] = useState({
//     source: "",
//     destination: "",
//     departureDate: "",
//     returnDate: "",
//     tripType: "oneway",
//     passengers: 1,
//     maxPrice: 20000,
//     stops: "",
//     departureTime: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     setFilters({
//       ...filters,
//       [name]: name === "passengers" ? Number(value) : value,
//     });
//   };

//   const handleSearch = async () => {
//     try {
//       setLoading(true);

//       const res = await api.post("/search", filters);
//       const flattened = flattenFlights(res.data);

//       setFlights(flattened);
//       setSearchId(res.data.searchId);

//       localStorage.setItem("searchId", res.data.searchId);
//     } catch (error) {
//       console.error("Search Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date: string) =>
//     date ? date.replaceAll("-", "") : "";

//   const filteredResults = useMemo(() => {
//     const src = filters.source.trim().toUpperCase();
//     const dest = filters.destination.trim().toUpperCase();
//     const depDate = formatDate(filters.departureDate);
//     const retDate = formatDate(filters.returnDate);

//     const baseFiltered = flights.filter((flight) => {
//       if (flight.price > filters.maxPrice) return false;

//       // Stops
//       if (filters.stops !== "") {
//         if (filters.stops === "2") {
//           if (flight.stops < 2) return false;
//         } else {
//           if (flight.stops !== Number(filters.stops))
//             return false;
//         }
//       }

//       // Departure Time
//       if (filters.departureTime && flight.departureTime) {
//         const hour = new Date(
//           flight.departureTime
//         ).getHours();

//         if (
//           filters.departureTime === "morning" &&
//           (hour < 6 || hour >= 12)
//         )
//           return false;

//         if (
//           filters.departureTime === "afternoon" &&
//           (hour < 12 || hour >= 18)
//         )
//           return false;

//         if (
//           filters.departureTime === "evening" &&
//           (hour < 18 || hour >= 24)
//         )
//           return false;
//       }

//       return true;
//     });

//     // ONE WAY
//     if (filters.tripType === "oneway") {
//       return baseFiltered.filter(
//         (f) =>
//           f.sourceCode === src &&
//           f.destinationCode === dest &&
//           f.journeyDate === depDate
//       );
//     }

//     // ROUND TRIP
//     const onwardFlights = baseFiltered.filter(
//       (f) =>
//         f.sourceCode === src &&
//         f.destinationCode === dest &&
//         f.journeyDate === depDate
//     );

//     const returnFlights = baseFiltered.filter(
//       (f) =>
//         f.sourceCode === dest &&
//         f.destinationCode === src &&
//         f.journeyDate === retDate
//     );

//     const combinedTrips: any[] = [];

//     onwardFlights.forEach((onward) => {
//       returnFlights.forEach((ret) => {
//         combinedTrips.push({
//           type: "ROUNDTRIP",
//           onward,
//           return: ret,
//           totalPrice: onward.price + ret.price,
//         });
//       });
//     });

//     return combinedTrips.sort(
//       (a, b) => a.totalPrice - b.totalPrice
//     );
//   }, [flights, filters]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">

//       {/* 🔍 FILTER INPUTS */}
//       <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-6">

//         {/* Source */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Source
//           </label>
//           <input
//             name="source"
//             placeholder="DEL"
//             value={filters.source}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Destination */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Destination
//           </label>
//           <input
//             name="destination"
//             placeholder="SHJ"
//             value={filters.destination}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Departure Date */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Departure Date
//           </label>
//           <input
//             type="date"
//             name="departureDate"
//             value={filters.departureDate}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Return Date */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Return Date
//           </label>
//           <input
//             type="date"
//             name="returnDate"
//             value={filters.returnDate}
//             disabled={filters.tripType === "oneway"}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Trip Type */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Trip Type
//           </label>
//           <select
//             name="tripType"
//             value={filters.tripType}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="oneway">One-way</option>
//             <option value="roundtrip">Round-trip</option>
//           </select>
//         </div>

//         {/* Passengers */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Passengers
//           </label>
//           <input
//             type="number"
//             min={1}
//             name="passengers"
//             value={filters.passengers}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Max Price */}
//         <div className="flex flex-col md:col-span-2">
//           <label className="mb-1 text-sm font-medium">
//             Max Price: ₹{filters.maxPrice}
//           </label>
//           <input
//             type="range"
//             min={1000}
//             max={50000}
//             value={filters.maxPrice}
//             onChange={(e) =>
//               setFilters({
//                 ...filters,
//                 maxPrice: Number(e.target.value),
//               })
//             }
//           />
//         </div>

//         {/* Stops */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Stops
//           </label>
//           <select
//             name="stops"
//             value={filters.stops}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="">Any Stops</option>
//             <option value="0">Non-stop</option>
//             <option value="1">1 Stop</option>
//             <option value="2">2+ Stops</option>
//           </select>
//         </div>

//         {/* Departure Time */}
//         <div className="flex flex-col">
//           <label className="mb-1 text-sm font-medium">
//             Departure Time
//           </label>
//           <select
//             name="departureTime"
//             value={filters.departureTime}
//             className="border p-2 rounded"
//             onChange={handleChange}
//           >
//             <option value="">Any Time</option>
//             <option value="morning">Morning (6AM-12PM)</option>
//             <option value="afternoon">
//               Afternoon (12PM-6PM)
//             </option>
//             <option value="evening">
//               Evening (6PM-12AM)
//             </option>
//           </select>
//         </div>
//       </div>

//       {/* 🔎 Search Button */}
//       <div className="mt-6">
//         <button
//           onClick={handleSearch}
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//         >
//           {loading ? "Searching..." : "Search Flights"}
//         </button>
//       </div>

//       {/* ✈️ Results */}
//       <div className="mt-8 space-y-4">
//         {!loading && filteredResults.length === 0 && (
//           <p className="text-gray-500">
//             No flights found
//           </p>
//         )}

//         {filters.tripType === "oneway" &&
//           filteredResults.map((flight: any) => (
//             <FlightCard
//               key={flight.flightKey}
//               flight={flight}
//               searchId={searchId}
//             />
//           ))}

//         {filters.tripType === "roundtrip" &&
//           filteredResults.map((trip: any, index: number) => (
//             <FlightCard
//               key={index}
//               flight={trip}
//               searchId={searchId}
//               isRoundTrip
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { api } from "@/lib/api";
import FlightCard from "@/components/FlightCard";
import { flattenFlights } from "@/utils/flattenFlights";

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
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* ================= FILTER SECTION ================= */}

      <div className="bg-white shadow-md rounded-xl p-6 grid md:grid-cols-3 gap-6">
        <div>
          <label className="mb-1 font-medium text-sm">Source City</label>
        <input name="source" placeholder="Source (DEL)" className="border p-2 rounded"
          value={filters.source} onChange={handleChange} />
          </div>
         <div>
          <label className="mb-1 font-medium text-sm">Destination City</label>
        <input name="destination" placeholder="Destination (BOM)" className="border p-2 rounded"
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
          <FlightCard key={flight.flightKey} flight={flight} searchId={searchId} />
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
          {(selectedOnward?.price || 0) +
            (selectedReturn?.price || 0)}
        </p>
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
  );
}