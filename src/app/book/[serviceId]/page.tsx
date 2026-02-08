"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DayPicker, type DateRange } from "react-day-picker";
import { isSameDay } from "date-fns";
import Backdrop from "@/components/Backdrop";
import SiteHeader from "@/components/SiteHeader";
import { bodyFont, displayFont } from "@/lib/fonts";
import { services } from "@/lib/services";
import type { ServiceType } from "@/lib/services";

const serviceImages: Record<ServiceType, string> = {
  VEHICLE: "/media/jeep-1.png",
  BIKE: "/media/jeep-2.png",
  TOUR: "/media/jeep-3.png",
  PICNIC: "/media/jeep-2.png",
};

export default function ServiceBookPage() {
  const params = useParams<{ serviceId: string }>();
  const raw = params?.serviceId;
  const serviceId = Array.isArray(raw) ? raw[0] : raw;

  const service = services.find((s) => s.id === serviceId);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");

  const startDay = range?.from;
  const endDay = range?.to;

  function combineDayTime(day: Date | undefined, time: string) {
    if (!day) return "";
    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, "0");
    const dd = String(day.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}T${time}`;
  }

  const startAtValue = combineDayTime(startDay, startTime);
  const endAtValue = combineDayTime(endDay, endTime);

  function getBookedDays(items: any[]) {
    const days: Date[] = [];

    for (const b of items) {
      const start = new Date(b.startDate);
      const end = new Date(b.endDate);
      const cur = new Date(start);
      cur.setHours(0, 0, 0, 0);
      const endDay = new Date(end);
      endDay.setHours(0, 0, 0, 0);

      while (cur <= endDay) {
        days.push(new Date(cur));
        cur.setDate(cur.getDate() + 1);
      }
    }

    return days.filter((d, idx) => days.findIndex((x) => isSameDay(x, d)) === idx);
  }

  const bookedDays = getBookedDays(bookings);

  const tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);

  type FieldKey =
    | "startAt"
    | "endAt"
    | "customerName"
    | "customerEmail"
    | "customerPhone";

  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  const days = calcDaysCeil(startAtValue, endAtValue);

  const emailOk = customerEmail.trim() !== "" && isEmail(customerEmail);
  const phoneOk = customerPhone.trim() !== "" && isValidPhone(customerPhone);

  const requiredOk =
    startAtValue !== "" &&
    endAtValue !== "" &&
    days >= 3 &&
    customerName.trim() !== "" &&
    emailOk &&
    phoneOk;

  const canContinue = requiredOk;

  const inputBase =
    "mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-[#1b2333] transition focus:outline-none";
  const inputOk = "border-[#f0e2d2] focus:border-[#c9724a]";
  const inputError = "border-rose-500 bg-rose-50 focus:border-rose-500";

  function inputClass(key: FieldKey) {
    const show = touched[key] && errors[key];
    return `${inputBase} ${show ? inputError : inputOk}`;
  }

  function ErrorText({ field }: { field: FieldKey }) {
    const show = touched[field] && errors[field];
    if (!show) return null;
    return <p className="mt-2 text-sm text-rose-600">{errors[field]}</p>;
  }

  function isEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function isValidPhone(v: string) {
    const digits = v.replace(/\D/g, "");
    return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
  }

  function validateAll() {
    const e: Partial<Record<FieldKey, string>> = {};

    if (!startAtValue) e.startAt = "Please select a start date & time.";
    if (!endAtValue) e.endAt = "Please select an end date & time.";

    const days = calcDaysCeil(startAtValue, endAtValue);
    if (startAtValue && endAtValue && days === 0) e.endAt = "End must be after start.";
    if (days > 0 && days < 3) e.endAt = "Minimum booking is 3 days.";

    if (!customerName.trim()) e.customerName = "Please enter your full name.";
    if (!customerEmail.trim()) e.customerEmail = "Please enter your email.";
    else if (!isEmail(customerEmail)) e.customerEmail = "Please enter a valid email.";
    if (!customerPhone.trim()) {
      e.customerPhone = "Please enter your phone number.";
    } else if (!isValidPhone(customerPhone)) {
      e.customerPhone = "Please enter a valid US phone number.";
    }

    return e;
  }

  function validateField(key: FieldKey) {
    const all = validateAll();
    return all[key];
  }

  function markTouched(keys: FieldKey[]) {
    setTouched((prev) => {
      const next = { ...prev };
      keys.forEach((k) => (next[k] = true));
      return next;
    });
  }

  function calcDaysCeil(startAt: string, endAt: string) {
    if (!startAt || !endAt) return 0;
    const start = new Date(startAt).getTime();
    const end = new Date(endAt).getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 0;

    const ms = end - start;
    const dayMs = 24 * 60 * 60 * 1000;
    return Math.ceil(ms / dayMs);
  }

  function calcDiscountPct(days: number) {
    if (days >= 15) return 20;
    if (days >= 8) return 10;
    return 0;
  }

  async function load() {
    if (!serviceId) return;
    const res = await fetch(
      `/api/bookings/list?serviceId=${encodeURIComponent(serviceId)}`
    );
    const data = await res.json();
    setBookings(data.bookings ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  async function createBooking() {
    setMsg("");
    const e = validateAll();
    setErrors(e);
    markTouched(["startAt", "endAt", "customerName", "customerEmail", "customerPhone"]);

    if (Object.keys(e).length > 0) {
      setMsg("Please fix the highlighted fields.");
      return;
    }
    const res = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        serviceId,
        startAt: startAtValue,
        endAt: endAtValue,
        customerName,
        customerEmail,
        customerPhone,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error ?? "Error");
      return;
    }

    setMsg(`Booking created: ${data.booking.id}`);
    await load();
  }

  if (!service || !service.active) {
    return (
      <main
        className={`${bodyFont.className} flex min-h-screen items-center justify-center bg-[#f7efe4] text-[#231a15]`}
      >
        <div className="rounded-[28px] border border-[#f0e2d2] bg-white px-8 py-10 text-center shadow-lg">
          <h1 className={`${displayFont.className} text-3xl font-semibold text-[#1b2333]`}>
            Not found
          </h1>
          <p className="mt-3 text-sm text-[#5a4237]">
            This service isn’t available right now.
          </p>
          <a
            className="mt-6 inline-flex rounded-full border border-[#1b2333] bg-[#1b2333] px-4 py-2 text-sm font-semibold text-[#f7efe4] transition hover:bg-[#101624]"
            href="/book"
          >
            Back to services
          </a>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${bodyFont.className} relative min-h-screen overflow-hidden bg-[#f7efe4] text-[#231a15]`}
    >
      <Backdrop />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-8">
        <SiteHeader
          brand="Red Dune Overland"
          brandClassName={displayFont.className}
          logoSrc="/media/logo.png"
          cta={{ label: "Back to services", href: "/book" }}
          secondaryCta={{ label: "Back home", href: "/" }}
        />

        <section className="mt-12 grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
              {service.type}
            </p>
            <h1
              className={`${displayFont.className} text-3xl font-semibold text-[#1b2333] md:text-5xl`}
            >
              {service.title}
            </h1>
            <p className="text-sm text-[#5a4237] md:text-base">
              {service.short}
            </p>

            <div className="grid gap-4 rounded-[28px] border border-[#f0e2d2] bg-white px-6 py-6 text-sm text-[#5a4237] shadow-sm">
              <div className="flex items-center justify-between">
                <span>Daily rate</span>
                <span className="font-semibold text-[#1b2333]">
                  ${service.priceFromUsd}/day
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Minimum length</span>
                <span className="font-semibold text-[#1b2333]">3 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Multi-day savings</span>
                <span className="font-semibold text-[#1b2333]">Up to 20%</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#f0e2d2] bg-white shadow-lg">
              <Image
                src={serviceImages[service.type]}
                alt={service.title}
                width={900}
                height={700}
                className="h-48 w-full object-cover"
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
            <h2 className={`${displayFont.className} text-2xl font-semibold text-[#1b2333]`}>
              Choose dates
            </h2>
            <div className="mt-6 grid gap-6">
              <div>
                <p className="text-sm font-semibold text-[#5a4237]">Select dates</p>
                <div className="mt-3 rounded-[24px] border border-[#f0e2d2] bg-white p-3">
                  <DayPicker
                    mode="range"
                    numberOfMonths={1}
                    selected={range}
                    onSelect={setRange}
                    disabled={[{ before: tomorrow }, ...bookedDays]}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-[#5a4237]">
                  Start time
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, startAt: true }));
                      setErrors((prev) => ({
                        ...prev,
                        startAt: validateField("startAt"),
                      }));
                    }}
                    className={inputClass("startAt")}
                  />
                  <ErrorText field="startAt" />
                </label>

                <label className="text-sm font-semibold text-[#5a4237]">
                  End time
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, endAt: true }));
                      setErrors((prev) => ({
                        ...prev,
                        endAt: validateField("endAt"),
                      }));
                    }}
                    className={inputClass("endAt")}
                  />
                  <ErrorText field="endAt" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm font-semibold text-[#5a4237]">
                  Full name
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, customerName: true }));
                      setErrors((prev) => ({
                        ...prev,
                        customerName: validateField("customerName"),
                      }));
                    }}
                    className={inputClass("customerName")}
                  />
                  <ErrorText field="customerName" />
                </label>

                <label className="text-sm font-semibold text-[#5a4237]">
                  Email
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    onBlur={() => {
                      setTouched((t) => ({ ...t, customerEmail: true }));
                      setErrors((prev) => ({
                        ...prev,
                        customerEmail: validateField("customerEmail"),
                      }));
                    }}
                    className={inputClass("customerEmail")}
                  />
                  <ErrorText field="customerEmail" />
                </label>
              </div>

              <label className="text-sm font-semibold text-[#5a4237]">
                Phone
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => {
                    const v = e.target.value;
                    const cleaned = v.replace(/[^\d+()\-\s]/g, "");
                    setCustomerPhone(cleaned);
                  }}
                  onBlur={() => {
                    setTouched((t) => ({ ...t, customerPhone: true }));
                    setErrors((prev) => ({
                      ...prev,
                      customerPhone: validateField("customerPhone"),
                    }));
                  }}
                  className={inputClass("customerPhone")}
                />
                <ErrorText field="customerPhone" />
              </label>

              <div className="rounded-[24px] border border-[#f0e2d2] bg-[#fdf7ef] px-5 py-4 text-sm text-[#5a4237]">
                {(() => {
                  const days = calcDaysCeil(startAtValue, endAtValue);
                  const discountPct = calcDiscountPct(days);
                  const base = days * (service.priceFromUsd ?? 180);
                  const discount = Math.round((base * discountPct) / 100);
                  const total = base - discount;

                  if (!startAtValue || !endAtValue) {
                    return <div>Select start/end to see total.</div>;
                  }
                  if (days === 0) return <div>End must be after start.</div>;

                  return (
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span>Days (rounded up)</span>
                        <span className="font-semibold">{days}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Price per day</span>
                        <span className="font-semibold">
                          ${service.priceFromUsd ?? 180}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Subtotal</span>
                        <span className="font-semibold">${base}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Discount</span>
                        <span className="font-semibold">
                          {discountPct}% ({discountPct ? `-$${discount}` : "$0"})
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-base font-semibold text-[#1b2333]">
                        <span>Total</span>
                        <span>${total}</span>
                      </div>
                      {days < 3 && (
                        <p className="text-sm text-rose-600">
                          Minimum booking is 3 days.
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>

              <button
                onClick={createBooking}
                disabled={!canContinue}
                className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  canContinue
                    ? "bg-[#1b2333] text-[#f7efe4] hover:bg-[#101624]"
                    : "cursor-not-allowed bg-[#ecd9c7] text-[#9b7a68]"
                }`}
              >
                Continue
              </button>

              {!canContinue && (
                <p className="text-sm text-slate-500">
                  To continue, fill in all required fields and book at least 3 days.
                </p>
              )}

              {msg && (
                <p className="rounded-2xl border border-[#f0e2d2] bg-white px-4 py-3 text-sm text-[#5a4237]">
                  {msg}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
