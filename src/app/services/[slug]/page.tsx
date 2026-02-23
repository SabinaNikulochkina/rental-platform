"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { bodyFont, displayFont } from "@/lib/fonts";
import { services } from "@/lib/services";
import type { ServiceType } from "@/lib/services";
import { isFlagEnabled } from "@/lib/featureFlags";

const accent = "#ff8a3d";

const serviceImages: Record<ServiceType, string[]> = {
  VEHICLE: ["/media/jeep-1.png", "/media/jeep-2.png", "/media/jeep-3.png"],
  BIKE: ["/media/jeep-2.png"],
  TOUR: ["/media/jeep-3.png"],
  PICNIC: ["/media/jeep-2.png"],
};

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug;

  const service = services.find((s) => s.id === slug);
  const isVisible =
    service && service.active && isFlagEnabled(service.featureFlagKey);

  if (!service || !isVisible) {
    return (
      <main className={`${bodyFont.className} min-h-screen bg-[#0f0e0e] text-white`}>
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 text-center">
          <div className="rounded-3xl border border-white/15 bg-white/5 px-8 py-10 backdrop-blur-sm">
            <h1 className={`${displayFont.className} text-3xl font-semibold`}>
              Not found
            </h1>
            <p className="mt-3 text-sm text-white/70">
              This service isn’t available right now.
            </p>
            <a
              className="mt-6 inline-flex rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-white/60"
              href="/"
            >
              Back home
            </a>
          </div>
        </div>
      </main>
    );
  }

  const gallery = service.gallery ?? serviceImages[service.type];

  return (
    <main className={`${bodyFont.className} min-h-screen bg-[#0f0e0e] text-white`}>
      <section className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col px-6 pt-8">
          <SiteHeader
            brand="Red Dune Overland"
            brandClassName={displayFont.className}
            logoSrc="/media/logo.png"
            navItems={[
              { label: "What’s Included", href: "#includes" },
              { label: "Gallery", href: "#gallery" },
            ]}
            cta={{ label: "Book now", href: `/book/${service.id}` }}
            secondaryCta={{ label: "Back home", href: "/" }}
          />

          <div className="mt-20 max-w-3xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: accent }}
            >
              {service.heroTagline ?? "Service"}
            </p>
            <h1
              className={`${displayFont.className} mt-6 text-4xl font-semibold uppercase tracking-[0.08em] md:text-6xl`}
            >
              {service.title}
            </h1>
            <p className="mt-5 text-base text-white/80 md:text-lg">
              {service.description ?? service.short}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/70">
              <span>From ${service.priceFromUsd}/day</span>
              <span>Available now</span>
            </div>
            <a
              className="mt-8 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
              href={`/book/${service.id}`}
            >
              Book now
            </a>
          </div>
        </div>
      </section>

      <section id="includes" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className={`${displayFont.className} text-3xl font-semibold`}>
              What’s included
            </h2>
            <p className="mt-4 text-sm text-white/70">
              Everything you need to drive out and camp without extra planning.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-white/80">
              {(service.includes ?? []).map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/5 p-6">
            <h3 className={`${displayFont.className} text-2xl font-semibold`}>
              Highlights
            </h3>
            <ul className="mt-4 grid gap-3 text-sm text-white/80">
              {(service.highlights ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className={`${displayFont.className} text-3xl font-semibold`}>
          Gallery
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {gallery.map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-3xl border border-white/15 bg-white/5"
            >
              <Image
                src={src}
                alt={service.title}
                width={1200}
                height={900}
                className="h-60 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
