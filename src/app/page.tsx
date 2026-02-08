"use client";

import SiteHeader from "@/components/SiteHeader";
import { bodyFont, displayFont } from "@/lib/fonts";

const accent = "#ff8a3d";
const noiseSvg =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

export default function HomePage() {
  return (
    <main className={`${bodyFont.className} min-h-screen bg-[#0f0e0e] text-[#f2e6d8]`}>
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.06]"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
        aria-hidden="true"
      />

      <section className="relative min-h-screen overflow-hidden bg-[#0f0e0e]">
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

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-8">
          <SiteHeader
            brand="Red Dune Overland"
            brandClassName={displayFont.className}
            logoSrc="/media/logo.png"
            navItems={[
              { label: "Morning", href: "#morning" },
              { label: "Biking", href: "#biking" },
              { label: "Hiking", href: "#hiking" },
              { label: "Sunset", href: "#sunset" },
              { label: "Night", href: "#night" },
            ]}
            cta={{ label: "Book now", href: "/book" }}
            secondaryCta={{ label: "Explore", href: "#morning" }}
          />

          <div className="mt-24 flex flex-1 flex-col items-center justify-center text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: accent }}
            >
              Utah Overlanding
            </p>
            <h1
              className={`${displayFont.className} mt-6 text-4xl font-semibold uppercase leading-tight tracking-[0.08em] md:text-6xl`}
            >
              Night in the Desert
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
              Scroll down to follow the journey from morning light to a sky full
              of stars.
            </p>
            <a
              className="mt-10 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
              style={{ backgroundColor: accent }}
              href="/book"
            >
              Book now
            </a>
          </div>
        </div>
      </section>

      <section
        id="morning"
        className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#f9f1e6_0%,#f5d0a9_100%)] px-6 text-center text-[#4a3b32]"
      >
        <div className="max-w-5xl">
          <span className="mb-6 block text-4xl">☕️</span>
          <h2 className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}>
            Quiet Morning
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#4a3b32]/85 md:text-lg">
            Start with slow coffee, open views, and cool air before the sun
            climbs. Ease into the day before the adventure begins.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {[
              {
                title: "Pickup Window",
                copy: "Flexible morning pickup with a quick safety briefing.",
              },
              {
                title: "Camp Coffee",
                copy: "Light breakfast kit and local café recommendations.",
              },
              {
                title: "Route Preview",
                copy: "Sunrise timing, weather notes, and first stops.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white/60 px-5 py-5 backdrop-blur-sm"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-[#4a3b32]/70">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-[#4a3b32]/70">
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              St. George pickup
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Route briefing included
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Easy first-mile loops
            </span>
          </div>
        </div>
      </section>

      <section
        id="biking"
        className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#f5d0a9_0%,#e6ae49_100%)] px-6 text-center text-[#3d2c1d]"
      >
        <div className="max-w-5xl">
          <span className="mb-6 block text-4xl">🚲</span>
          <h2 className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}>
            Time for Bikes
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#3d2c1d]/85 md:text-lg">
            Warm light fills the valley. It’s the perfect time for bikes and
            scenic loops before the midday heat.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
            {[
              {
                title: "Slickrock Loop",
                copy: "Iconic trail with golden-hour views and smooth climbs.",
              },
              {
                title: "Town & Canyon Ride",
                copy: "Casual route with cafés, overlooks, and easy terrain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white/60 px-6 py-6 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#3d2c1d]/70">
                  Suggested
                </p>
                <h3 className={`${displayFont.className} mt-3 text-xl font-semibold`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#3d2c1d]/75">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-[#3d2c1d]/70">
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Helmets included
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              E-bike options
            </span>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2">
              Trail map support
            </span>
          </div>
        </div>
      </section>

      <section
        id="hiking"
        className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#e6ae49_0%,#c04e28_100%)] px-6 text-center text-[#261109]"
      >
        <div className="max-w-5xl">
          <span className="mb-6 block text-4xl">🥾</span>
          <h2 className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}>
            Canyon Heart
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#261109]/85 md:text-lg">
            Midday heat. Orange sand and towering arches. This is where hikes
            and hidden trails take over.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            {[
              {
                title: "Gear Packs",
                copy: "Poles, headlamps, and trail essentials ready to go.",
              },
              {
                title: "Canyon Routes",
                copy: "Shaded slots, overlooks, and heat-aware timing.",
              },
              {
                title: "Safety First",
                copy: "Hydration guidance and weather-aware backups.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-black/10 bg-white/50 px-5 py-5 backdrop-blur-sm"
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-2 text-sm text-[#261109]/75">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="sunset"
        className="flex min-h-screen items-center justify-center bg-[linear-gradient(to_bottom,#c04e28_0%,#762a34_50%,#2e1a36_100%)] px-6 text-center text-[#f9f1e6]"
      >
        <div className="max-w-5xl">
          <span className="mb-6 block text-4xl">🚙</span>
          <h2 className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}>
            Sunset Chase
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            We drive into the best view. The sky turns crimson and violet as the
            desert cools.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
            {[
              {
                title: "Guided Jeep Short Tours",
                copy: "Local guide for scenic loops and photo stops.",
                status: "Private",
              },
              {
                title: "Sunset Viewpoints",
                copy: "Timed routes to the best light of the day.",
                status: "Golden hour",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/15 bg-white/10 px-6 py-6 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  {item.status}
                </p>
                <h3 className={`${displayFont.className} mt-3 text-xl font-semibold text-white`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-white/80">{item.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              Photo stops included
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              Golden-hour timing
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
              Local guide
            </span>
          </div>
        </div>
      </section>

      <section
        id="night"
        className="relative flex items-center justify-center bg-[linear-gradient(to_bottom,#2e1a36_0%,#050505_100%)] px-6 py-10 text-center text-white"
      >
        <div className="max-w-5xl">
          <span className="mb-6 block text-4xl">✨</span>
          <h2 className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}>
            Billions of Stars
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            Utah is one of the best places on Earth to see the Milky Way. Quiet,
            dark, and unforgettable.
          </p>
          <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
            {[
              {
                title: "Utah Stargazing",
                copy: "Night-sky outings with dark-sky locations.",
                status: "Night",
              },
              {
                title: "Camp-ready Jeep",
                copy: "Rooftop tent setup and warm layers included.",
                status: "Overland",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/20 bg-white/10 px-6 py-6 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  {item.status}
                </p>
                <h3 className={`${displayFont.className} mt-3 text-xl font-semibold text-white`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-white/80">{item.copy}</p>
              </div>
            ))}
          </div>
          <a
            className="mt-10 inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/70"
            href="/book"
          >
            Book now
          </a>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="h-full w-full bg-[radial-gradient(white,rgba(255,255,255,0.2)_2px,transparent_3px)] [background-size:550px_550px]" />
          <div className="h-full w-full bg-[radial-gradient(white,rgba(255,255,255,0.15)_1px,transparent_2px)] [background-size:350px_350px] [background-position:40px_60px]" />
          <div className="h-full w-full bg-[radial-gradient(white,rgba(255,255,255,0.1)_2px,transparent_3px)] [background-size:250px_250px] [background-position:130px_270px]" />
        </div>
      </section>

      <footer className="bg-[#050505] px-6 pb-0 pt-8 text-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
          <div>
            <p className={`${displayFont.className} text-lg font-semibold text-white`}>
              Red Dune Overland
            </p>
            <p className="mt-3 text-sm text-white/60">
              Premium Jeep rentals, rooftop tent setup, and curated Utah routes.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Contact</p>
            <p className="mt-3 text-sm text-white/60">St. George, UT</p>
            <p className="mt-1 text-sm text-white/60">(555) 210-8899</p>
            <p className="mt-1 text-sm text-white/60">hello@redduneoverland.com</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Quick links</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a className="text-white/70 transition hover:text-white" href="/book">
                Book now
              </a>
              <a className="text-white/70 transition hover:text-white" href="#morning">
                Morning
              </a>
              <a className="text-white/70 transition hover:text-white" href="#night">
                Night
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
