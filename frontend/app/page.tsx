import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Flight Booking App ✈️</h1>

      <div style={{ marginTop: 20 }}>
        <Link href="/flights">Go to Flights</Link>
      </div>
    </div>
  );
}
