"use client";

import { useEffect, useState } from "react";

export default function BookingClient({ serviceId }: { serviceId: string }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [msg, setMsg] = useState<string>("");

  async function load() {
    const res = await fetch(`/api/bookings/list?serviceId=${encodeURIComponent(serviceId)}`);
    const data = await res.json();
    setBookings(data.bookings ?? []);
  }

  useEffect(() => {
    load();
  }, [serviceId]);

  async function createBooking() {
    setMsg("");
    const res = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ serviceId, startDate, endDate }),
    });
    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error ?? "Error");
      return;
    }

    setMsg(`Booking created: ${data.booking.id}`);
    await load();
  }

  return (
    <div style={{ marginTop: 20, border: "1px solid #e5e5e5", borderRadius: 12, padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Choose dates</h2>

      <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
        <label>
          Start date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
          />
        </label>

        <label>
          End date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
          />
        </label>

        <button onClick={createBooking} style={{ marginTop: 6, padding: "10px 14px", cursor: "pointer" }}>
          Continue
        </button>

        {msg && <div style={{ marginTop: 6 }}>{msg}</div>}
      </div>

      <div style={{ marginTop: 18 }}>
        <h3 style={{ marginBottom: 8 }}>Unavailable dates (demo)</h3>
        {bookings.length === 0 ? (
          <div style={{ color: "#555" }}>No bookings yet.</div>
        ) : (
          <ul>
            {bookings.map((b) => (
              <li key={b.id}>
                {b.startDate} → {b.endDate}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
