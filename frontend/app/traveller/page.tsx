"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function TravellerPage() {
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
      traveller: form
    });

    router.push(`/confirmation?bookingId=${res.data.bookingId}`);
  };

  return (
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
  );
}
