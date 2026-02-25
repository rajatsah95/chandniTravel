"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";



export default function TravellerPage() {
      const searchParams = useSearchParams();

const flightKey = searchParams.get("flightKey");
const fareId = searchParams.get("fareId");
const priceLocked = searchParams.get("priceLocked");

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    passport: ""
  });

  const handleSubmit = async () => {
    const searchId = localStorage.getItem("searchId");



    const res = await api.post("/booking", {
      searchId,
      traveller: form,
      flightKey,
      fareId,
      priceLocked
    });

    
    router.push("/bookings");
  };

  return (
  <>
    <h2>Fill Traveller Detail</h2>
    <div className="max-w-md mx-auto space-y-3">
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full p-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
    </>
  );
}
