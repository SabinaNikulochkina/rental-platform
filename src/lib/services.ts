export type ServiceType = "VEHICLE" | "BIKE" | "TOUR" | "PICNIC";

export type Service = {
  id: string;
  type: ServiceType;
  title: string;
  short: string;
  active: boolean;
  priceFromUsd: number;
  description?: string;
  includes?: string[];
  highlights?: string[];
  gallery?: string[];
  heroTagline?: string;
  featureFlagKey: string;
};

export const services: Service[] = [
  {
    id: "jeep-wrangler",
    type: "VEHICLE",
    title: "Jeep Wrangler Overland",
    short: "St. George pickup + optional LAS delivery. Easy for beginners.",
    active: true,
    priceFromUsd: 180,
    heroTagline: "Rooftop tent + full camp kit",
    description:
      "A single premium Wrangler built for Southern Utah. Every rental includes a rooftop tent, camp kitchen, and route guidance so you can drive straight into the desert without extra planning.",
    includes: [
      "Rooftop tent with bedding",
      "Camp kitchen + stove",
      "Cooler, chairs, and table",
      "Recovery kit + safety gear",
      "Route guidance + offline maps",
    ],
    highlights: [
      "Minimum 3-day booking",
      "Flexible pickup in St. George, UT",
      "Support by text during your trip",
    ],
    gallery: ["/media/jeep-1.png", "/media/jeep-2.png", "/media/jeep-3.png"],
    featureFlagKey: "service.jeep",
  },
  {
    id: "bike-rental",
    type: "BIKE",
    title: "E-Bike Rental",
    short: "Coming soon.",
    active: false,
    priceFromUsd: 79,
    heroTagline: "Coming soon",
    featureFlagKey: "service.bikes",
  },
  {
    id: "sunset-picnic",
    type: "PICNIC",
    title: "Sunset Picnic Setup",
    short: "Coming soon.",
    active: false,
    priceFromUsd: 149,
    heroTagline: "Coming soon",
    featureFlagKey: "service.picnic",
  },
];

export const primaryServiceId = "jeep-wrangler";
