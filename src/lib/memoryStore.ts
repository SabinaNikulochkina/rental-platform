export type Booking = {
    id: string;
    serviceId: string;
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD (exclusive)
    createdAt: number;
  };
  
  const store: { bookings: Booking[] } = {
    bookings: [
      {
        id: "demo1",
        serviceId: "jeep-wrangler",
        startDate: "2026-02-10",
        endDate: "2026-02-12",
        createdAt: Date.now(),
      },
    ],
  };
  
  export function listBookings(serviceId: string): Booking[] {
    return store.bookings.filter((b) => b.serviceId === serviceId);
  }
  
  export function addBooking(b: Omit<Booking, "id" | "createdAt">): Booking {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `b_${Math.random().toString(16).slice(2)}_${Date.now()}`;
  
    const booking: Booking = { ...b, id, createdAt: Date.now() };
    store.bookings.push(booking);
    return booking;
  }
  
  export function hasConflict(serviceId: string, startDate: string, endDate: string): boolean {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    return listBookings(serviceId).some((b) => {
      const s2 = new Date(b.startDate);
      const e2 = new Date(b.endDate);
      return start < e2 && end > s2;
    });
  }
  