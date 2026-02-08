import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const serviceId = searchParams.get("serviceId");

  if (!serviceId) {
    return NextResponse.json({ error: "serviceId is required" }, { status: 400 });
  }

  const bookings = await prisma.booking.findMany({
    where: { serviceId },
    orderBy: { startDate: "asc" },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      serviceId: true,
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      createdAt: true,
    },
  });

  // Отдаём даты в формате YYYY-MM-DD (удобно для UI)
  const mapped = bookings.map((b) => ({
    ...b,
    startDate: b.startDate.toISOString().slice(0, 10),
    endDate: b.endDate.toISOString().slice(0, 10),
  }));

  return NextResponse.json({ bookings: mapped });
}
