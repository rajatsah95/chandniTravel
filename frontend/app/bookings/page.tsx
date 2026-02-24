"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import BookingCard from "@/components/BookingCard";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/booking");
        setBookings(res.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Saved Bookings
      </h1>

      {loading && <p>Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id || booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}