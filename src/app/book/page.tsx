"use client";

import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import { bodyFont, displayFont } from "@/lib/fonts";
import { services } from "@/lib/services";
import type { ServiceType } from "@/lib/services";

const accent = "#ff8a3d";
const noiseSvg =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

const serviceImages: Record<ServiceType, string> = {
  VEHICLE: "/media/jeep-1.png",
  BIKE: "/media/jeep-2.png",
  TOUR: "/media/jeep-3.png",
  PICNIC: "/media/jeep-2.png",
};

export default function BookPage() {
  const active = services.filter((s) => s.active);

  return (
    <main className={`${bodyFont.className} min-h-screen bg-[#0f0e0e] text-[#f2e6d8]`}>
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.07]"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
        aria-hidden="true"
      />

      <section className="relative min-h-[70vh] overflow-hidden bg-[#0f0e0e]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col px-6 pt-8">
          <SiteHeader
            brand="Red Dune Overland"
            brandClassName={displayFont.className}
            logoSrc="/media/logo.png"
            navItems={[
              { label: "Services", href: "#services" },
              { label: "Details", href: "#details" },
            ]}
            cta={{ label: "Back home", href: "/" }}
            secondaryCta={{ label: "Book now", href: "#services" }}
          />

          <div className="mt-20 max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: accent }}
            >
              Booking
            </p>
            <h1
              className={`${displayFont.className} mt-6 text-4xl font-semibold uppercase tracking-[0.08em] md:text-6xl`}
            >
              Choose your ride.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
              One premium Jeep available now. Additional experiences unlock by
              request. Tap a service to see dates.
            </p>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#0f0e0e_0%,#4d1a12_40%,#8c2f21_100%)] px-6 py-16"
      >
        <div className="w-full max-w-5xl">
          <div className="grid gap-6 text-left md:grid-cols-2">
            {active.map((s) => (
              <a
                key={s.id}
                href={`/book/${s.id}`}
                className="rounded-3xl border border-white/15 bg-white/5 px-6 py-6 backdrop-blur-sm transition hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="h-20 w-28 overflow-hidden rounded-2xl border border-white/15">
                    <Image
                      src={serviceImages[s.type]}
                      alt={s.title}
                      width={420}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                      Available now
                    </p>
                    <h2 className={`${displayFont.className} mt-2 text-2xl font-semibold text-white`}>
                      {s.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/70">{s.short}</p>
                    <p className="mt-3 text-sm font-semibold text-white">
                      from ${s.priceFromUsd}/day
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        id="details"
        className="flex min-h-[70vh] items-center justify-center bg-[linear-gradient(to_bottom,#8c2f21_0%,#c25b30_50%,#e09f56_100%)] px-6 text-center"
      >
        <div className="max-w-2xl">
          <h2
            className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}
          >
            What’s included
          </h2>
          <p className="mt-6 text-base text-white/90 md:text-lg">
            Tent, recovery basics, route guidance, and pickup coordination. We
            keep everything ready so you can focus on the drive.
          </p>
        </div>
      </section>
    </main>
  );
}
