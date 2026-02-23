"use client";

import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { bodyFont, displayFont } from "@/lib/fonts";
import { services, primaryServiceId } from "@/lib/services";
import { journeyScenes } from "@/lib/journey";
import { isFlagEnabled } from "@/lib/featureFlags";

const accent = "#ff8a3d";

export default function HomePage() {
  const activeServices = services.filter(
    (service) => service.active && isFlagEnabled(service.featureFlagKey)
  );
  const primaryService =
    activeServices.find((service) => service.id === primaryServiceId) ??
    activeServices[0];
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.6;
      setShowTop(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  }

  return (
    <main className={`${bodyFont.className} bg-[#0f0e0e] text-[#f2e6d8]`}>
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
          <source src="/media/main_2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-10">
          <SiteHeader
            brand="Red Dune Overland"
            brandClassName={displayFont.className}
            logoSrc="/media/logo.png"
            navItems={[
              { label: "Jeep Rental", href: "#active-services" },
              { label: "Journey", href: "#journey" },
            ]}
            cta={{ label: "Book now", href: "/book" }}
            secondaryCta={{
              label: "Learn more",
              href: primaryService ? `/services/${primaryService.id}` : "/book",
            }}
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
            {primaryService && (
              <a
                className="mt-4 inline-flex text-sm font-semibold text-white/80 transition hover:text-white"
                href={`/services/${primaryService.id}`}
              >
                See what’s included →
              </a>
            )}
          </div>
        </div>
      </section>

      <section
        id="active-services"
        className="flex items-center justify-center bg-[linear-gradient(to_bottom,#0f0e0e_0%,#4d1a12_40%,#8c2f21_100%)] px-6 py-20 text-center text-[#f2e6d8]"
      >
        <div className="max-w-5xl">
          <h2
            className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}
          >
            Available Now
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            Only the services that are live today. Turn on more when ready.
          </p>
          <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
            {activeServices.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl border border-white/15 bg-white/5 px-6 py-6 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                  {service.heroTagline ?? "Active"}
                </p>
                <h3 className={`${displayFont.className} mt-3 text-xl font-semibold text-white`}>
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-white/70">{service.short}</p>
                <div className="mt-6 flex items-center gap-4">
                  <a
                    className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1b2333]"
                    href={`/book/${service.id}`}
                  >
                    Book now
                  </a>
                  <a
                    className="text-xs font-semibold text-white/80 transition hover:text-white"
                    href={`/services/${service.id}`}
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="journey">
        {journeyScenes
          .filter((scene) => scene.enabled && isFlagEnabled(scene.featureFlagKey))
          .map((scene) => {
            const assigned =
              scene.assignedServiceIds?.length
                ? activeServices.filter((s) => scene.assignedServiceIds?.includes(s.id))
                : [];
            const servicesForScene =
              assigned.length > 0
                ? assigned
                : scene.fallbackPolicy === "primaryService" && primaryService
                  ? [primaryService]
                  : [];

            if (servicesForScene.length === 0) return null;

            return (
              <section
                key={scene.id}
                id={scene.id}
                className="flex items-center justify-center px-6 py-20 text-center"
                style={{ background: scene.gradient, color: scene.textColor }}
              >
                <div className="max-w-5xl">
                  <span className="mb-6 block text-4xl">{scene.icon}</span>
                  <h2
                    className={`${displayFont.className} text-3xl font-semibold uppercase tracking-[0.06em] md:text-5xl`}
                  >
                    {scene.title}
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl text-base/relaxed md:text-lg">
                    {scene.copy}
                  </p>
                  <div className="mt-12 grid gap-6 text-left md:grid-cols-2">
                    {servicesForScene.map((service) => (
                      <div
                        key={service.id}
                        className="rounded-3xl border border-black/10 bg-white/60 px-6 py-6 backdrop-blur-sm"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/60">
                          {service.heroTagline ?? "Active"}
                        </p>
                        <h3 className={`${displayFont.className} mt-3 text-xl font-semibold`}>
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm text-black/70">{service.short}</p>
                        <div className="mt-6 flex items-center gap-4">
                          <a
                            className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
                            href={`/book/${service.id}`}
                          >
                            Book now
                          </a>
                          <a
                            className="text-xs font-semibold text-black/70 transition hover:text-black"
                            href={`/services/${service.id}`}
                          >
                            Learn more →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
      </div>

      <footer className="bg-[#050505] px-6 pb-6 pt-6 text-white/70">
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

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition duration-300 ease-out hover:bg-white/20 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <span className="text-xl leading-none">↑</span>
      </button>
    </main>
  );
}
