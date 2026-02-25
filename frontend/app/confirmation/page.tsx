"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    const confirmBooking = async () => {
      try {
        await api.post("/booking", {
        });

        router.push("/bookings");
      } catch (error) {
        console.error("Booking failed", error);
      }
    };

    confirmBooking();
  }, [router]);

  return (
    <div className="p-6">
      <h2 className="text-xl">Processing Booking...</h2>
    </div>
  );
}