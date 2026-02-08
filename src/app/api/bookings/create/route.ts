import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toDateTimeLocal(v: string) {
    // v like "2026-02-20T10:00"
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) throw new Error("Invalid datetime");
    return d;
}

export async function POST(req: Request) {
    const body = await req.json();

    const {
        serviceId,
        startAt,
        endAt,
        customerName,
        customerEmail,
        customerPhone,
        timeZone,
    } = body as {
        serviceId: string;
        startAt: string;
        endAt: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        timeZone?: string;
    };

    if (
        !serviceId ||
        !startAt ||
        !endAt ||
        !customerName ||
        !customerEmail ||
        !customerPhone
    ) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let start: Date;
    let end: Date;

    try {
        start = toDateTimeLocal(startAt);
        end = toDateTimeLocal(endAt);
    } catch {
        return NextResponse.json({ error: "Invalid date/time" }, { status: 400 });
    }

    if (end <= start) {
        return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
    }

    const ms = end.getTime() - start.getTime();
    const days = Math.ceil(ms / (24 * 60 * 60 * 1000));

    if (days < 3) {
        return NextResponse.json({ error: "Minimum booking is 3 days" }, { status: 400 });
    }


    // Проверка пересечения дат
    const conflict = await prisma.booking.findFirst({
        where: {
            serviceId,
            startDate: { lt: end },
            endDate: { gt: start },
        },
        select: { id: true },
    });

    if (conflict) {
        return NextResponse.json({ error: "Dates not available" }, { status: 409 });
    }

    const booking = await prisma.booking.create({
        data: {
            serviceId,
            startDate: start,
            startLocal: startAt,
            endLocal: endAt,
            timeZone: timeZone || "America/Denver",
            endDate: end,
            customerName,
            customerEmail,
            customerPhone,
        },
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

    return NextResponse.json({
        booking: {
            ...booking,
            startDate: booking.startDate.toISOString(),
            endDate: booking.endDate.toISOString(),
        },
    });
}
